package dev.project.hanium.api;

import dev.project.hanium.Entity.MetricEntity;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.query.FetchSourceFilterBuilder;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;
import java.util.stream.Collectors;

@RestController

public class MetricApi {

    @Autowired
    private ElasticsearchRestTemplate elasticsearchRestTemplate;

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
                        .withSourceFilter(new FetchSourceFilterBuilder().withIncludes("@timestamp", "system.network.in.bytes","system.network.out.bytes" ,"host.hostname").build())
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
