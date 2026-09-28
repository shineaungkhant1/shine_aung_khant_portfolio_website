package com.shineaungkhant.portfolio.auth;

import com.shineaungkhant.portfolio.config.AdminProperties;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;
import java.util.HexFormat;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminSessionService {

  static final Duration REFRESH_LIFETIME = Duration.ofDays(14);

  private final AdminSessionRepository sessions;
  private final AccessTokens tokens;
  private final UserDetailsService users;
  private final PasswordEncoder encoder;
  private final AdminProperties admin;
  private final SecureRandom random = new SecureRandom();

  public AdminSessionService(
      AdminSessionRepository sessions,
      AccessTokens tokens,
      UserDetailsService users,
      PasswordEncoder encoder,
      AdminProperties admin) {
    this.sessions = sessions;
    this.tokens = tokens;
    this.users = users;
    this.encoder = encoder;
    this.admin = admin;
  }

  @Transactional
  public TokenResponse login(LoginRequest request) {
    if (!admin.username().equals(request.username())) {
      throw new AuthRejectedException("Unauthorized");
    }
    UserDetails user = users.loadUserByUsername(admin.username());
    if (!encoder.matches(request.password(), user.getPassword())) {
      throw new AuthRejectedException("Unauthorized");
    }
    sessions.deleteByExpiresAtBefore(Instant.now());
    sessions.deleteByUsername(admin.username());
    return issue(openSession(request.deviceId()));
  }

  @Transactional
  public TokenResponse refresh(RefreshRequest request) {
    AdminSession session = sessions.findByRefreshTokenHash(hash(request.refreshToken()))
        .orElseThrow(() -> new AuthRejectedException("Unauthorized"));
    if (!session.getExpiresAt().isAfter(Instant.now())) {
      sessions.delete(session);
      throw new AuthRejectedException("Unauthorized");
    }
    if (!session.getDeviceId().equals(request.deviceId())) {
      throw new AuthRejectedException("This account is signed in on another device");
    }
    String refreshToken = randomToken();
    session.rotate(hash(refreshToken), Instant.now().plus(REFRESH_LIFETIME));
    return issue(session, refreshToken);
  }

  @Transactional
  public void logout(String sessionId, String refreshToken) {
    if (sessionId != null) {
      sessions.deleteById(sessionId);
      return;
    }
    if (refreshToken != null && !refreshToken.isBlank()) {
      sessions.findByRefreshTokenHash(hash(refreshToken)).ifPresent(sessions::delete);
    }
  }

  @Transactional(readOnly = true)
  public AdminSession active(String sessionId, String deviceId) {
    return sessions.findById(sessionId)
        .filter(session -> session.getDeviceId().equals(deviceId))
        .filter(session -> session.getExpiresAt().isAfter(Instant.now()))
        .orElse(null);
  }

  private Issued openSession(String deviceId) {
    String refreshToken = randomToken();
    AdminSession session = new AdminSession(
        randomId(),
        admin.username(),
        deviceId,
        hash(refreshToken),
        Instant.now().plus(REFRESH_LIFETIME));
    sessions.save(session);
    return new Issued(session, refreshToken);
  }

  private TokenResponse issue(Issued issued) {
    return issue(issued.session(), issued.refreshToken());
  }

  private TokenResponse issue(AdminSession session, String refreshToken) {
    Instant accessExpiry = Instant.now().plusSeconds(AccessTokens.LIFETIME_SECONDS);
    String access = tokens.issue(session.getId(), session.getUsername(), session.getDeviceId(), accessExpiry);
    return TokenResponse.of(access, refreshToken, AccessTokens.LIFETIME_SECONDS);
  }

  private String randomToken() {
    byte[] bytes = new byte[32];
    random.nextBytes(bytes);
    return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
  }

  private String randomId() {
    byte[] bytes = new byte[32];
    random.nextBytes(bytes);
    return HexFormat.of().formatHex(bytes);
  }

  static String hash(String token) {
    try {
      byte[] digest = MessageDigest.getInstance("SHA-256").digest(token.getBytes(StandardCharsets.UTF_8));
      return HexFormat.of().formatHex(digest);
    } catch (Exception exception) {
      throw new IllegalStateException(exception);
    }
  }

  private record Issued(AdminSession session, String refreshToken) {}
}
