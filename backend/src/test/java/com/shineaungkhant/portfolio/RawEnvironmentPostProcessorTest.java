package com.shineaungkhant.portfolio;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.shineaungkhant.portfolio.config.RawEnvironmentPostProcessor;
import java.util.Map;
import org.junit.jupiter.api.Test;

class RawEnvironmentPostProcessorTest {

  @Test
  void keepsBothDollarSignsInTheAdminPassword() {
    Map<String, Object> raw = RawEnvironmentPostProcessor.rawAdminPassword(name ->
        "ADMIN_PASSWORD".equals(name) ? "sak123!@#Pa$$w0rd" : null);

    assertEquals("sak123!@#Pa$$w0rd", raw.get("app.admin.password"));
  }

  @Test
  void leavesThePasswordAloneWhenTheVariableIsMissing() {
    assertTrue(RawEnvironmentPostProcessor.rawAdminPassword(name -> null).isEmpty());
  }
}
