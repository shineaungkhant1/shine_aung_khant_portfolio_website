package com.shineaungkhant.portfolio.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.web.filter.OncePerRequestFilter;

class AuthRateLimitFilter extends OncePerRequestFilter {

  private final AuthRateLimiter limiter;

  AuthRateLimitFilter(AuthRateLimiter limiter) {
    this.limiter = limiter;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws ServletException, IOException {
    if (!limits(request)) {
      chain.doFilter(request, response);
      return;
    }

    String key = request.getRemoteAddr();
    long now = System.currentTimeMillis();
    if (limiter.isLocked(key, now)) {
      response.setStatus(429);
      response.setHeader("Retry-After", "900");
      response.setContentType("application/json");
      response.getWriter().write("{\"error\":\"Too many attempts. Try again later.\"}");
      return;
    }

    chain.doFilter(request, response);
    boolean login = "POST".equals(request.getMethod()) && "/api/auth/login".equals(request.getRequestURI());
    if (request.getHeader("Authorization") == null && !login) {
      return;
    }
    if (response.getStatus() == 401) {
      limiter.recordFailure(key, now);
    } else if (response.getStatus() < 400) {
      limiter.recordSuccess(key);
    }
  }

  private boolean limits(HttpServletRequest request) {
    if (request.getRequestURI() == null || !request.getRequestURI().startsWith("/api/")) {
      return false;
    }
    String method = request.getMethod();
    return !"GET".equals(method) && !"HEAD".equals(method) && !"OPTIONS".equals(method);
  }
}
