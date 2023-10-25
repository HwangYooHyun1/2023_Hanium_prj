package dev.project.hanium.fixture;

import dev.project.hanium.dto.LogAnomalyDto;
import dev.project.hanium.dto.Records;
import org.jeasy.random.EasyRandom;
import org.jeasy.random.EasyRandomParameters;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.LongStream;

public class LogAnomalyDtoFixtureFactory {
    public static LogAnomalyDto create(int n) {
        List<Records> records = LongStream.rangeClosed(1, n)
                .mapToObj(LogAnomalyDtoFixtureFactory::createRecords)
                .collect(Collectors.toList());
        LogAnomalyDto result = new LogAnomalyDto(records);
        result.setCount(records.size());
        result.setRecords(records);
        return result;
    }


    private static Records createRecords(Long seed) {
        EasyRandomParameters erp = new EasyRandomParameters().seed(seed);
        return new EasyRandom(erp).nextObject(Records.class);
    }
}
