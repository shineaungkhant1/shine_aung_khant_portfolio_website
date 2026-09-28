package com.shineaungkhant.portfolio.profile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ProfileRequest(
    @NotBlank @Size(max = 120) String name,
    @NotBlank @Size(max = 120) String role,
    @NotBlank @Size(max = 120) String location,
    @NotBlank @Size(max = 120) String origin,
    @NotBlank @Size(max = 200) String email,
    @NotBlank @Size(max = 400) String emailHref,
    @NotBlank @Size(max = 40) String phone,
    @NotBlank @Size(max = 40) String phoneHref,
    @NotBlank @Size(max = 400) String linkedin,
    @NotBlank @Size(max = 400) String github,
    @NotBlank @Size(max = 400) String resume,
    @NotBlank @Size(max = 2000) String summary) {}
