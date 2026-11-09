package com.shineaungkhant.portfolio.analytics;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Clock;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HexFormat;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.regex.Pattern;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AnalyticsService {

  private static final Pattern PATH_PATTERN = Pattern.compile("^/[A-Za-z0-9._~!$&'()*+,;=:@%/-]*$");
  private static final int TOP_PAGES = 8;

  private final PageDailyStatRepository pages;
  private final VisitorDailyRepository visitors;
  private final Clock clock;

  public AnalyticsService(PageDailyStatRepository pages, VisitorDailyRepository visitors) {
    this(pages, visitors, Clock.systemUTC());
  }

  AnalyticsService(PageDailyStatRepository pages, VisitorDailyRepository visitors, Clock clock) {
    this.pages = pages;
    this.visitors = visitors;
    this.clock = clock;
  }

  @Transactional
  public void record(PageviewRequest request) {
    String path = normalizePath(request.path());
    if (path == null) {
      return;
    }

    LocalDate day = LocalDate.now(clock);
    String visitorHash = hashVisitor(request.visitorId());
    boolean firstToday = visitors.insertIfAbsent(day, visitorHash) > 0;
    pages.upsertView(day, path, firstToday ? 1L : 0L);
  }

  @Transactional(readOnly = true)
  public AnalyticsSummary summary() {
    LocalDate today = LocalDate.now(clock);
    LocalDate weekStart = today.minusDays(6);

    long todayViews = pages.sumViews(today, today);
    long todayVisitors = visitors.countVisitors(today, today);
    long weekViews = pages.sumViews(weekStart, today);
    long weekVisitors = visitors.countVisitors(weekStart, today);

    Map<LocalDate, Long> viewsByDay = new LinkedHashMap<>();
    Map<LocalDate, Long> visitorsByDay = new LinkedHashMap<>();
    for (LocalDate day = weekStart; !day.isAfter(today); day = day.plusDays(1)) {
      viewsByDay.put(day, 0L);
      visitorsByDay.put(day, 0L);
    }

    for (Object[] row : pages.sumViewsByDay(weekStart, today)) {
      viewsByDay.put((LocalDate) row[0], ((Number) row[1]).longValue());
    }
    for (Object[] row : visitors.countByDay(weekStart, today)) {
      visitorsByDay.put((LocalDate) row[0], ((Number) row[1]).longValue());
    }

    List<AnalyticsSummary.DayStat> last7Days = new ArrayList<>();
    for (LocalDate day = weekStart; !day.isAfter(today); day = day.plusDays(1)) {
      last7Days.add(
          new AnalyticsSummary.DayStat(day, viewsByDay.getOrDefault(day, 0L), visitorsByDay.getOrDefault(day, 0L)));
    }

    Map<String, long[]> pageTotals = new LinkedHashMap<>();
    for (PageDailyStat row : pages.findBetween(weekStart, today)) {
      long[] totals = pageTotals.computeIfAbsent(row.getPath(), ignored -> new long[2]);
      totals[0] += row.getViews();
      totals[1] += row.getUniqueVisitors();
    }

    List<AnalyticsSummary.PageStat> topPages =
        pageTotals.entrySet().stream()
            .sorted((left, right) -> Long.compare(right.getValue()[0], left.getValue()[0]))
            .limit(TOP_PAGES)
            .map(entry -> new AnalyticsSummary.PageStat(entry.getKey(), entry.getValue()[0], entry.getValue()[1]))
            .toList();

    return new AnalyticsSummary(todayViews, todayVisitors, weekViews, weekVisitors, last7Days, topPages);
  }

  static String normalizePath(String raw) {
    if (raw == null || raw.isBlank()) {
      return null;
    }
    String path = raw.trim();
    int query = path.indexOf('?');
    if (query >= 0) {
      path = path.substring(0, query);
    }
    int hash = path.indexOf('#');
    if (hash >= 0) {
      path = path.substring(0, hash);
    }
    if (path.isEmpty()) {
      path = "/";
    }
    if (!path.startsWith("/")) {
      path = "/" + path;
    }
    if (path.length() > 300) {
      path = path.substring(0, 300);
    }
    String lower = path.toLowerCase(Locale.ROOT);
    if (lower.startsWith("/admin") || lower.startsWith("/api")) {
      return null;
    }
    if (!PATH_PATTERN.matcher(path).matches()) {
      return null;
    }
    return path;
  }

  static String hashVisitor(String visitorId) {
    try {
      MessageDigest digest = MessageDigest.getInstance("SHA-256");
      byte[] hashed = digest.digest(visitorId.trim().getBytes(StandardCharsets.UTF_8));
      return HexFormat.of().formatHex(hashed);
    } catch (NoSuchAlgorithmException error) {
      throw new IllegalStateException(error);
    }
  }
}
