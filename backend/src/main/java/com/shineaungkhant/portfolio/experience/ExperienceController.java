package com.shineaungkhant.portfolio.experience;

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
@RequestMapping("/api/experience")
public class ExperienceController {

  private final ExperienceService experiences;

  public ExperienceController(ExperienceService experiences) {
    this.experiences = experiences;
  }

  @GetMapping
  public List<Experience> list() {
    return experiences.list();
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Experience create(@Valid @RequestBody ExperienceRequest request) {
    return experiences.create(request);
  }

  @PutMapping("/{id}")
  public Experience update(@PathVariable Long id, @Valid @RequestBody ExperienceRequest request) {
    return experiences.update(id, request);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) {
    experiences.delete(id);
  }
}
