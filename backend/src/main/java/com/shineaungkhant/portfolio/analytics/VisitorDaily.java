package com.shineaungkhant.portfolio.analytics;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "visitor_daily")
@IdClass(VisitorDailyId.class)
public class VisitorDaily {

  @Id
  @Column(name = "stat_day", nullable = false)
  private LocalDate day;

  @Id
  @Column(name = "visitor_hash", nullable = false, length = 64)
  private String visitorHash;
}
