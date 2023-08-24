package dev.project.hanium.dto;

import dev.project.hanium.domain.LogAnomaly;
import dev.project.hanium.domain.MetricAnomaly;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ReportDto {
    private String detector;
    private LocalDateTime time;
    private double score;
    private String content;

    public static ReportDto fromMetric(MetricAnomaly metricAnomaly) {
        return ReportDto.builder()
                .detector(metricAnomaly.getDetector())
                .time(metricAnomaly.getTime())
                .score(metricAnomaly.getScore())
                .build();
    }
    public static ReportDto fromLog(LogAnomaly logAnomaly) {
        return ReportDto.builder()
                .detector(logAnomaly.getDetector())
                .time(logAnomaly.getTime())
                .score(logAnomaly.getScore())
                .content(logAnomaly.getSourceIp())
                .build();
    }

    @Builder
    public ReportDto(String detector, LocalDateTime time, double score, String content) {
        this.detector = detector;
        this.time = time;
        this.score = score;
        this.content = content;
    }
}
