package dev.project.hanium.api;

import dev.project.hanium.ELK_Query.*;
import dev.project.hanium.Entity.MetricEntity;
import dev.project.hanium.Entity.RequestDate;
import dev.project.hanium.response.CommonResponse;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.FetchSourceFilterBuilder;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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


    @PostMapping("/getmetrics")
    public CommonResponse<Object> getMetrics(@RequestBody RequestDate request){
        String date=request.getDate();
        String startDate=date+"T00:00:00";
        String endDate=date+"T23:59:59";

        Query query = new Query();
        QueryBool bool = new QueryBool();
        QueryFilter filter = new QueryFilter();
        Range range = new Range();
        TimestampField timestampField = new TimestampField();
        timestampField.setGte(startDate);
        timestampField.setLte(endDate);
        range.setTimestamp(timestampField);
        filter.setRange(range);
        bool.setFilter(filter);
        query.setBool(bool);

        Aggregations aggs = new Aggregations();
        Avg_Cpu avg_cpu= new Avg_Cpu();
        Avg_ avg1 = new Avg_();
        avg1.setField("system.cpu.total.pct");
        avg_cpu.setAvg(avg1);

        Avg_Mem avg_mem = new Avg_Mem();
        Avg_ avg2 = new Avg_();
        avg2.setField("system.memory.actual.used.pct");
        avg_mem.setAvg(avg2);

        Avg_NetIn avg_net_in = new Avg_NetIn();
        Avg_ avg3 = new Avg_();
        avg3.setField("system.network.in.bytes");
        avg_net_in.setAvg(avg3);

        Avg_NetOut avg_net_out = new Avg_NetOut();
        Avg_ avg4 = new Avg_();
        avg4.setField("system.network.out.bytes");
        avg_net_out.setAvg(avg3);

        Max_Cpu max_cpu = new Max_Cpu();
        Max_ max1 = new Max_();
        max1.setField("system.cpu.total.pct");
        max_cpu.setMax(max1);

        Max_Mem max_mem = new Max_Mem();
        Max_ max2 = new Max_();
        max2.setField("system.memory.actual.used.pct");
        max_mem.setMax(max2);

        Max_NetIn max_net_in = new Max_NetIn();
        Max_ max3 = new Max_();
        max3.setField("system.network.in.bytes");
        max_net_in.setMax(max3);

        Max_NetOut max_net_out = new Max_NetOut();
        Max_ max4 = new Max_();
        max4.setField("system.network.out.bytes");
        max_net_out.setMax(max4);

        aggs.setAvg_cpu(avg_cpu);
        aggs.setAvg_mem(avg_mem);
        aggs.setAvg_net_in(avg_net_in);
        aggs.setAvg_net_out(avg_net_out);
        aggs.setMax_cpu(max_cpu);
        aggs.setMax_mem(max_mem);
        aggs.setMax_net_in(max_net_in);
        aggs.setMax_net_out(max_net_out);

        MetricsQuery metricsQuery = new MetricsQuery();
        metricsQuery.setSize(0);
        metricsQuery.setQuery(query);
        metricsQuery.setAggs(aggs);

        RestTemplate restTemplate=new RestTemplate() ;

        String url = "http://3.36.169.149:9200/metricbeat-*/_search";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        MetricsQuery requestBody=metricsQuery;

        HttpEntity<MetricsQuery> entity = new HttpEntity<>(requestBody, headers);

        // Elasticsearch 집계 결과를 가져오는 HTTP POST 요청 보내기
        ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);

        Map<String,Object> responseBody = response.getBody();

        // 필요한 필드 추출
        Map<String, Object> aggregations = (Map<String, Object>) responseBody.get("aggregations");
        Map<String, Object> avgCpu = (Map<String, Object>) aggregations.get("avg_cpu");
        Map<String, Object> avgMem = (Map<String, Object>) aggregations.get("avg_mem");
        Map<String, Object> avgNetIn = (Map<String, Object>) aggregations.get("avg_net_in");
        Map<String, Object> avgNetOut = (Map<String, Object>) aggregations.get("avg_net_out");
        Map<String, Object> maxCpu = (Map<String, Object>) aggregations.get("max_cpu");
        Map<String, Object> maxMem = (Map<String, Object>) aggregations.get("max_mem");
        Map<String, Object> maxNetIn = (Map<String, Object>) aggregations.get("max_net_in");
        Map<String, Object> maxNetOut = (Map<String, Object>) aggregations.get("max_net_out");


        Double avgCpuValue=(Double)avgCpu.get("value");
        Double avgMemValue=(Double)avgMem.get("value");
        Double avgNetInValue = (Double) avgNetIn.get("value");
        Double avgNetOutValue = (Double)avgNetOut.get("value");

        Double maxCpuValue=(Double)maxCpu.get("value");
        Double maxMemValue=(Double)maxMem.get("value");
        Double maxNetInValue=(Double) maxNetIn.get("value");
        Double maxNetOutValue=(Double)maxNetOut.get("value");
        // 결과로 필요한 데이터 반환

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("avg_net_in",  String.format("%.2f", avgNetInValue/1000000));
        resultMap.put("max_net_in", String.format("%.2f", maxNetInValue/1000000));
        resultMap.put("avg_net_out", String.format("%.2f", avgNetOutValue/1000000));
        resultMap.put("max_net_out", String.format("%.2f", maxNetOutValue/1000000));
        resultMap.put("avg_cpu", String.format("%.2f", avgCpuValue*100));
        resultMap.put("max_cpu", String.format("%.2f", maxCpuValue*100));
        resultMap.put("avg_mem", String.format("%.2f", avgMemValue*100));
        resultMap.put("max_mem", String.format("%.2f", maxMemValue*100));


        return CommonResponse.success(resultMap);
    }

    @PostMapping("/getmetricsAnomaly")
    public CommonResponse<Object> getMetricsAnomaly(@RequestBody RequestDate request){
        String date=request.getDate();
        String startDate=date;
        String endDate=date;

        Query query = new Query();
        QueryBool bool = new QueryBool();
        QueryFilter filter = new QueryFilter();
        Range range = new Range();
        TimestampField timestampField = new TimestampField();
        timestampField.setGte(startDate);
        timestampField.setLte(endDate);
        range.setTimestamp(timestampField);
        filter.setRange(range);
        bool.setFilter(filter);
        query.setBool(bool);

        Aggregations aggs = new Aggregations();
        Avg_Cpu avg_cpu= new Avg_Cpu();
        Avg_ avg1 = new Avg_();
        avg1.setField("system.cpu.total.pct");
        avg_cpu.setAvg(avg1);

        Avg_Mem avg_mem = new Avg_Mem();
        Avg_ avg2 = new Avg_();
        avg2.setField("system.memory.actual.used.pct");
        avg_mem.setAvg(avg2);

        Avg_NetIn avg_net_in = new Avg_NetIn();
        Avg_ avg3 = new Avg_();
        avg3.setField("system.network.in.bytes");
        avg_net_in.setAvg(avg3);

        Avg_NetOut avg_net_out = new Avg_NetOut();
        Avg_ avg4 = new Avg_();
        avg4.setField("system.network.out.bytes");
        avg_net_out.setAvg(avg3);

        Max_Cpu max_cpu = new Max_Cpu();
        Max_ max1 = new Max_();
        max1.setField("system.cpu.total.pct");
        max_cpu.setMax(max1);

        Max_Mem max_mem = new Max_Mem();
        Max_ max2 = new Max_();
        max2.setField("system.memory.actual.used.pct");
        max_mem.setMax(max2);

        Max_NetIn max_net_in = new Max_NetIn();
        Max_ max3 = new Max_();
        max3.setField("system.network.in.bytes");
        max_net_in.setMax(max3);

        Max_NetOut max_net_out = new Max_NetOut();
        Max_ max4 = new Max_();
        max4.setField("system.network.out.bytes");
        max_net_out.setMax(max4);

        aggs.setAvg_cpu(avg_cpu);
        aggs.setAvg_mem(avg_mem);
        aggs.setAvg_net_in(avg_net_in);
        aggs.setAvg_net_out(avg_net_out);
        aggs.setMax_cpu(max_cpu);
        aggs.setMax_mem(max_mem);
        aggs.setMax_net_in(max_net_in);
        aggs.setMax_net_out(max_net_out);

        MetricsQuery metricsQuery = new MetricsQuery();
        metricsQuery.setSize(0);
        metricsQuery.setQuery(query);
        metricsQuery.setAggs(aggs);

        RestTemplate restTemplate=new RestTemplate() ;

        String url = "http://3.36.169.149:9200/metricbeat-*/_search";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        MetricsQuery requestBody=metricsQuery;

        HttpEntity<MetricsQuery> entity = new HttpEntity<>(requestBody, headers);

        // Elasticsearch 집계 결과를 가져오는 HTTP POST 요청 보내기
        ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);

        Map<String,Object> responseBody = response.getBody();

        // 필요한 필드 추출
        Map<String, Object> aggregations = (Map<String, Object>) responseBody.get("aggregations");
        Map<String, Object> avgCpu = (Map<String, Object>) aggregations.get("avg_cpu");
        Map<String, Object> avgMem = (Map<String, Object>) aggregations.get("avg_mem");
        Map<String, Object> avgNetIn = (Map<String, Object>) aggregations.get("avg_net_in");
        Map<String, Object> avgNetOut = (Map<String, Object>) aggregations.get("avg_net_out");
        Map<String, Object> maxCpu = (Map<String, Object>) aggregations.get("max_cpu");
        Map<String, Object> maxMem = (Map<String, Object>) aggregations.get("max_mem");
        Map<String, Object> maxNetIn = (Map<String, Object>) aggregations.get("max_net_in");
        Map<String, Object> maxNetOut = (Map<String, Object>) aggregations.get("max_net_out");


        Double avgCpuValue=(Double)avgCpu.get("value");
        Double avgMemValue=(Double)avgMem.get("value");
        Double avgNetInValue = (Double) avgNetIn.get("value");
        Double avgNetOutValue = (Double)avgNetOut.get("value");

        Double maxCpuValue=(Double)maxCpu.get("value");
        Double maxMemValue=(Double)maxMem.get("value");
        Double maxNetInValue=(Double) maxNetIn.get("value");
        Double maxNetOutValue=(Double)maxNetOut.get("value");
        // 결과로 필요한 데이터 반환

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("avg_net_in",  String.format("%.2f", avgNetInValue/1000000));
        resultMap.put("max_net_in", String.format("%.2f", maxNetInValue/1000000));
        resultMap.put("avg_net_out", String.format("%.2f", avgNetOutValue/1000000));
        resultMap.put("max_net_out", String.format("%.2f", maxNetOutValue/1000000));
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

