package dev.project.hanium.repository;

import dev.project.hanium.domain.MetricAnomaly;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MetricAnomalyRepository extends JpaRepository<MetricAnomaly,Long> {
    long count();
    List<MetricAnomaly> findMetricAnomalyByTimeBetween(LocalDateTime start, LocalDateTime end);
}
