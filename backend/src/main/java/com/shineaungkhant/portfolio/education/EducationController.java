package com.shineaungkhant.portfolio.education;

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
@RequestMapping("/api/education")
public class EducationController {

  private final EducationService educations;

  public EducationController(EducationService educations) {
    this.educations = educations;
  }

  @GetMapping
  public List<Education> list() {
    return educations.list();
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Education create(@Valid @RequestBody EducationRequest request) {
    return educations.create(request);
  }

  @PutMapping("/{id}")
  public Education update(@PathVariable Long id, @Valid @RequestBody EducationRequest request) {
    return educations.update(id, request);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) {
    educations.delete(id);
  }
}
