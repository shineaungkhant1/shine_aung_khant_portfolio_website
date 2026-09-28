package com.shineaungkhant.portfolio.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.stereotype.Component;

/**
 * Replaces the in-memory admin password with the raw environment value. Spring property
 * placeholders turn {@code $$} into one {@code $} before the user is created.
 */
@Component
public class RawAdminPassword implements InitializingBean {

  private static final Logger log = LoggerFactory.getLogger(RawAdminPassword.class);

  private final UserDetailsService users;
  private final PasswordEncoder encoder;
  private final AdminProperties admin;

  public RawAdminPassword(UserDetailsService users, PasswordEncoder encoder, AdminProperties admin) {
    this.users = users;
    this.encoder = encoder;
    this.admin = admin;
  }

  @Override
  public void afterPropertiesSet() {
    String raw = System.getenv("ADMIN_PASSWORD");
    if (raw == null || raw.isBlank() || !(users instanceof InMemoryUserDetailsManager manager)) {
      return;
    }
    int dollars = raw.length() - raw.replace("$", "").length();
    log.info("Using ADMIN_PASSWORD from the environment (length {}, dollar signs {})", raw.length(), dollars);
    UserDetails current = manager.loadUserByUsername(admin.username());
    manager.updatePassword(current, encoder.encode(raw));
  }
}
