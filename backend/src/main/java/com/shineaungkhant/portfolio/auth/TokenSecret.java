package com.shineaungkhant.portfolio.auth;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;
import org.springframework.stereotype.Component;

@Component
public class TokenSecret {

  public String value() {
    String token = System.getenv("TOKEN_SECRET");
    if (usable(token)) {
      return token;
    }
    String session = System.getenv("ADMIN_SESSION_SECRET");
    if (usable(session)) {
      return session;
    }
    String password = System.getenv("ADMIN_PASSWORD");
    if (password != null && !password.isBlank()) {
      return sha256("portfolio-token:" + password);
    }
    return "dev-token-secret-change-me-32chars";
  }

  private boolean usable(String value) {
    return value != null && value.trim().length() >= 32;
  }

  private String sha256(String value) {
    try {
      byte[] digest = MessageDigest.getInstance("SHA-256").digest(value.getBytes(StandardCharsets.UTF_8));
      return HexFormat.of().formatHex(digest);
    } catch (NoSuchAlgorithmException exception) {
      throw new IllegalStateException(exception);
    }
  }
}
