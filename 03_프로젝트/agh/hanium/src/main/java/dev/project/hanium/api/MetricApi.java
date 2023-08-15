package dev.project.hanium.api;

import dev.project.hanium.ELK_Query.MetricQuery;
import dev.project.hanium.Entity.MetricEntity;
import dev.project.hanium.response.CommonResponse;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.FetchSourceFilterBuilder;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController

public class MetricApi {

    @Autowired
    private ElasticsearchRestTemplate elasticsearchRestTemplate;


    @GetMapping("/getmetrics")
    public CommonResponse<Object> getMetrics() throws JSONException {
        String startDate="2023-08-11T00:00:00";
        String endDate="2023-08-11T23:59:59";
        RestTemplate restTemplate=new RestTemplate() ;

        String url = "http://3.36.169.149:9200/metricbeat-*/_search";

        // Elasticsearch 집계 쿼리 본문
        String requestBody = MetricQuery.query(startDate,endDate);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        // Elasticsearch 집계 결과를 가져오는 HTTP POST 요청 보내기
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        String responseBody = response.getBody();

        // responseBody를 파싱하여 집계 결과를 추출
        JSONObject jsonObject = new JSONObject(responseBody);
        JSONObject aggregations = jsonObject.getJSONObject("aggregations");

        // 필요한 값을 추출하여 사용
        Double avgNetInValue = aggregations.getJSONObject("avg_net_in").getDouble("value");
        Double avgNetOutValue = aggregations.getJSONObject("avg_net_out").getDouble("value");
        Double avgCpuValue = aggregations.getJSONObject("avg_cpu").getDouble("value");
        Double avgMemValue = aggregations.getJSONObject("avg_mem").getDouble("value");
        Long maxNetInValue = aggregations.getJSONObject("max_net_in").getLong("value");
        Long maxNetOutValue = aggregations.getJSONObject("max_net_out").getLong("value");
        Double maxCpuValue = aggregations.getJSONObject("max_cpu").getDouble("value");
        Double maxMemValue = aggregations.getJSONObject("max_mem").getDouble("value");

        // 원하는 방식으로 집계 결과를 API 응답으로 반환
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("avg_net_in",  String.format("%.2f", avgNetInValue/1000000));
        resultMap.put("max_net_in", maxNetInValue/1000000);
        resultMap.put("avg_net_out", String.format("%.2f", avgNetOutValue/1000000));
        resultMap.put("max_net_out", maxNetOutValue/1000000);
        resultMap.put("avg_cpu", String.format("%.2f", avgCpuValue*100));
        resultMap.put("max_cpu", String.format("%.2f", maxCpuValue*100));
        resultMap.put("avg_mem", String.format("%.2f", avgMemValue*100));
        resultMap.put("max_mem", String.format("%.2f", maxMemValue*100));

        return CommonResponse.success(resultMap);
    }

    @GetMapping("/getMetricCPUdata")
    public ResponseEntity<Object> getMetricCPUData() {
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(QueryBuilders.boolQuery()
                .filter(QueryBuilders.rangeQuery("@timestamp")
                        .gte("2023-08-01T18:30:35")
                        .lte("2023-08-01T18:30:44"))
                .filter(QueryBuilders.termQuery("event.module", "system"))
                .filter(QueryBuilders.termQuery("event.dataset", "system.cpu")));

        SearchHits<MetricEntity> searchHits = elasticsearchRestTemplate.search(
                new NativeSearchQueryBuilder()
                        .withSourceFilter(new FetchSourceFilterBuilder().withIncludes("@timestamp", "system.cpu.total.pct", "system.memory.actual.used.pct", "host.hostname").build())
                        .withQuery(searchSourceBuilder.query())
                        .build(),
                MetricEntity.class
        );

        List<MetricEntity> metricbeatDataList = searchHits.stream()
                .map(SearchHit::getContent)
                .collect(Collectors.toList());
        return ResponseEntity.ok(metricbeatDataList);
    }

    @GetMapping("/getMetricMEMdata")
    public ResponseEntity<Object> getMetricMEMData() {
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(QueryBuilders.boolQuery()
                .filter(QueryBuilders.rangeQuery("@timestamp")
                        .gte("2023-08-01T18:30:35")
                        .lte("2023-08-01T18:30:44"))
                .filter(QueryBuilders.termQuery("event.module", "system"))
                .filter(QueryBuilders.termQuery("event.dataset", "system.memory")));

        SearchHits<MetricEntity> searchHits = elasticsearchRestTemplate.search(
                new NativeSearchQueryBuilder()
                        .withSourceFilter(new FetchSourceFilterBuilder().withIncludes("@timestamp", "system.memory.actual.used.pct", "host.hostname").build())
                        .withQuery(searchSourceBuilder.query())
                        .build(),
                MetricEntity.class
        );

        List<MetricEntity> metricbeatDataList = searchHits.stream()
                .map(SearchHit::getContent)
                .collect(Collectors.toList());
        return ResponseEntity.ok(metricbeatDataList);
    }

    @GetMapping("/getMetricNETdata")
    public ResponseEntity<Object> getMetricNETData() {
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(QueryBuilders.boolQuery()
                .filter(QueryBuilders.rangeQuery("@timestamp")
                        .gte("2023-08-01T18:30:35")
                        .lte("2023-08-01T18:30:44"))
                .filter(QueryBuilders.termQuery("event.module", "system"))
                .filter(QueryBuilders.termQuery("event.dataset", "system.network")));

        SearchHits<MetricEntity> searchHits = elasticsearchRestTemplate.search(
                new NativeSearchQueryBuilder()
                        .withSourceFilter(new FetchSourceFilterBuilder().withIncludes("@timestamp", "system.network.in.bytes", "system.network.out.bytes", "host.hostname").build())
                        .withQuery(searchSourceBuilder.query())
                        .build(),
                MetricEntity.class
        );

        List<MetricEntity> metricbeatDataList = searchHits.stream()
                .map(SearchHit::getContent)
                .collect(Collectors.toList());
        return ResponseEntity.ok(metricbeatDataList);
    }

}

