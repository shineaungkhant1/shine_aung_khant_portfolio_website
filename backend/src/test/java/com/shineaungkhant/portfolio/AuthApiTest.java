package com.shineaungkhant.portfolio;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthApiTest {

  @Autowired
  private MockMvc mvc;

  @Test
  void loginIssuesTokensAndReplacesThePreviousDevice() throws Exception {
    String first = login("device-one-aaaa");
    String firstAccess = JsonPath.read(first, "$.accessToken");
    String firstRefresh = JsonPath.read(first, "$.refreshToken");

    login("device-two-bbbb");

    mvc.perform(post("/api/auth/refresh")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {"refreshToken":"%s","deviceId":"device-one-aaaa"}
                """.formatted(firstRefresh)))
        .andExpect(status().isUnauthorized());

    mvc.perform(delete("/api/projects/missing")
            .header("Authorization", "Bearer " + firstAccess))
        .andExpect(status().isUnauthorized());
  }

  @Test
  void refreshRotatesTheTokenForTheSameDevice() throws Exception {
    String body = login("device-same-cccc");
    String refresh = JsonPath.read(body, "$.refreshToken");

    MvcResult rotated = mvc.perform(post("/api/auth/refresh")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {"refreshToken":"%s","deviceId":"device-same-cccc"}
                """.formatted(refresh)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.accessToken").isNotEmpty())
        .andExpect(jsonPath("$.tokenType").value("Bearer"))
        .andReturn();

    String next = JsonPath.read(rotated.getResponse().getContentAsString(), "$.refreshToken");
    mvc.perform(post("/api/auth/refresh")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {"refreshToken":"%s","deviceId":"device-same-cccc"}
                """.formatted(refresh)))
        .andExpect(status().isUnauthorized());

    mvc.perform(post("/api/auth/logout")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {"refreshToken":"%s"}
                """.formatted(next)))
        .andExpect(status().isNoContent());

    mvc.perform(post("/api/auth/refresh")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {"refreshToken":"%s","deviceId":"device-same-cccc"}
                """.formatted(next)))
        .andExpect(status().isUnauthorized());
  }

  @Test
  void wrongPasswordIsRejected() throws Exception {
    mvc.perform(post("/api/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {"username":"admin","password":"wrong-password","deviceId":"device-bad-dddd"}
                """))
        .andExpect(status().isUnauthorized());
  }

  private String login(String deviceId) throws Exception {
    MvcResult result = mvc.perform(post("/api/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {"username":"admin","password":"changeme","deviceId":"%s"}
                """.formatted(deviceId)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.expiresIn").value(900))
        .andReturn();
    return result.getResponse().getContentAsString();
  }
}
