package dev.project.hanium.ELK_Query;

import lombok.Getter;
import lombok.Setter;

@Getter@Setter
public class MetricQueryMax {
    private int size;
    private Query query;
    private AggregationsMax aggs;
}
