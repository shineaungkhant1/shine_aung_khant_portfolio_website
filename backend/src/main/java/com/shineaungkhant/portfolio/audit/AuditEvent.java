package com.shineaungkhant.portfolio.audit;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;

@Entity
@Table(name = "audit_events")
public class AuditEvent {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private Instant occurredAt;

  @Column(nullable = false)
  private String actor;

  @Column(nullable = false, length = 64)
  private String action;

  @Column(nullable = false, length = 500)
  private String resource;

  protected AuditEvent() {}

  AuditEvent(String actor, String action, String resource) {
    this.occurredAt = Instant.now();
    this.actor = actor;
    this.action = action;
    this.resource = resource;
  }
}
