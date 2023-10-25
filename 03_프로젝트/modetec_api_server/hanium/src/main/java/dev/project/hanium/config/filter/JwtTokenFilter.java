package dev.project.hanium.config.filter;

import dev.project.hanium.dto.user.UserDto;
import dev.project.hanium.service.UserService;
import dev.project.hanium.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
//token filter
//OncePerRequestFilter 는 매 요청마다 filter 를 씌울 것이기 때문에 상속해줬다
public class JwtTokenFilter extends OncePerRequestFilter {
    private final String key;
    //doFilterInternal 을 통해 매 요청이 들어오면
    //인증을 수행할 수 있게 하는 것이다.

    //user isValid 수행
    private final UserService memberService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //우선 요청이 어떻게 들어오는지를 생각해보자
        //login 할 때 token 값을 response 로 보내줬었다
        //이 token 을 요청을 날릴 때 마다 그 헤더에 넣어주면
        //필터에서 헤더를 확인하고 그 token 값을 읽어서 그 token 으로 인증을 수행
        //그 Claims 에 username 을 넣어놨었다
        //그 username 을 꺼내서 그 username 이 유효한지를 확인하는 과정을 여기서 거침
        final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        //헤더가 만약에 null 이라면
        //Jwt 를 Bearer token 에 넣어줄 건데
        //그래서 앞에 Bearer + token 이 될것임
        //token 값은 앞에 Bearer 로 시작이 될어야 할것이다

        if (header == null || !header.startsWith("Bearer ")) {
            log.error("Error occurs while getting header ,header is null or invalid {}",request.getRequestURL());
            filterChain.doFilter(request,response);
            return;
        }

        //헤더 형식은 올바름 이제 token 앞에 Bearer 을 떼내고 token 만 가지고 와야함
        try {
            final String token = header.split(" ")[1].trim();

            //TODO : token is valid
            //expired 된 경우가 있기 때문
            if (JwtTokenUtil.isExpired(token, key)) {
                log.error("key is expired");
                return;
            }

            //token 에서 user 정보를 가져와야 함
            //token 안에 username 이 존재함
            //TODO : implement 아직 이것 관련된 메서드 구현 안함
            //get username from token
            String username = JwtTokenUtil.getUserName(token,key);

            // TODO : check the username is valid
            //user 가 실제 존재하는지
            //memberService 에서 하나 만들어 줘야 함
            UserDto userDto = memberService.loadByUserName(username);


            //여기까지 왔으면 이제 이 요청을 controller 에게 전달해주면 된다.
            //Authentication 을 만들어 줘야 한다.
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    //TODO :
                    userDto, null,userDto.getAuthorities());


            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

        } catch (RuntimeException e) {
            log.error("Error occurs while validating {}",e.toString());
            filterChain.doFilter(request, response);
            return;
        }

        filterChain.doFilter(request,response);
    }
}