package dev.project.hanium.repository;

import dev.project.hanium.domain.MetricAnomaly;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MetricAnomalyRepository extends JpaRepository<MetricAnomaly,Long> {
    long count();
}
