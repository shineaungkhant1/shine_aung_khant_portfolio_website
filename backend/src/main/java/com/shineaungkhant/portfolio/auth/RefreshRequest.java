package com.shineaungkhant.portfolio.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RefreshRequest(
    @NotBlank @Size(max = 500) String refreshToken,
    @NotBlank @Size(min = 8, max = 128) @Pattern(regexp = "[A-Za-z0-9_-]+") String deviceId) {}
