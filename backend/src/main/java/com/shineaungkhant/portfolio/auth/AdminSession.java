package com.shineaungkhant.portfolio.auth;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;

@Entity
@Table(name = "admin_sessions")
public class AdminSession {

  @Id
  @Column(length = 64)
  private String id;

  @Column(nullable = false, length = 120)
  private String username;

  @Column(nullable = false, length = 128)
  private String deviceId;

  @Column(nullable = false, length = 64)
  private String refreshTokenHash;

  @Column(nullable = false)
  private Instant expiresAt;

  protected AdminSession() {}

  AdminSession(String id, String username, String deviceId, String refreshTokenHash, Instant expiresAt) {
    this.id = id;
    this.username = username;
    this.deviceId = deviceId;
    this.refreshTokenHash = refreshTokenHash;
    this.expiresAt = expiresAt;
  }

  public String getId() {
    return id;
  }

  public String getUsername() {
    return username;
  }

  public String getDeviceId() {
    return deviceId;
  }

  public String getRefreshTokenHash() {
    return refreshTokenHash;
  }

  public Instant getExpiresAt() {
    return expiresAt;
  }

  void rotate(String refreshTokenHash, Instant expiresAt) {
    this.refreshTokenHash = refreshTokenHash;
    this.expiresAt = expiresAt;
  }
}
