package com.shineaungkhant.portfolio.auth;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import java.util.Map;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private final AdminSessionService sessions;

  public AuthController(AdminSessionService sessions) {
    this.sessions = sessions;
  }

  @GetMapping("/session")
  public Map<String, String> session(Authentication authentication) {
    if (authentication == null || !(authentication.getPrincipal() instanceof AdminPrincipal principal)) {
      throw new AuthRejectedException("Unauthorized");
    }
    return Map.of("username", principal.username(), "deviceId", principal.deviceId());
  }

  @PostMapping("/login")
  public TokenResponse login(@Valid @RequestBody LoginRequest request) {
    return sessions.login(request);
  }

  @PostMapping("/refresh")
  public TokenResponse refresh(@Valid @RequestBody RefreshRequest request) {
    return sessions.refresh(request);
  }

  @PostMapping("/logout")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void logout(Authentication authentication, @RequestBody(required = false) LogoutRequest request) {
    String sessionId = null;
    if (authentication != null && authentication.getPrincipal() instanceof AdminPrincipal principal) {
      sessionId = principal.sessionId();
    }
    String refreshToken = request == null ? null : request.refreshToken();
    if (sessionId == null && (refreshToken == null || refreshToken.isBlank())) {
      throw new AuthRejectedException("Unauthorized");
    }
    sessions.logout(sessionId, refreshToken);
  }
}
