package com.shineaungkhant.portfolio.project;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

  private final ProjectService projects;

  public ProjectController(ProjectService projects) {
    this.projects = projects;
  }

  @GetMapping
  public List<Project> list() {
    return projects.list();
  }

  @GetMapping("/{slug}")
  public Project get(@PathVariable String slug) {
    return projects.get(slug);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Project create(@Valid @RequestBody ProjectRequest request) {
    return projects.create(request);
  }

  @PutMapping("/{slug}")
  public Project update(@PathVariable String slug, @Valid @RequestBody ProjectRequest request) {
    return projects.update(slug, request);
  }

  @DeleteMapping("/{slug}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable String slug) {
    projects.delete(slug);
  }
}
