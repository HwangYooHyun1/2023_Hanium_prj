package dev.project.hanium.response.metric;

import dev.project.hanium.dto.metric.Records;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MetricResponseData {
    private String detector;
    private long  time;
    private double score;

    @Builder
    public MetricResponseData(String detector, long time, double score) {
        this.detector = detector;
        this.time = time;
        this.score = score;
    }

    public static MetricResponseData from(Records records) {
        return MetricResponseData.builder()
                .detector(records.getField_name() + " " + records.getFunction())
                .time(records.getTimestamp())
                .score(records.getRecord_score())
                .build();
    }
}
