package com.shineaungkhant.portfolio.auth;

import java.time.Instant;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminSessionRepository extends JpaRepository<AdminSession, String> {

  Optional<AdminSession> findByRefreshTokenHash(String refreshTokenHash);

  void deleteByUsername(String username);

  void deleteByExpiresAtBefore(Instant cutoff);
}
