package dev.project.hanium.repository;

import dev.project.hanium.domain.MetricAnomaly;
import dev.project.hanium.fixture.MetricFixtureFactory;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

import java.util.List;
import java.util.stream.IntStream;
import java.util.stream.LongStream;


@SpringBootTest
@Transactional
class MetricAnomalyRepositoryTest {
    @Autowired
    MetricAnomalyRepository metricAnomalyRepository;



    @Test
    public void givenTestData_whenSelect_then() {
        LongStream.rangeClosed(1,10)
                .mapToObj(MetricFixtureFactory::createMetricAnomaly)
                .forEach(m -> System.out.println(m.getDetector()));

//        metricAnomalyRepository.saveAll(list);
//        Assertions.assertThat(metricAnomalyRepository.count()).isEqualTo(5);
    }

    @Test
    public void givenTestData_whenCount() {

    }

}