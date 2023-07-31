package dev.project.hanium.api;

import dev.project.hanium.response.CommonResponse;
import dev.project.hanium.response.LogAnomalyResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MlApiTest {

    @Autowired
    MlApi mlApi;

    @Test
    public void allLogAnomaliesDataRequestTest() {
        CommonResponse<LogAnomalyResponse> result = mlApi.logAnomaliesRequest();
        LogAnomalyResponse info = result.getInfo();
        info.getLogResponseData().stream().forEach((log) -> System.out.println());
    }
}