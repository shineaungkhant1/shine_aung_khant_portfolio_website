package com.shineaungkhant.portfolio.experience;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;

public record ExperienceRequest(
    @NotBlank @Size(max = 160) String role,
    @NotBlank @Size(max = 160) String org,
    @NotBlank @Size(max = 80) String place,
    @NotBlank @Size(max = 80) String period,
    List<@NotBlank @Size(max = 500) String> points) {}
