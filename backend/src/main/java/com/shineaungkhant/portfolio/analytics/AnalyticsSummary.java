package com.shineaungkhant.portfolio.analytics;

import java.time.LocalDate;
import java.util.List;

public record AnalyticsSummary(
    long todayViews,
    long todayVisitors,
    long weekViews,
    long weekVisitors,
    List<DayStat> last7Days,
    List<PageStat> topPages) {

  public record DayStat(LocalDate day, long views, long visitors) {}

  public record PageStat(String path, long views, long uniqueVisitors) {}
}
