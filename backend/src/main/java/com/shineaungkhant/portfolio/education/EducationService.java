package com.shineaungkhant.portfolio.education;

import com.shineaungkhant.portfolio.common.NotFoundException;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EducationService {

  private final EducationRepository educations;

  public EducationService(EducationRepository educations) {
    this.educations = educations;
  }

  @Transactional(readOnly = true)
  public List<Education> list() {
    return educations.findAllByOrderBySortOrderAscIdAsc();
  }

  @Transactional
  public Education create(EducationRequest request) {
    Education education = new Education();
    education.apply(request);
    education.setSortOrder(educations.findAll().stream().mapToInt(Education::getSortOrder).max().orElse(-1) + 1);
    return educations.save(education);
  }

  @Transactional
  public Education update(Long id, EducationRequest request) {
    Education education = educations.findById(id).orElseThrow(() -> new NotFoundException("Education not found"));
    education.apply(request);
    return educations.save(education);
  }

  @Transactional
  public void delete(Long id) {
    if (!educations.existsById(id)) {
      throw new NotFoundException("Education not found");
    }
    educations.deleteById(id);
  }
}
