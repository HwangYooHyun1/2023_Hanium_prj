package dev.project.hanium.api;

import dev.project.hanium.Entity.RequestDate;
import dev.project.hanium.dto.MetricResultAnomalyDto;
import dev.project.hanium.dto.MetricsResultDateDto;
import dev.project.hanium.response.CommonResponse;
import dev.project.hanium.service.MetricsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@RestController
@RequiredArgsConstructor
public class MetricApi {

    @Autowired
    private ElasticsearchRestTemplate elasticsearchRestTemplate;
    @Autowired
    private MetricsService metricsService;


    @GetMapping("/getMetricsForDate")
    public CommonResponse<MetricResultAnomalyDto> getMetricsForDate() {
        return metricsService.getMetricsForDate(LocalDateTime.now().minus(1, ChronoUnit.DAYS));
    }

    @PostMapping("/getmetrics")
    public CommonResponse<Object> getMetrics(@RequestBody RequestDate request) {
        CommonResponse<MetricsResultDateDto> response = metricsService.getMetrics(request);
        return CommonResponse.success(response);
    }

    @PostMapping("/getmetricsAnomaly")
    public CommonResponse<Object> getMetricsAnomaly(@RequestBody RequestDate request) {
        CommonResponse<MetricResultAnomalyDto> response = metricsService.getMetricsAnomaly(request);
        return CommonResponse.success(response);

    }

}

