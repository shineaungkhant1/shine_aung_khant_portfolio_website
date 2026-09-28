package com.shineaungkhant.portfolio.education;

import com.shineaungkhant.portfolio.common.Clean;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "education")
public class Education {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String title;

  @Column(nullable = false)
  private String org;

  @Column(nullable = false)
  private String period;

  @Column(nullable = false)
  private int sortOrder;

  public Long getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }

  public String getOrg() {
    return org;
  }

  public String getPeriod() {
    return period;
  }

  public int getSortOrder() {
    return sortOrder;
  }

  public void setSortOrder(int sortOrder) {
    this.sortOrder = sortOrder;
  }

  public void apply(EducationRequest request) {
    title = Clean.required(request.title());
    org = Clean.required(request.org());
    period = Clean.required(request.period());
  }
}
