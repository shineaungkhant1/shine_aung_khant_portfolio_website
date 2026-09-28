package com.shineaungkhant.portfolio.common;

import java.net.URI;
import java.net.URISyntaxException;

public final class Links {

  private Links() {}

  public static String https(String value) {
    String trimmed = Clean.text(value);
    if (trimmed == null || !isHttps(trimmed)) {
      throw new IllegalArgumentException("Use an https link");
    }
    return trimmed;
  }

  public static String optionalHttps(String value) {
    String trimmed = Clean.text(value);
    if (trimmed == null) {
      return null;
    }
    if (!isHttps(trimmed)) {
      throw new IllegalArgumentException("Use an https link");
    }
    return trimmed;
  }

  public static String emailHref(String value) {
    String trimmed = Clean.text(value);
    if (trimmed != null && (isHttps(trimmed) || isMailto(trimmed))) {
      return trimmed;
    }
    throw new IllegalArgumentException("Use an https or mailto link");
  }

  public static String phoneHref(String value) {
    String trimmed = Clean.text(value);
    if (trimmed == null || !trimmed.matches("tel:\\+[0-9]{8,15}")) {
      throw new IllegalArgumentException("Use a tel link with a country code");
    }
    return trimmed;
  }

  public static String resume(String value) {
    String trimmed = Clean.text(value);
    if (trimmed != null && (isSitePath(trimmed) || isHttps(trimmed))) {
      return trimmed;
    }
    throw new IllegalArgumentException("Use a site path or an https link");
  }

  private static boolean isSitePath(String value) {
    return value.matches("/[A-Za-z0-9._/-]+") && !value.contains("..") && !value.contains("//");
  }

  private static boolean isMailto(String value) {
    return value.matches("(?i)mailto:[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}");
  }

  private static boolean isHttps(String value) {
    if (value.indexOf('\\') >= 0) {
      return false;
    }
    for (int i = 0; i < value.length(); i++) {
      char ch = value.charAt(i);
      if (ch <= ' ' || ch > 126) {
        return false;
      }
    }
    try {
      URI uri = new URI(value);
      String host = uri.getHost();
      return uri.getUserInfo() == null
          && host != null
          && host.contains(".")
          && "https".equalsIgnoreCase(uri.getScheme())
          && value.regionMatches(true, 0, "https://", 0, 8);
    } catch (URISyntaxException exception) {
      return false;
    }
  }
}
