package dev.project.hanium.service;

import dev.project.hanium.dto.LogAnomaly;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class MlRequestService {
    private final RestTemplate restTemplate;
    public LogAnomaly getMlMetricData(String url) {
        String requestBody = "{\"record_score\": 90 , \"desc\" : true}";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(requestBody,headers);
        return restTemplate.getForObject(url, LogAnomaly.class);
    }
}
