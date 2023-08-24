package dev.project.hanium.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.TimeZone;

@Entity
@Getter @Setter
@NoArgsConstructor
public class LogAnomaly {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String detector;

    @Column(nullable = false)
    private LocalDateTime time;

    @Column(nullable = false)
    private double score;

    private String sourceIp;

    @Builder
    public LogAnomaly(Long id, String detector, LocalDateTime time, double score,String sourceIp) {
        this.id = id;
        this.detector = detector;
        this.time = time;
        this.score = score;
        this.sourceIp = sourceIp;
    }

    public static LocalDateTime getTimestampToDate(long unixTimestamp) {
        return LocalDateTime.ofInstant(Instant.ofEpochMilli(unixTimestamp),
                TimeZone.getDefault().toZoneId());
    }

}
