package dev.project.hanium.service;

import dev.project.hanium.Entity.RequestDate;
import dev.project.hanium.dto.MetricResultAnomalyDto;
import dev.project.hanium.repository.LogAnomalyRepository;
import dev.project.hanium.repository.MetricAnomalyRepository;
import dev.project.hanium.dto.ReportDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Stream;

import static java.util.stream.Collectors.*;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final MetricAnomalyRepository metricAnomalyRepository;
    private final LogAnomalyRepository logAnomalyRepository;
    private final MetricsService metricsService;

    public List<ReportDto> reports(LocalDateTime startDate, LocalDateTime endDate) {
        List<ReportDto> metric = metricAnomalyRepository.findMetricAnomalyByTimeBetween(startDate, endDate)
                .stream().map(ReportDto::fromMetric).collect(toList());

        List<ReportDto> log = logAnomalyRepository.findLogAnomaliesByTimeBetween(startDate, endDate)
                .stream().map(ReportDto::fromLog).collect(toList());
        List<ReportDto> collect = Stream.concat(metric.stream(), log.stream()).sorted(Comparator.comparing(ReportDto::getTime).reversed())
                .collect(toList());
        for (int i = 0; i < collect.size(); i++) {
            ReportDto report = collect.get(i);
            MetricResultAnomalyDto metricInfo = metricsService.getMetricsForDate(report.getTime());
            collect.get(i).setMetricInfo(metricInfo);
        }
        return collect;
    }
}
