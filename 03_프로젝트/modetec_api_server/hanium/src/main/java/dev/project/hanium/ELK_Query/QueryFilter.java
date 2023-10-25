package dev.project.hanium.ELK_Query;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class QueryFilter {
    private Range range;

    public QueryFilter(Range range) {
        this.range = range;
    }
// Getters and setters
}
