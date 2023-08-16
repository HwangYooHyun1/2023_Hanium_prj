package dev.project.hanium.ELK_Query;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TimestampField {
    private String gte;
    private String lte;

    public TimestampField(String gte, String lte) {
        this.gte = gte;
        this.lte = lte;
    }
}
