package dev.project.hanium.service;

import dev.project.hanium.Entity.RequestDate;
import dev.project.hanium.repository.LogAnomalyRepository;
import dev.project.hanium.repository.MetricAnomalyRepository;
import dev.project.hanium.dto.ReportDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Stream;

import static java.util.stream.Collectors.*;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final MetricAnomalyRepository metricAnomalyRepository;
    private final LogAnomalyRepository logAnomalyRepository;

    public List<ReportDto> reports(LocalDateTime startDate, LocalDateTime endDate) {
        List<ReportDto> metric = metricAnomalyRepository.findMetricAnomalyByTimeBetween(startDate, endDate)
                .stream().map(ReportDto::fromMetric).collect(toList());

        List<ReportDto> log = logAnomalyRepository.findLogAnomaliesByTimeBetween(startDate, endDate)
                .stream().map(ReportDto::fromLog).collect(toList());

        return Stream.concat(metric.stream(), log.stream())
                .collect(toList());
    }
}
