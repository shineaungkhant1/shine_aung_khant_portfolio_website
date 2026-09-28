package com.shineaungkhant.portfolio.auth;

import jakarta.validation.constraints.Size;

public record LogoutRequest(@Size(max = 500) String refreshToken) {}
