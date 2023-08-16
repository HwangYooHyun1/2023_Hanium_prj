package dev.project.hanium.global;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class UrlStringList {
    List<String> urlList;

    public UrlStringList() {
        List<String> list = new ArrayList<>();
        list.add("http://3.36.169.149:9200/_ml/anomaly_detectors/source_ip_request_rate_ecs/results/records");
        list.add("http://3.36.169.149:9200/_ml/anomaly_detectors/source_ip_url_count_ecs/results/records");
        list.add("http://3.36.169.149:9200/_ml/anomaly_detectors/status_code_rate_ecs/results/records");
        list.add("http://3.36.169.149:9200/_ml/anomaly_detectors/visitor_rate_ecs/results/records");
        list.add("http://3.36.169.149:9200/_ml/anomaly_detectors/low_request_rate_ecs/results/records");
    }
}
