package com.shineaungkhant.portfolio.config;

import com.shineaungkhant.portfolio.audit.AdminAudit;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;

class AdminAuditInterceptor implements HandlerInterceptor {

  private static final Logger log = LoggerFactory.getLogger(AdminAuditInterceptor.class);

  private final AdminAudit audit;

  AdminAuditInterceptor(AdminAudit audit) {
    this.audit = audit;
  }

  @Override
  public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception exception) {
    if (exception != null || response.getStatus() >= 400) {
      return;
    }
    String action = switch (request.getMethod()) {
      case "POST" -> "create";
      case "PUT" -> "update";
      case "DELETE" -> "delete";
      default -> null;
    };
    if (action == null || request.getRequestURI() == null || !request.getRequestURI().startsWith("/api/")) {
      return;
    }
    String resource = request.getRequestURI().startsWith("/api/sessions") ? "/api/sessions" : request.getRequestURI();
    try {
      audit.record(action, resource);
    } catch (RuntimeException failure) {
      log.warn("Could not record admin action {} {}", action, resource, failure);
    }
  }
}
