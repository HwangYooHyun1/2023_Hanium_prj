package dev.project.hanium.fixture;

import dev.project.hanium.dto.metric.MetricAnomalyDto;
import dev.project.hanium.dto.metric.Records;
import org.jeasy.random.EasyRandom;
import org.jeasy.random.EasyRandomParameters;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.LongStream;

public class MetricAnomalyDtoFixtureFactory {
    public static MetricAnomalyDto create(int n) {
        List<Records> records = LongStream.rangeClosed(1, n)
                .mapToObj(MetricAnomalyDtoFixtureFactory::createRecords)
                .collect(Collectors.toList());
        MetricAnomalyDto result = new MetricAnomalyDto(records);
        result.setCount(records.size());
        result.setRecords(records);
        return result;
    }


    private static Records createRecords(Long seed) {
        EasyRandomParameters erp = new EasyRandomParameters().seed(seed);
        return new EasyRandom(erp).nextObject(Records.class);
    }
}
