package com.shineaungkhant.portfolio.config;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.function.Function;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.Ordered;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

/**
 * Spring's {@code ${...}} placeholders treat {@code $$} as one {@code $}. Reading the admin
 * password from the process environment keeps every character, including a doubled dollar sign.
 */
public class RawEnvironmentPostProcessor implements EnvironmentPostProcessor, Ordered {

  @Override
  public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
    Map<String, Object> raw = rawAdminPassword(System::getenv);
    if (!raw.isEmpty()) {
      environment.getPropertySources().addFirst(new MapPropertySource("rawAdminPassword", raw));
    }
  }

  public static Map<String, Object> rawAdminPassword(Function<String, String> env) {
    Map<String, Object> raw = new LinkedHashMap<>();
    String password = env.apply("ADMIN_PASSWORD");
    if (password != null) {
      raw.put("app.admin.password", password);
    }
    return raw;
  }

  @Override
  public int getOrder() {
    return Ordered.LOWEST_PRECEDENCE;
  }
}
