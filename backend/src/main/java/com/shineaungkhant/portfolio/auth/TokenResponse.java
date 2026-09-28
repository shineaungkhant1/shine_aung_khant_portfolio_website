package com.shineaungkhant.portfolio.auth;

public record TokenResponse(String accessToken, String refreshToken, String tokenType, long expiresIn) {

  static TokenResponse of(String accessToken, String refreshToken, long expiresIn) {
    return new TokenResponse(accessToken, refreshToken, "Bearer", expiresIn);
  }
}
