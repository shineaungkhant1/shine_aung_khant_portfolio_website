package com.shineaungkhant.portfolio.config;

import com.shineaungkhant.portfolio.auth.AccessTokens;
import com.shineaungkhant.portfolio.auth.AdminPrincipal;
import com.shineaungkhant.portfolio.auth.AdminSession;
import com.shineaungkhant.portfolio.auth.AdminSessionService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

class BearerTokenFilter extends OncePerRequestFilter {

  private final AccessTokens tokens;
  private final AdminSessionService sessions;

  BearerTokenFilter(AccessTokens tokens, AdminSessionService sessions) {
    this.tokens = tokens;
    this.sessions = sessions;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws ServletException, IOException {
    String header = request.getHeader("Authorization");
    if (header == null || !header.startsWith("Bearer ")) {
      chain.doFilter(request, response);
      return;
    }
    Map<String, Object> payload = tokens.verify(header.substring("Bearer ".length()).trim());
    AdminSession session = payload == null
        ? null
        : sessions.active(String.valueOf(payload.get("sid")), String.valueOf(payload.get("did")));
    if (payload == null || session == null) {
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      response.setContentType("application/json");
      response.getWriter().write("{\"error\":\"Unauthorized\"}");
      return;
    }
    AdminPrincipal principal = new AdminPrincipal(session.getUsername(), session.getId(), session.getDeviceId());
    var authentication = new UsernamePasswordAuthenticationToken(
        principal,
        null,
        List.of(new SimpleGrantedAuthority("ROLE_ADMIN")));
    SecurityContextHolder.getContext().setAuthentication(authentication);
    chain.doFilter(request, response);
  }
}
