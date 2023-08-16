package dev.project.hanium.fixture;

import dev.project.hanium.domain.MetricAnomaly;
import dev.project.hanium.dto.metric.MetricAnomalyDto;
import dev.project.hanium.dto.metric.Records;
import dev.project.hanium.repository.MetricAnomalyRepository;
import org.jeasy.random.EasyRandom;
import org.jeasy.random.EasyRandomParameters;
import org.jeasy.random.randomizers.range.LongRangeRandomizer;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;
import java.util.function.Predicate;

import static java.util.stream.Collectors.toList;
import static org.jeasy.random.FieldPredicates.*;

public class MetricFixtureFactory {
    public static MetricAnomaly createMetricAnomaly(Long seed){
        EasyRandomParameters erp = new EasyRandomParameters().seed(seed);
        return new EasyRandom(erp).nextObject(MetricAnomaly.class);
    }

    public static List<MetricAnomaly> requestedTestData(MetricAnomalyRepository metricAnomalyRepository){
        MetricAnomalyDto requestedData = MetricAnomalyDtoFixtureFactory.create(10);
        List<MetricAnomaly> requestAnomaly = requestedData.getRecords().stream().map(Records::toEntity).collect(toList());
        List<MetricAnomaly> currentDB = metricAnomalyRepository.findAll();
        requestAnomaly.addAll(currentDB);

        return requestAnomaly;
    }

}

