package com.shineaungkhant.portfolio.profile;

import com.shineaungkhant.portfolio.common.Clean;
import com.shineaungkhant.portfolio.common.Links;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "profile")
public class Profile {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private String role;

  @Column(nullable = false)
  private String location;

  @Column(nullable = false)
  private String origin;

  @Column(nullable = false)
  private String email;

  @Column(nullable = false)
  private String emailHref;

  @Column(nullable = false)
  private String phone;

  @Column(nullable = false)
  private String phoneHref;

  @Column(nullable = false)
  private String linkedin;

  @Column(nullable = false)
  private String github;

  @Column(nullable = false)
  private String resume;

  @Column(nullable = false, length = 2000)
  private String summary;

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getRole() {
    return role;
  }

  public String getLocation() {
    return location;
  }

  public String getOrigin() {
    return origin;
  }

  public String getEmail() {
    return email;
  }

  public String getEmailHref() {
    return emailHref;
  }

  public String getPhone() {
    return phone;
  }

  public String getPhoneHref() {
    return phoneHref;
  }

  public String getLinkedin() {
    return linkedin;
  }

  public String getGithub() {
    return github;
  }

  public String getResume() {
    return resume;
  }

  public String getSummary() {
    return summary;
  }

  public void apply(ProfileRequest request) {
    name = Clean.required(request.name());
    role = Clean.required(request.role());
    location = Clean.required(request.location());
    origin = Clean.required(request.origin());
    email = Clean.required(request.email());
    emailHref = Links.emailHref(request.emailHref());
    phone = Clean.required(request.phone());
    phoneHref = Links.phoneHref(request.phoneHref());
    linkedin = Links.https(request.linkedin());
    github = Links.https(request.github());
    resume = Links.resume(request.resume());
    summary = Clean.required(request.summary());
  }
}
