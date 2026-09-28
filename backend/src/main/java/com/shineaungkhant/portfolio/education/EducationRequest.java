package com.shineaungkhant.portfolio.education;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record EducationRequest(
    @NotBlank @Size(max = 200) String title,
    @NotBlank @Size(max = 200) String org,
    @NotBlank @Size(max = 80) String period) {}
