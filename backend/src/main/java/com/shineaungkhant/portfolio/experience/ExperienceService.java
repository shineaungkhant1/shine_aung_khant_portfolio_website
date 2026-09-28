package com.shineaungkhant.portfolio.experience;

import com.shineaungkhant.portfolio.common.NotFoundException;
import java.util.List;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ExperienceService {

  private final ExperienceRepository experiences;

  public ExperienceService(ExperienceRepository experiences) {
    this.experiences = experiences;
  }

  @Transactional(readOnly = true)
  public List<Experience> list() {
    List<Experience> found = experiences.findAllByOrderBySortOrderAscIdAsc();
    found.forEach(item -> Hibernate.initialize(item.getPoints()));
    return found;
  }

  @Transactional
  public Experience create(ExperienceRequest request) {
    Experience experience = new Experience();
    experience.apply(request);
    experience.setSortOrder(experiences.findAll().stream().mapToInt(Experience::getSortOrder).max().orElse(-1) + 1);
    return experiences.save(experience);
  }

  @Transactional
  public Experience update(Long id, ExperienceRequest request) {
    Experience experience = experiences.findById(id).orElseThrow(() -> new NotFoundException("Experience not found"));
    experience.apply(request);
    return experiences.save(experience);
  }

  @Transactional
  public void delete(Long id) {
    if (!experiences.existsById(id)) {
      throw new NotFoundException("Experience not found");
    }
    experiences.deleteById(id);
  }
}
