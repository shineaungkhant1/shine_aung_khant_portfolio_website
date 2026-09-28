package com.shineaungkhant.portfolio.common;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public final class Clean {

  private Clean() {}

  public static List<String> list(List<String> values) {
    if (values == null) {
      return new ArrayList<>();
    }
    List<String> cleaned = new ArrayList<>();
    for (String value : values) {
      if (value == null) {
        continue;
      }
      String trimmed = value.trim();
      if (!trimmed.isEmpty()) {
        cleaned.add(trimmed);
      }
    }
    return cleaned;
  }

  public static String text(String value) {
    if (value == null) {
      return null;
    }
    String trimmed = value.trim();
    return trimmed.isEmpty() ? null : trimmed;
  }

  public static String required(String value) {
    String trimmed = text(value);
    return trimmed == null ? "" : trimmed;
  }

  public static String slug(String value) {
    String source = required(value).toLowerCase(Locale.ROOT);
    String slug = source.replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", "");
    return slug.isEmpty() ? "project" : slug;
  }
}
