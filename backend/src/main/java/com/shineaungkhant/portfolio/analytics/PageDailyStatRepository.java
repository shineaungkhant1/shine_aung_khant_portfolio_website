package com.shineaungkhant.portfolio.analytics;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

interface PageDailyStatRepository extends JpaRepository<PageDailyStat, Long> {

  @Modifying
  @Query(
      value =
          """
          insert into page_daily_stats (day, path, views, unique_visitors)
          values (:day, :path, 1, :uniqueIncrement)
          on conflict (day, path) do update set
            views = page_daily_stats.views + 1,
            unique_visitors = page_daily_stats.unique_visitors + excluded.unique_visitors
          """,
      nativeQuery = true)
  void upsertView(
      @Param("day") LocalDate day, @Param("path") String path, @Param("uniqueIncrement") long uniqueIncrement);

  @Query(
      """
      select coalesce(sum(s.views), 0) from PageDailyStat s
      where s.day between :from and :to
      """)
  long sumViews(@Param("from") LocalDate from, @Param("to") LocalDate to);

  @Query(
      """
      select s from PageDailyStat s
      where s.day between :from and :to
      order by s.views desc, s.path asc
      """)
  List<PageDailyStat> findBetween(@Param("from") LocalDate from, @Param("to") LocalDate to);

  @Query(
      """
      select s.day, coalesce(sum(s.views), 0) from PageDailyStat s
      where s.day between :from and :to
      group by s.day
      """)
  List<Object[]> sumViewsByDay(@Param("from") LocalDate from, @Param("to") LocalDate to);
}
