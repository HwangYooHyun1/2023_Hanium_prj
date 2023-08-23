package dev.project.hanium.fixture;

import dev.project.hanium.domain.MetricAnomaly;
import org.jeasy.random.EasyRandom;
import org.jeasy.random.EasyRandomParameters;

public class LogFixtureFactory {
    public static MetricAnomaly createLogAnomaly(Long seed){
        EasyRandomParameters erp = new EasyRandomParameters().seed(seed);
        return new EasyRandom(erp).nextObject(MetricAnomaly.class);
    }

}
