package com.shineaungkhant.portfolio.config;

import java.util.Arrays;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import com.shineaungkhant.portfolio.auth.AccessTokens;
import com.shineaungkhant.portfolio.auth.AdminSessionService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  public SecurityConfig(Environment environment, AdminProperties admin) {
    boolean production = Arrays.asList(environment.getActiveProfiles()).contains("prod");
    AdminPasswordPolicy.check(production, hosted(), admin.password());
  }

  static boolean hosted() {
    if ("true".equalsIgnoreCase(System.getenv("RENDER"))) {
      return true;
    }
    String service = System.getenv("RENDER_SERVICE_ID");
    return service != null && !service.isBlank();
  }

  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity http, AccessTokens tokens, AdminSessionService sessions) throws Exception {
    return http
        .csrf(csrf -> csrf.disable())
        .cors(Customizer.withDefaults())
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers(HttpMethod.POST, "/api/auth/login", "/api/auth/refresh", "/api/auth/logout").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/auth/session").authenticated()
            .requestMatchers(HttpMethod.GET, "/api/**").permitAll()
            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
            .requestMatchers("/api/**").authenticated()
            .anyRequest().permitAll())
        .httpBasic(Customizer.withDefaults())
        .addFilterBefore(new BearerTokenFilter(tokens, sessions), BasicAuthenticationFilter.class)
        .addFilterBefore(new AuthRateLimitFilter(new AuthRateLimiter()), BasicAuthenticationFilter.class)
        .build();
  }

  @Bean
  UserDetailsService users(AdminProperties admin, PasswordEncoder encoder) {
    return new InMemoryUserDetailsManager(
        User.withUsername(admin.username())
            .password(encoder.encode(admin.password()))
            .roles("ADMIN")
            .build());
  }

  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
