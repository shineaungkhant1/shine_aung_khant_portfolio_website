package com.shineaungkhant.portfolio.auth;

public class AuthRejectedException extends RuntimeException {

  public AuthRejectedException(String message) {
    super(message);
  }
}
