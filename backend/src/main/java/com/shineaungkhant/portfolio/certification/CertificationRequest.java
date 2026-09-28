package com.shineaungkhant.portfolio.certification;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CertificationRequest(
    @NotBlank @Size(max = 200) String title,
    @NotBlank @Size(max = 400) String href) {}
