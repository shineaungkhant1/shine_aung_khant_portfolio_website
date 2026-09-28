package com.shineaungkhant.portfolio.audit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminAudit {

  private static final Logger log = LoggerFactory.getLogger(AdminAudit.class);

  private final AuditEventRepository events;

  public AdminAudit(AuditEventRepository events) {
    this.events = events;
  }

  @Transactional
  public void record(String action, String resource) {
    String actor = actor();
    String storedResource = resource.length() > 500 ? resource.substring(0, 500) : resource;
    events.save(new AuditEvent(actor, action, storedResource));
    log.info("actor={} action={} resource={}", actor, action, storedResource);
  }

  private String actor() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null || !authentication.isAuthenticated() || authentication.getName() == null) {
      return "unknown";
    }
    return authentication.getName();
  }
}
