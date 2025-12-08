package com.example.apilimiter.security;

import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.example.apilimiter.entities.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class AuthUtil {

    @Value("${jwt.secretkey}")
    private String jwtSecretkey;

    SecretKey getsecretkey() {
        return Keys.hmacShaKeyFor(jwtSecretkey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateaccesstoken(User user) {
        return Jwts.builder().setSubject(user.getUsername()).claim("userId", user.getId().toString()).claim("password", user.getEmail())
                .setIssuedAt(new Date()).setExpiration(Date.from(Instant.now().plus(Duration.ofMinutes(10))))
                .signWith(getsecretkey()).compact();
    }



    
}
