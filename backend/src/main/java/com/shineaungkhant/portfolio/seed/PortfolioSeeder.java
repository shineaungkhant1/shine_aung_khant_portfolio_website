package com.shineaungkhant.portfolio.seed;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shineaungkhant.portfolio.certification.CertificationRequest;
import com.shineaungkhant.portfolio.certification.CertificationService;
import com.shineaungkhant.portfolio.education.EducationRequest;
import com.shineaungkhant.portfolio.education.EducationService;
import com.shineaungkhant.portfolio.experience.ExperienceRequest;
import com.shineaungkhant.portfolio.experience.ExperienceService;
import com.shineaungkhant.portfolio.profile.ProfileRepository;
import com.shineaungkhant.portfolio.profile.ProfileRequest;
import com.shineaungkhant.portfolio.profile.ProfileService;
import com.shineaungkhant.portfolio.project.ProjectRequest;
import com.shineaungkhant.portfolio.project.ProjectService;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class PortfolioSeeder implements ApplicationRunner {

  private final ObjectMapper mapper;
  private final ProfileRepository profiles;
  private final ProfileService profileService;
  private final ProjectService projects;
  private final ExperienceService experiences;
  private final EducationService educations;
  private final CertificationService certifications;

  public PortfolioSeeder(
      ObjectMapper mapper,
      ProfileRepository profiles,
      ProfileService profileService,
      ProjectService projects,
      ExperienceService experiences,
      EducationService educations,
      CertificationService certifications) {
    this.mapper = mapper;
    this.profiles = profiles;
    this.profileService = profileService;
    this.projects = projects;
    this.experiences = experiences;
    this.educations = educations;
    this.certifications = certifications;
  }

  @Override
  @Transactional
  public void run(ApplicationArguments args) throws Exception {
    if (profiles.count() > 0) {
      return;
    }

    try (InputStream input = new ClassPathResource("seed/portfolio.json").getInputStream()) {
      JsonNode root = mapper.readTree(input);
      for (JsonNode node : root.get("projects")) {
        projects.create(project(node));
      }
      for (JsonNode node : root.get("experience")) {
        experiences.create(experience(node));
      }
      for (JsonNode node : root.get("education")) {
        educations.create(education(node));
      }
      for (JsonNode node : root.get("certifications")) {
        certifications.create(certification(node));
      }
      profileService.save(profile(root.get("profile")));
    }
  }

  private ProfileRequest profile(JsonNode node) {
    return new ProfileRequest(
        text(node, "name"),
        text(node, "role"),
        text(node, "location"),
        text(node, "origin"),
        text(node, "email"),
        text(node, "emailHref"),
        text(node, "phone"),
        text(node, "phoneHref"),
        text(node, "linkedin"),
        text(node, "github"),
        text(node, "resume"),
        text(node, "summary"));
  }

  private ProjectRequest project(JsonNode node) {
    return new ProjectRequest(
        text(node, "slug"),
        text(node, "name"),
        text(node, "category"),
        text(node, "org"),
        text(node, "period"),
        text(node, "summary"),
        text(node, "outcome"),
        strings(node, "points"),
        strings(node, "stack"),
        text(node, "appStore"),
        text(node, "playStore"),
        node.path("featured").asBoolean(false));
  }

  private ExperienceRequest experience(JsonNode node) {
    return new ExperienceRequest(text(node, "role"), text(node, "org"), text(node, "place"), text(node, "period"), strings(node, "points"));
  }

  private EducationRequest education(JsonNode node) {
    return new EducationRequest(text(node, "title"), text(node, "org"), text(node, "period"));
  }

  private CertificationRequest certification(JsonNode node) {
    return new CertificationRequest(text(node, "title"), text(node, "href"));
  }

  private String text(JsonNode node, String field) {
    JsonNode value = node.get(field);
    if (value == null || value.isNull()) {
      return null;
    }
    return value.asText();
  }

  private List<String> strings(JsonNode node, String field) {
    List<String> values = new ArrayList<>();
    JsonNode array = node.get(field);
    if (array == null || !array.isArray()) {
      return values;
    }
    array.forEach(item -> values.add(item.asText()));
    return values;
  }
}
