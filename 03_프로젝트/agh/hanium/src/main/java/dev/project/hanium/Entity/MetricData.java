package dev.project.hanium.Entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Getter@Setter
@Document(indexName = ".ds-metricbeat-8.8.2-2023.08.10-000001")
public class MetricData {
    @Field(name = "avg_net_in", type = FieldType.Object)
    private AvgNetIn avgNetIn;

    @Field(name = "max_net_in", type = FieldType.Object)
    private MaxNetIn maxNetIn;

    @Field(name = "max_cpu", type = FieldType.Object)
    private MaxCpu maxCpu;

    @Field(name = "avg_mem", type = FieldType.Object)
    private AvgMem avgMem;

    @Field(name = "avg_cpu", type = FieldType.Object)
    private AvgCpu avgCpu;

    @Field(name = "max_net_out", type = FieldType.Object)
    private MaxNetOut maxNetOut;

    @Field(name = "max_mem", type = FieldType.Object)
    private MaxMem maxMem;

    @Field(name = "avg_net_out", type = FieldType.Object)
    private AvgNetOut avgNetOut;
}
@Getter@Setter
class AvgNetIn{
    @Field(name="value",type = FieldType.Double)
    private Double value;
}
@Getter@Setter
class AvgNetOut{
    @Field(name="value",type = FieldType.Double)
    private Double value;
}
@Getter@Setter
class AvgCpu{
    @Field(name="value",type = FieldType.Double)
    private Double value;
}
@Getter@Setter
class AvgMem{
    @Field(name="value",type = FieldType.Double)
    private Double value;
}
@Getter@Setter
class MaxCpu{
    @Field(name="value",type = FieldType.Double)
    private Double value;
}
@Getter@Setter
class MaxMem{
    @Field(name="value",type = FieldType.Double)
    private Double value;
}
@Getter@Setter
class MaxNetIn{
    @Field(name="value",type = FieldType.Long)
    private Long value;
}
@Getter@Setter
class MaxNetOut{
    @Field(name="value",type = FieldType.Long)
    private Long value;
}

