package dev.project.hanium.api;

import dev.project.hanium.repository.MetricAnomalyRepository;
import dev.project.hanium.response.CommonResponse;
import dev.project.hanium.response.LogAnomalyResponse;
import dev.project.hanium.response.LogResponseData;
import dev.project.hanium.service.MlRequestService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.client.RestTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MlApiTest {

    @Autowired
    MlApi mlApi;

    @Autowired
    MlRequestService mlRequestService;
    @Autowired
    RestTemplate restTemplate;
    @Autowired
    MetricAnomalyRepository metricAnomalyRepository;

    @Test
    public void allLogAnomaliesDataRequestTest() {
        CommonResponse<LogAnomalyResponse> result = mlApi.logAnomaliesRequest();
        LogAnomalyResponse info = result.getInfo();
        info.getLogResponseData().stream().forEach((log) -> System.out.println());
    }

    @Test
    public void anomaliesDetectorNameMappingTest() {
        CommonResponse<LogAnomalyResponse> logAnomalyResponseCommonResponse = mlApi.logAnomaliesRequest();
        List<LogResponseData> result = logAnomalyResponseCommonResponse.getInfo().getLogResponseData();
        result.stream().forEach(System.out::println);
    }
}