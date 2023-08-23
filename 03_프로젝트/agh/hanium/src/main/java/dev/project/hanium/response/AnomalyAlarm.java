package dev.project.hanium.response;

import dev.project.hanium.domain.LogAnomaly;
import dev.project.hanium.domain.MetricAnomaly;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class AnomalyAlarm {
    private String detector;
    private double score;

    public static AnomalyAlarm fromLogEntity(LogAnomaly logAnomaly) {
        return AnomalyAlarm.builder()
                .detector(logAnomaly.getDetector())
                .score(logAnomaly.getScore())
                .build();
    }

    public static AnomalyAlarm fromMetricEntity(MetricAnomaly metricAnomaly) {
        return AnomalyAlarm.builder()
                .detector(metricAnomaly.getDetector())
                .score(metricAnomaly.getScore())
                .build();
    }

    @Builder
    public AnomalyAlarm(String detector, double score) {
        this.detector = detector;
        this.score = score;
    }
}
