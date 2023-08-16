package dev.project.hanium.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

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
    private long time;

    @Column(nullable = false)
    private double score;

    @Column(nullable = false)
    private String sourceIp;

    @Builder
    public LogAnomaly(Long id, String detector, long time, double score,String sourceIp) {
        this.id = id;
        this.detector = detector;
        this.time = time;
        this.score = score;
        this.sourceIp = sourceIp;
    }

}
