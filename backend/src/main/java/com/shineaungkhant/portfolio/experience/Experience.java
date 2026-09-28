package com.shineaungkhant.portfolio.experience;

import com.shineaungkhant.portfolio.common.Clean;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OrderColumn;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "experience")
public class Experience {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String role;

  @Column(nullable = false)
  private String org;

  @Column(nullable = false)
  private String place;

  @Column(nullable = false)
  private String period;

  @ElementCollection
  @CollectionTable(name = "experience_points", joinColumns = @JoinColumn(name = "experience_id"))
  @OrderColumn(name = "position")
  @Column(name = "point", length = 500)
  private List<String> points = new ArrayList<>();

  @Column(nullable = false)
  private int sortOrder;

  public Long getId() {
    return id;
  }

  public String getRole() {
    return role;
  }

  public String getOrg() {
    return org;
  }

  public String getPlace() {
    return place;
  }

  public String getPeriod() {
    return period;
  }

  public List<String> getPoints() {
    return points;
  }

  public int getSortOrder() {
    return sortOrder;
  }

  public void setSortOrder(int sortOrder) {
    this.sortOrder = sortOrder;
  }

  public void apply(ExperienceRequest request) {
    role = Clean.required(request.role());
    org = Clean.required(request.org());
    place = Clean.required(request.place());
    period = Clean.required(request.period());
    points = Clean.list(request.points());
  }
}
