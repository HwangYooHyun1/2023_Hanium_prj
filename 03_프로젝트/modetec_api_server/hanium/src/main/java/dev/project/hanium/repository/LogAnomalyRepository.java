package dev.project.hanium.repository;

import dev.project.hanium.domain.LogAnomaly;
import dev.project.hanium.domain.MetricAnomaly;
import dev.project.hanium.dto.LogAnomalyDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LogAnomalyRepository extends JpaRepository<LogAnomaly,Long> {
    List<LogAnomaly> findLogAnomaliesByTimeBetween(LocalDateTime start, LocalDateTime end);

}
