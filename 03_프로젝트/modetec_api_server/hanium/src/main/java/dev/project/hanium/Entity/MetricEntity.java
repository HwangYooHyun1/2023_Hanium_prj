package dev.project.hanium.Entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
@Getter@Setter
@Document(indexName = ".ds-metricbeat-8.8.2-2023.08.10-000001")
public class MetricEntity {
    @Id
    private String id;

    @Field(name = "@timestamp", type = FieldType.Date)
    private String timestamp;

    @Field(type = FieldType.Nested)
    private SystemField system;

    @Field(type = FieldType.Object)
    private HostField host;

    // getters and setters
}
@Getter@Setter
class SystemField {
    @Field(type = FieldType.Nested)
    private CpuField cpu;
    @Field(type = FieldType.Nested)
    private MemoryField memory;
    @Field(type = FieldType.Nested)
    private NetworkField network;

    // getters and setters
}
@Getter@Setter
class CpuField {
    @Field(type = FieldType.Object)
    private TotalField total;

    // getters and setters
}
@Getter@Setter
class MemoryField {
    @Field(type = FieldType.Object)
    private ActualField actual;

    // getters and setters
}
@Getter@Setter
class NetworkField {
    @Field(type = FieldType.Object)
    private InField in;
    @Field(type = FieldType.Object)
    private OutField out;

    // getters and setters
}
@Getter@Setter
class ActualField {
    @Field(type = FieldType.Object)
    private UsedField used;

    // getters and setters
}
@Getter@Setter
class UsedField {
    @Field(name = "pct", type = FieldType.Float)
    private float pct;

    // getters and setters
}
@Getter@Setter
class TotalField {
    @Field(name = "pct", type = FieldType.Float)
    private float pct;

    // getters and setters
}
@Getter@Setter
class InField {
    @Field(name = "bytes", type = FieldType.Long)
    private Long bytes ;

    // getters and setters
}
@Getter@Setter
class OutField {
    @Field(name = "bytes", type = FieldType.Long)
    private Long bytes ;

    // getters and setters
}

@Getter@Setter
class HostField {
    @Field(name = "hostname", type = FieldType.Keyword)
    private String hostname;

    // getters and setters
}
