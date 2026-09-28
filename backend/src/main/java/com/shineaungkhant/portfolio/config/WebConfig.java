package com.shineaungkhant.portfolio.config;

import com.shineaungkhant.portfolio.audit.AdminAudit;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  private final AdminAudit audit;

  public WebConfig(AdminAudit audit) {
    this.audit = audit;
  }

  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(new AdminAuditInterceptor(audit));
  }
}
