package com.shineaungkhant.portfolio.certification;

import com.shineaungkhant.portfolio.common.Clean;
import com.shineaungkhant.portfolio.common.Links;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "certifications")
public class Certification {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String title;

  @Column(nullable = false, length = 400)
  private String href;

  @Column(nullable = false)
  private int sortOrder;

  public Long getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }

  public String getHref() {
    return href;
  }

  public int getSortOrder() {
    return sortOrder;
  }

  public void setSortOrder(int sortOrder) {
    this.sortOrder = sortOrder;
  }

  public void apply(CertificationRequest request) {
    title = Clean.required(request.title());
    href = Links.https(request.href());
  }
}
