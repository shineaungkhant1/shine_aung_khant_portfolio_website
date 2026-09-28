package com.shineaungkhant.portfolio;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.shineaungkhant.portfolio.config.AdminPasswordPolicy;
import org.junit.jupiter.api.Test;

class AdminPasswordPolicyTest {

  @Test
  void localDevelopmentCanUseTheDefaultPassword() {
    assertDoesNotThrow(() -> AdminPasswordPolicy.check(false, false, "changeme"));
  }

  @Test
  void productionRejectsAShortOrDefaultPassword() {
    assertThrows(IllegalStateException.class, () -> AdminPasswordPolicy.check(true, false, "changeme"));
    assertThrows(IllegalStateException.class, () -> AdminPasswordPolicy.check(true, false, "changeme-changeme"));
    assertThrows(IllegalStateException.class, () -> AdminPasswordPolicy.check(true, true, ""));
  }

  @Test
  void aHostMustOptIntoTheProductionProfile() {
    assertThrows(IllegalStateException.class, () -> AdminPasswordPolicy.check(false, true, "a-long-unique-pass"));
  }

  @Test
  void productionAcceptsAUniquePassword() {
    assertDoesNotThrow(() -> AdminPasswordPolicy.check(true, true, "a-long-unique-pass"));
  }
}
