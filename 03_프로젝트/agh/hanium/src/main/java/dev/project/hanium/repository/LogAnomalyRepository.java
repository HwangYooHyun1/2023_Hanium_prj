package dev.project.hanium.repository;

import dev.project.hanium.domain.LogAnomaly;
import dev.project.hanium.dto.LogAnomalyDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogAnomalyRepository extends JpaRepository<LogAnomaly,Long> {
}
