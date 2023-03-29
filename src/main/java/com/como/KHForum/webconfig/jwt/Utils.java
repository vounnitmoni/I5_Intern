package com.como.KHForum.webconfig.jwt;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.web.util.WebUtils;

import com.como.KHForum.webconfig.service.UserDetailsImpl;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;


import io.jsonwebtoken.*;
public class Utils {
    private static final Logger logger = LoggerFactory.getLogger(Utils.class);

    @Value("${nitmoni.app.jwtSecret}")
    private String jwtSecret;
    @Value("${nitmoni.app.jwtExpirationMs}")
    private int jwtExpiration;
    @Value("${nitmoni.app.jwtCookieName}")
    private String jwtCookie;

    public String getJwtFromCookies(HttpServletRequest request) {
        Cookie cookie = WebUtils.getCookie(request, jwtCookie);
        if (cookie != null) {
          return cookie.getValue();
        } else {
          return null;
        }
      }
    
      public ResponseCookie generateJwtCookie(UserDetailsImpl userPrincipal) {
        String jwt = generateTokenFromUsername(userPrincipal.getUsername());
        ResponseCookie cookie = ResponseCookie.from(jwtCookie, jwt).path("/api").maxAge(24 * 60 * 60).httpOnly(true).build();
        return cookie;
      }
    
      public ResponseCookie getCleanJwtCookie() {
        ResponseCookie cookie = ResponseCookie.from(jwtCookie, null).path("/api").build();
        return cookie;
      }
    
      public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
      }
    
      public boolean validateJwtToken(String authToken) {
        try {
          Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
          return true;
        } catch (SignatureException e) {
          logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
          logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
          logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
          logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
          logger.error("JWT claims string is empty: {}", e.getMessage());
        }
    
        return false;
      }
      
      public String generateTokenFromUsername(String username) {   
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date())
            .setExpiration(new Date((new Date()).getTime() + jwtExpiration))
            .signWith(SignatureAlgorithm.HS512, jwtSecret)
            .compact();
      }
      public String generateAccessToken(UserDetailsImpl username) {   
        return Jwts.builder()
            .setSubject(String.format("%s", username.getUsername()))
            .setIssuedAt(new Date())
            .setExpiration(new Date((new Date()).getTime() + jwtExpiration))
            .signWith(SignatureAlgorithm.HS512, jwtSecret)
            .compact();
      }
}
