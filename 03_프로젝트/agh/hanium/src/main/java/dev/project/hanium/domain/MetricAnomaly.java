package dev.project.hanium.domain;

import lombok.*;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.TimeZone;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class MetricAnomaly {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String detector;

    @Column(nullable = false)
    private LocalDateTime time;

    @Column(nullable = false)
    private double score;

    @Builder
    public MetricAnomaly(Long id, String detector, LocalDateTime time, double score) {
        this.id = id;
        this.detector = detector;
        this.time = time;
        this.score = score;
    }

    public static LocalDateTime getTimestampToDate(long unixTimestamp) {
        return LocalDateTime.ofInstant(Instant.ofEpochMilli(unixTimestamp),
                TimeZone.getDefault().toZoneId());
    }
}
