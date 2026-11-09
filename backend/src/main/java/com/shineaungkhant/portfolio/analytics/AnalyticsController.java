package com.shineaungkhant.portfolio.analytics;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

  private final AnalyticsService analytics;

  public AnalyticsController(AnalyticsService analytics) {
    this.analytics = analytics;
  }

  @PostMapping("/pageview")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void pageview(@Valid @RequestBody PageviewRequest request, HttpServletRequest http) {
    if (isBot(http.getHeader("User-Agent"))) {
      return;
    }
    analytics.record(request);
  }

  @GetMapping("/summary")
  public AnalyticsSummary summary() {
    return analytics.summary();
  }

  private static boolean isBot(String userAgent) {
    if (userAgent == null || userAgent.isBlank()) {
      return true;
    }
    String value = userAgent.toLowerCase();
    return value.contains("bot")
        || value.contains("spider")
        || value.contains("crawl")
        || value.contains("slurp")
        || value.contains("preview")
        || value.contains("facebookexternalhit")
        || value.contains("whatsapp")
        || value.contains("telegram");
  }
}
