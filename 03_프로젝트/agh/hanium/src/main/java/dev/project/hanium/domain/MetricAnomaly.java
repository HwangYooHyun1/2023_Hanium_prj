package dev.project.hanium.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class MetricAnomaly {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String detector;

    @Column(nullable = false)
    private long  time;

    @Column(nullable = false)
    private double score;

    @Builder
    public MetricAnomaly(Long id, String detector, long time, double score) {
        this.id = id;
        this.detector = detector;
        this.time = time;
        this.score = score;
    }
}
