package com.shineaungkhant.portfolio.config;

import java.util.Locale;
import java.util.Set;

public final class AdminPasswordPolicy {

  private static final Set<String> WEAK = Set.of("changeme", "password", "admin");

  private AdminPasswordPolicy() {}

  public static void check(boolean production, boolean hosted, String password) {
    if (hosted && !production) {
      throw new IllegalStateException("Set SPRING_PROFILES_ACTIVE=prod before starting the API on the host");
    }
    if (production && weak(password)) {
      throw new IllegalStateException(
          "Set a unique ADMIN_PASSWORD of at least 12 characters before starting the API in production");
    }
  }

  static boolean weak(String password) {
    if (password == null) {
      return true;
    }
    String value = password.trim();
    if (value.length() < 12) {
      return true;
    }
    String lower = value.toLowerCase(Locale.ROOT);
    return WEAK.contains(lower) || lower.contains("changeme");
  }
}
