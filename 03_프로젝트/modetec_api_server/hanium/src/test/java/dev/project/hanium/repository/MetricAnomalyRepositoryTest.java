package dev.project.hanium.repository;


import dev.project.hanium.domain.MetricAnomaly;
import dev.project.hanium.fixture.MetricFixtureFactory;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;


import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.TimeZone;
import java.util.stream.LongStream;


@SpringBootTest
@Transactional
class MetricAnomalyRepositoryTest {
    @Autowired
    MetricAnomalyRepository metricAnomalyRepository;

    @Autowired
    LogAnomalyRepository logAnomalyRepository;



    @Test
    public void givenTestData_whenSelect_then() {
        LongStream.rangeClosed(1,10)
                .mapToObj(MetricFixtureFactory::createMetricAnomaly)
                .forEach(m -> System.out.println(m.getDetector()));

//        metricAnomalyRepository.saveAll(list);
//        Assertions.assertThat(metricAnomalyRepository.count()).isEqualTo(5);
    }

    private LocalDateTime getTimestampToDate(long unixTimestamp) {
        return LocalDateTime.ofInstant(Instant.ofEpochMilli(unixTimestamp),
                TimeZone.getDefault().toZoneId());
    }

    @Test
    public void givenLocalDateTime_when() {
        LocalDateTime start = LocalDateTime.parse("2023-08-11T15:30:00");
        LocalDateTime end = LocalDateTime.parse("2023-08-13T15:30:00");
        List<MetricAnomaly> test = metricAnomalyRepository.findMetricAnomalyByTimeBetween(start, end);
        test.stream().forEach(System.out::println);
    }
}