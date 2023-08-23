package dev.project.hanium.config;

import dev.project.hanium.global.UrlStringList;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class GlobalConfig {
//    @Bean
//    public UrlStringList urlStringList() {
//        return new UrlStringList();
//    }

    @Bean
    public List<String> urlStringList() {
        List<String> list = new ArrayList<>();
        list.add("http://3.36.169.149:9200/_ml/anomaly_detectors/source_ip_request_rate_ecs/results/records");
        list.add("http://3.36.169.149:9200/_ml/anomaly_detectors/source_ip_url_count_ecs/results/records");
        list.add("http://3.36.169.149:9200/_ml/anomaly_detectors/status_code_rate_ecs/results/records");
        list.add("http://3.36.169.149:9200/_ml/anomaly_detectors/visitor_rate_ecs/results/records");
        list.add("http://3.36.169.149:9200/_ml/anomaly_detectors/low_request_rate_ecs/results/records");
        return list;
    }
}
