package dev.project.hanium.service;

import dev.project.hanium.Entity.RequestDate;
import dev.project.hanium.dto.MetricResultAnomalyDto;
import dev.project.hanium.response.CommonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;

@Service
public class MetricsService {
    @Autowired
    private final RestTemplate restTemplate ;
    private final String apiUrl ="http://localhost:8080";
    @Autowired
    public MetricsService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;

    }
    public CommonResponse<MetricResultAnomalyDto> getMetricsForDate(LocalDateTime time) {

        String date=time.toString().split("\\.")[0];
        System.out.println(date);

        // "date" 값을 요청 매개변수로 사용하여 getMetricsAnomaly 메서드 호출
        RequestDate requestDate = new RequestDate();
        requestDate.setStartDate(date);
        ResponseEntity<CommonResponse> responseEntity = restTemplate.postForEntity(
                apiUrl+"/getmetricsAnomaly", requestDate, CommonResponse.class);

        return responseEntity.getBody();

    }

}
