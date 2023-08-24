package dev.project.hanium.domain;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public class Anomaly {

    @Id
    private Long id;

    @Column(nullable = false)
    private String detector;

    @Column(nullable = false)
    private long time;

    @Column(nullable = false)
    private double score;
}
