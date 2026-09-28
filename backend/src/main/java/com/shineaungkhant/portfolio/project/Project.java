package com.shineaungkhant.portfolio.project;

import com.shineaungkhant.portfolio.common.Clean;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OrderColumn;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects")
public class Project {

  public enum Category {
    Streaming,
    Commerce,
    Education,
    Delivery
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true)
  private String slug;

  @Column(nullable = false)
  private String name;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private Category category;

  @Column(nullable = false)
  private String org;

  @Column(nullable = false)
  private String period;

  @Column(nullable = false, length = 2000)
  private String summary;

  @Column(length = 500)
  private String outcome;

  @ElementCollection
  @CollectionTable(name = "project_points", joinColumns = @JoinColumn(name = "project_id"))
  @OrderColumn(name = "position")
  @Column(name = "point", length = 500)
  private List<String> points = new ArrayList<>();

  @ElementCollection
  @CollectionTable(name = "project_stack", joinColumns = @JoinColumn(name = "project_id"))
  @OrderColumn(name = "position")
  @Column(name = "item")
  private List<String> stack = new ArrayList<>();

  private String appStore;

  private String playStore;

  @Column(nullable = false)
  private boolean featured;

  @Column(nullable = false)
  private int sortOrder;

  public Long getId() {
    return id;
  }

  public String getSlug() {
    return slug;
  }

  public String getName() {
    return name;
  }

  public Category getCategory() {
    return category;
  }

  public String getOrg() {
    return org;
  }

  public String getPeriod() {
    return period;
  }

  public String getSummary() {
    return summary;
  }

  public String getOutcome() {
    return outcome;
  }

  public List<String> getPoints() {
    return points;
  }

  public List<String> getStack() {
    return stack;
  }

  public String getAppStore() {
    return appStore;
  }

  public String getPlayStore() {
    return playStore;
  }

  public boolean isFeatured() {
    return featured;
  }

  public int getSortOrder() {
    return sortOrder;
  }

  public void setSortOrder(int sortOrder) {
    this.sortOrder = sortOrder;
  }

  public void apply(ProjectRequest request, String slug) {
    this.slug = slug;
    name = Clean.required(request.name());
    try {
      category = Category.valueOf(Clean.required(request.category()));
    } catch (IllegalArgumentException exception) {
      throw new IllegalArgumentException("Category must be Streaming, Commerce, Education, or Delivery");
    }
    org = Clean.required(request.org());
    period = Clean.required(request.period());
    summary = Clean.required(request.summary());
    outcome = Clean.text(request.outcome());
    points = Clean.list(request.points());
    stack = Clean.list(request.stack());
    appStore = Clean.text(request.appStore());
    playStore = Clean.text(request.playStore());
    featured = Boolean.TRUE.equals(request.featured());
  }
}
