package com.shineaungkhant.portfolio.analytics;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PageviewRequest(
    @NotBlank @Size(max = 300) String path,
    @NotBlank @Size(max = 128) String visitorId) {}
