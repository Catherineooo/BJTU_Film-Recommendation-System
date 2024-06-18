package com.yan.movielens.util;

import com.yan.movielens.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;

import io.jsonwebtoken.SignatureException;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {
    private String secretKey = "drj_nb"; // 密钥
    private long validityInMilliseconds = 1000 * 60 * 60 * 10; // token有效期10小时

    // 验证token是否有效
    public boolean validateToken(String token) {
        try {
            // 解析token，如果没有抛出异常，则表示token有效
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (SignatureException | MalformedJwtException | ExpiredJwtException | UnsupportedJwtException | IllegalArgumentException e) {
            // token解析异常，或者过期、格式不正确等情况
            return false;
        }
    }

    // 加入用户id和username
    public String generateToken(User user) {
        long now = System.currentTimeMillis();
        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("id", user.getId())
                .claim("username", user.getUsername())
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + validityInMilliseconds))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    // 新增方法来解析token
    public Claims extractClaims(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }

    public Integer getUserIdFromToken(String token) {
        Claims claims = extractClaims(token);
        return claims.get("id", Integer.class);
    }

    public String getUsernameFromToken(String token) {
        Claims claims = extractClaims(token);
        return claims.getSubject();
    }
}
