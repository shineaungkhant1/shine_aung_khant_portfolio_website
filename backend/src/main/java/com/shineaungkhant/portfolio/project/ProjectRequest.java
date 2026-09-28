package com.shineaungkhant.portfolio.project;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;

public record ProjectRequest(
    @Size(max = 80) String slug,
    @NotBlank @Size(max = 120) String name,
    @NotBlank @Size(max = 40) String category,
    @NotBlank @Size(max = 160) String org,
    @NotBlank @Size(max = 80) String period,
    @NotBlank @Size(max = 2000) String summary,
    @Size(max = 500) String outcome,
    List<@NotBlank @Size(max = 500) String> points,
    List<@NotBlank @Size(max = 80) String> stack,
    @Size(max = 400) String appStore,
    @Size(max = 400) String playStore,
    Boolean featured) {}
