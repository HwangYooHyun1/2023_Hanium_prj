package dev.project.hanium.dto.metric;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Records {
    private String field_name;
    private String function;
    private long timestamp;
    private double record_score;

    @Override
    public String toString() {
        return "field_name: " + field_name + ", function: " + function + ", timestamp : " + timestamp + " , record_score : " + record_score;
    }
}
