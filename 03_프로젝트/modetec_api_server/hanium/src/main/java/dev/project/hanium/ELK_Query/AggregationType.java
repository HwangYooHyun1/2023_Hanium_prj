package dev.project.hanium.ELK_Query;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AggregationType {
    private String field;

    public AggregationType(String field) {
        this.field = field;
    }
// Getters and setters
}
