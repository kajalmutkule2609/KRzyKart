package org.techhub.eComWebsite.utility;

import java.util.Date;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JwtUtil {
    private static final String SECRET_KEY ="KRzyKartEcomWebsite";
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 10;

    public static String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }

    public static Claims verifyToken(String token) {
        try {
            return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
        } catch (Exception e) {
            return null;
        }
    }

    public static String getUsernameFromToken(String token) {
        Claims claims = verifyToken(token);
        if (claims != null) {
            return claims.getSubject();
        }
        return null;
    }
}



