package dev.project.hanium.ELK_Query;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class QueryBool {
    private QueryFilter filter;

    public QueryBool(QueryFilter filter) {
        this.filter = filter;
    }

    // Getters and setters
}
