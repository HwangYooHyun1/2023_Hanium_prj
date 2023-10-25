package dev.project.hanium.response;

import dev.project.hanium.domain.AnomalyEntity;
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

    public static AnomalyAlarm fromEntity(AnomalyEntity entity) {
        return AnomalyAlarm.builder()
                .detector(entity.detector())
                .score(entity.score())
                .build();
    }

    @Builder
    public AnomalyAlarm(String detector, double score) {
        this.detector = detector;
        this.score = score;
    }
}
