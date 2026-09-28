package com.shineaungkhant.portfolio.certification;

import com.shineaungkhant.portfolio.common.NotFoundException;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CertificationService {

  private final CertificationRepository certifications;

  public CertificationService(CertificationRepository certifications) {
    this.certifications = certifications;
  }

  @Transactional(readOnly = true)
  public List<Certification> list() {
    return certifications.findAllByOrderBySortOrderAscIdAsc();
  }

  @Transactional
  public Certification create(CertificationRequest request) {
    Certification certification = new Certification();
    certification.apply(request);
    certification.setSortOrder(certifications.findAll().stream().mapToInt(Certification::getSortOrder).max().orElse(-1) + 1);
    return certifications.save(certification);
  }

  @Transactional
  public Certification update(Long id, CertificationRequest request) {
    Certification certification = certifications.findById(id).orElseThrow(() -> new NotFoundException("Certification not found"));
    certification.apply(request);
    return certifications.save(certification);
  }

  @Transactional
  public void delete(Long id) {
    if (!certifications.existsById(id)) {
      throw new NotFoundException("Certification not found");
    }
    certifications.deleteById(id);
  }
}
