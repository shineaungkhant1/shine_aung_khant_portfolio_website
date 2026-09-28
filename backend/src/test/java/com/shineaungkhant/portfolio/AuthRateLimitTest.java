package com.shineaungkhant.portfolio;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthRateLimitTest {

  private static final String ADDRESS = "203.0.113.10";

  @Autowired
  private MockMvc mvc;

  @Test
  void locksAnAddressAfterRepeatedPasswordGuesses() throws Exception {
    for (int attempt = 0; attempt < 8; attempt++) {
      mvc.perform(post("/api/auth").with(httpBasic("admin", "wrong")).with(fromAddress()))
          .andExpect(status().isUnauthorized());
    }

    mvc.perform(post("/api/auth").with(httpBasic("admin", "changeme")).with(fromAddress()))
        .andExpect(status().isTooManyRequests());
  }

  private RequestPostProcessor fromAddress() {
    return request -> {
      request.setRemoteAddr(ADDRESS);
      return request;
    };
  }
}
