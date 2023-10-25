package dev.project.hanium.ELK_Query;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Range {
    @JsonProperty("@timestamp")
    private TimestampField timestamp;

    public Range(TimestampField timestamp) {
        this.timestamp = timestamp;
    }
// Getters and setters
}
