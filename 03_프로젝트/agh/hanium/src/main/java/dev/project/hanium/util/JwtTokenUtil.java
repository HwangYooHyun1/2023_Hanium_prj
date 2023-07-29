package dev.project.hanium.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

public class JwtTokenUtil {

    //토큰 만드는 메서드
    public static String generateToken(String id,String key,long expiredTimeMs){
        //key 는 해당 user id 을 넣은 값을 암호화 할 때 사용하는 암호화 key
        //이 Claims 를 만들어줘서 여기에 id 를 넣어줄 것임
        //토큰 유효화 시간도 넣어줄 것임 expiredTimeMs

        Claims claims = Jwts.claims();
        //토큰 만들 때 user id를 넣어줘서 그 id 를 확인하는 식으로 해서 토큰을 만들어줌
        //passwd 도 같이 넣어줘도 되는데 일단 id 넣자.
        //claims 에 user id 를 넣어줘서 이 claims 를 가지고 body 를 만들 것임
        claims.put("id",id);

        //토큰 return
        return Jwts.builder()
                .setClaims(claims)
                //발행 시간
                .setIssuedAt(new Date(System.currentTimeMillis()))
                //유효 시간
                .setExpiration(new Date(System.currentTimeMillis() + expiredTimeMs))
                //key 값과 암호화 알고리즘을 넘겨줌
                //key 구하는  것은 따로 static 메소드 실행 후 반환 값 넘겨줌
                .signWith(getKey(key), SignatureAlgorithm.HS256)
                .compact();
    }

    //일단 private 으로
    //key 를 가지고 오는?
    private static Key getKey(String key) {
        //key 를 byte 로 변환
        byte[] bytes = key.getBytes(StandardCharsets.UTF_8);

        //key 반환
        return Keys.hmacShaKeyFor(bytes);
    }


    public static String getUserName(String token, String key) {
        return extractClaims(token, key).get("username",String.class);
    }

    //token 이 expired 되었는지 확인
    public static boolean isExpired(String token, String key) {
        //extractClaims 로 모든 Claims 를 가져온 후 거기서 Expiration 만 가져옴
        Date expiredDate = extractClaims(token, key).getExpiration();
        //현재 시각보다도 이전인지 체크
        return expiredDate.before(new Date());
    }

    //token 에서 claims 를 다 가져오는 메서드
    private static Claims extractClaims(String token, String key) {
        return Jwts.parserBuilder()
                .setSigningKey(getKey(key))
                .build().parseClaimsJws(token).getBody();
    }
}
