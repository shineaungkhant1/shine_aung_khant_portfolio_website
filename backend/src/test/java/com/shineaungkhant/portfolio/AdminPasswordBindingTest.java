package com.shineaungkhant.portfolio;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assumptions.assumeTrue;

import com.shineaungkhant.portfolio.config.AdminProperties;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class AdminPasswordBindingTest {

  @Autowired
  private AdminProperties admin;

  @Test
  void usesTheEnvironmentPasswordWithoutCollapsingDollarSigns() {
    String expected = System.getenv("ADMIN_PASSWORD");
    assumeTrue(expected != null, "ADMIN_PASSWORD is not set");
    assertEquals(expected, admin.password());
  }
}
