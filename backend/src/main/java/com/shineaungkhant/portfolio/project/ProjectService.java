package com.shineaungkhant.portfolio.project;

import com.shineaungkhant.portfolio.common.Clean;
import com.shineaungkhant.portfolio.common.NotFoundException;
import java.util.List;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProjectService {

  private final ProjectRepository projects;

  public ProjectService(ProjectRepository projects) {
    this.projects = projects;
  }

  @Transactional(readOnly = true)
  public List<Project> list() {
    List<Project> found = projects.findAllByOrderBySortOrderAscIdAsc();
    found.forEach(this::loadText);
    return found;
  }

  @Transactional(readOnly = true)
  public Project get(String slug) {
    Project project = projects.findBySlug(slug).orElseThrow(() -> new NotFoundException("Project not found"));
    loadText(project);
    return project;
  }

  @Transactional
  public Project create(ProjectRequest request) {
    Project project = new Project();
    project.apply(request, uniqueSlug(Clean.slug(request.slug() == null || request.slug().isBlank() ? request.name() : request.slug()), null));
    project.setSortOrder(nextSortOrder());
    return projects.save(project);
  }

  @Transactional
  public Project update(String slug, ProjectRequest request) {
    Project project = get(slug);
    String nextSlug = Clean.slug(request.slug() == null || request.slug().isBlank() ? request.name() : request.slug());
    project.apply(request, uniqueSlug(nextSlug, project.getId()));
    return projects.save(project);
  }

  @Transactional
  public void delete(String slug) {
    projects.delete(get(slug));
  }

  private void loadText(Project project) {
    Hibernate.initialize(project.getPoints());
    Hibernate.initialize(project.getStack());
  }

  private int nextSortOrder() {
    return projects.findAll().stream().mapToInt(Project::getSortOrder).max().orElse(-1) + 1;
  }

  private String uniqueSlug(String base, Long currentId) {
    String candidate = base;
    int suffix = 2;
    while (conflicts(candidate, currentId)) {
      candidate = base + "-" + suffix;
      suffix += 1;
    }
    return candidate;
  }

  private boolean conflicts(String slug, Long currentId) {
    return projects.findBySlug(slug).filter(existing -> currentId == null || !existing.getId().equals(currentId)).isPresent();
  }
}
