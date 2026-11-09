package com.shineaungkhant.portfolio.analytics;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "page_daily_stats")
public class PageDailyStat {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private LocalDate day;

  @Column(nullable = false, length = 300)
  private String path;

  @Column(nullable = false)
  private long views;

  @Column(name = "unique_visitors", nullable = false)
  private long uniqueVisitors;

  public LocalDate getDay() {
    return day;
  }

  public String getPath() {
    return path;
  }

  public long getViews() {
    return views;
  }

  public long getUniqueVisitors() {
    return uniqueVisitors;
  }
}
