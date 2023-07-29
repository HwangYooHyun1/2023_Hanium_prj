package dev.project.hanium.service;

import dev.project.hanium.domain.User;
import dev.project.hanium.dto.user.JoinDto;
import dev.project.hanium.dto.user.UserDto;
import dev.project.hanium.exception.ErrorCode;
import dev.project.hanium.exception.HaniumException;
import dev.project.hanium.repository.UserRepository;
import dev.project.hanium.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    @Value("${jwt.key}")
    private String key;

    @Value("${jwt.token.expired-time-ms}")
    private Long expiredTimeMs;

    @Transactional
    public UserDto join(String username,String passwd) {
        userRepository.findByUsername(username).ifPresent(x ->{
        throw new HaniumException(ErrorCode.DUPLICATED_USER_NAME, String.format("%s is duplicated", username));
        });

        User user = userRepository.save(User.builder()
                .username(username)
                .passwd(passwd)
                .build());

        return UserDto.from(user);
    }

    //TODO : implement
    //jwt 로 암호화된 문자열을 로그인 시 클라쪽에 넘겨줘야 한다
    public String login(String id,String pw){
        //회원가입 여부 체크
        //그래서 만약 없으면 Exception 을 반환함
        UserDto user = loadByUserName(id);
//        Member member = memberRepository.findByUserName(id).orElseThrow(() -> new MysnsException(ErrorCode.MEMBER_NOT_FOUND, String.format("%s not founded", id)));
//        memberCacheRepository.setMember(user);
        //비밀번호 체크
        if(!encoder.matches(pw,user.getPasswd()))
        //if(!member.getPasswd().equals(pw))
        {
            throw new HaniumException(ErrorCode.INVALID_PASSWORD);
        }
        //토큰 생성
        String token = JwtTokenUtil.generateToken(id, key, expiredTimeMs);
        //토큰 반환
        return token;
    }

    //token 파싱해서 user 찾기 위한 메서드
    public UserDto loadByUserName(String username) {
        return memberCacheRepository.getMember(username).orElseGet(() -> userRepository.findByUsername(username).map(UserDto::from).orElseThrow(()->
                new HaniumException(ErrorCode.USER_NOT_FOUND,String.format("%s not founded",username)))
        );
    }
}
