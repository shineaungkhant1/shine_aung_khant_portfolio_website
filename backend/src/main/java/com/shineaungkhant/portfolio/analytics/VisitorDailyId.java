package com.shineaungkhant.portfolio.analytics;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

public class VisitorDailyId implements Serializable {

  private LocalDate day;
  private String visitorHash;

  public VisitorDailyId() {}

  @Override
  public boolean equals(Object other) {
    if (this == other) {
      return true;
    }
    if (!(other instanceof VisitorDailyId that)) {
      return false;
    }
    return Objects.equals(day, that.day) && Objects.equals(visitorHash, that.visitorHash);
  }

  @Override
  public int hashCode() {
    return Objects.hash(day, visitorHash);
  }
}
