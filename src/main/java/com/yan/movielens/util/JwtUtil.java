package com.yan.movielens.util;

import com.yan.movielens.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtUtil {
    private String secretKey = "drj_nb"; // 密钥

    // 加入用户id和username
    public String generateToken(User user) {
        long now = System.currentTimeMillis();
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", user.getId());
        claims.put("username", user.getUsername());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + 1000 * 60 * 60 * 10)) // token有效期10小时
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    // 新增方法来解析token
    public Claims extractClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }

    public Integer getUserIdFromToken(String token) {
        Claims claims = extractClaims(token);
        return Integer.parseInt(claims.get("id").toString());
    }

    public String getUsernameFromToken(String token) {
        Claims claims = extractClaims(token);
        return claims.get("username").toString();
    }
}
