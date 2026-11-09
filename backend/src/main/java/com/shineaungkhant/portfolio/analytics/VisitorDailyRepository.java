package com.shineaungkhant.portfolio.analytics;

import java.time.LocalDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

interface VisitorDailyRepository extends JpaRepository<VisitorDaily, VisitorDailyId> {

  @Modifying
  @Query(
      value =
          """
          insert into visitor_daily (day, visitor_hash)
          values (:day, :visitorHash)
          on conflict do nothing
          """,
      nativeQuery = true)
  int insertIfAbsent(@Param("day") LocalDate day, @Param("visitorHash") String visitorHash);

  @Query(
      """
      select count(v) from VisitorDaily v
      where v.day between :from and :to
      """)
  long countVisitors(@Param("from") LocalDate from, @Param("to") LocalDate to);

  @Query(
      """
      select v.day, count(v) from VisitorDaily v
      where v.day between :from and :to
      group by v.day
      """)
  java.util.List<Object[]> countByDay(@Param("from") LocalDate from, @Param("to") LocalDate to);
}
