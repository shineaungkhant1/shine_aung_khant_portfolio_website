package com.shineaungkhant.portfolio.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record LoginRequest(
    @NotBlank @Size(max = 120) String username,
    @NotBlank @Size(max = 200) String password,
    @NotBlank @Size(min = 8, max = 128) @Pattern(regexp = "[A-Za-z0-9_-]+") String deviceId) {}
