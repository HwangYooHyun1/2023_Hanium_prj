package dev.project.hanium.service;

import dev.project.hanium.ELK_Query.*;
import dev.project.hanium.Entity.RequestDate;
import dev.project.hanium.dto.MetricResultAnomalyDto;
import dev.project.hanium.dto.MetricsResultDateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MetricsService {

    public MetricsResultDateDto getMetrics(String  request) {
        String startDate = request + "T00:00:00";
        String endDate = request + "T23:59:59";

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
        Avg_Cpu avg_cpu = new Avg_Cpu();
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
        avg_net_out.setAvg(avg4);

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

        RestTemplate restTemplate = new RestTemplate();

        String url = "http://3.36.169.149:9200/metricbeat-*/_search";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        MetricsQuery requestBody = metricsQuery;

        HttpEntity<MetricsQuery> entity = new HttpEntity<>(requestBody, headers);

        // Elasticsearch 집계 결과를 가져오는 HTTP POST 요청 보내기
        ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);

        Map<String, Object> responseBody = response.getBody();

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


        Double avgCpuValue = (Double) avgCpu.get("value");
        Double avgMemValue = (Double) avgMem.get("value");
        Double avgNetInValue = (Double) avgNetIn.get("value");
        Double avgNetOutValue = (Double) avgNetOut.get("value");

        Double maxCpuValue = (Double) maxCpu.get("value");
        Double maxMemValue = (Double) maxMem.get("value");
        Double maxNetInValue = (Double) maxNetIn.get("value");
        Double maxNetOutValue = (Double) maxNetOut.get("value");
        // 결과로 필요한 데이터 반환

        MetricsResultDateDto metricsResultDTO = new MetricsResultDateDto();
        metricsResultDTO.setAvgNetIn(String.format("%.2f", avgNetInValue / 1000000));
        metricsResultDTO.setMaxNetIn(String.format("%.2f", maxNetInValue / 1000000));
        metricsResultDTO.setAvgNetOut(String.format("%.2f", avgNetOutValue / 1000000));
        metricsResultDTO.setMaxNetOut(String.format("%.2f", maxNetOutValue / 1000000));
        metricsResultDTO.setAvgCpu(String.format("%.2f", avgCpuValue * 100));
        metricsResultDTO.setMaxCpu(String.format("%.2f", maxCpuValue * 100));
        metricsResultDTO.setAvgMem(String.format("%.2f", avgMemValue * 100));
        metricsResultDTO.setMaxMem(String.format("%.2f", maxMemValue * 100));

        return metricsResultDTO;
    }
    public MetricResultAnomalyDto getMetricsAnomaly(RequestDate request) {
        String date = request.getStartDate();

        String second_s = date.substring(date.length() - 2);
        int second_i = Integer.parseInt(second_s); // 문자열을 정수로 변환
        int result = second_i + 10; // 10을 더함

        String newSecond_s = String.valueOf(result); // 정수를 문자열로 변환
        if (newSecond_s.length() == 1) {
            newSecond_s = "0" + newSecond_s; // 결과가 한 자리 숫자라면 앞에 0을 붙임
        }

        String startDate = date;
        String endDate = date.substring(0, date.length() - 2) + newSecond_s;

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

        AggregationsMax aggs = new AggregationsMax();

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

        aggs.setMax_cpu(max_cpu);
        aggs.setMax_mem(max_mem);
        aggs.setMax_net_in(max_net_in);
        aggs.setMax_net_out(max_net_out);

        MetricQueryMax metricsQuery = new MetricQueryMax();
        metricsQuery.setSize(0);
        metricsQuery.setQuery(query);
        metricsQuery.setAggs(aggs);

        RestTemplate restTemplate = new RestTemplate();

        String url = "http://3.36.169.149:9200/metricbeat-*/_search";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        MetricQueryMax requestBody = metricsQuery;

        HttpEntity<MetricQueryMax> entity = new HttpEntity<>(requestBody, headers);

        // Elasticsearch 집계 결과를 가져오는 HTTP POST 요청 보내기
        ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);

        Map<String, Object> responseBody = response.getBody();

        // 필요한 필드 추출
        Map<String, Object> aggregations = (Map<String, Object>) responseBody.get("aggregations");

        Map<String, Object> maxCpu = (Map<String, Object>) aggregations.get("max_cpu");
        Map<String, Object> maxMem = (Map<String, Object>) aggregations.get("max_mem");
        Map<String, Object> maxNetIn = (Map<String, Object>) aggregations.get("max_net_in");
        Map<String, Object> maxNetOut = (Map<String, Object>) aggregations.get("max_net_out");

        Double maxCpuValue = (Double) maxCpu.get("value");
        Double maxMemValue = (Double) maxMem.get("value");
        Double maxNetInValue = (Double) maxNetIn.get("value");
        Double maxNetOutValue = (Double) maxNetOut.get("value");

        // 결과로 필요한 데이터 반환
        MetricResultAnomalyDto metricsResultDTO = new MetricResultAnomalyDto();
        metricsResultDTO.setNetIn(String.format("%.2f", maxNetInValue / 1000000));
        metricsResultDTO.setNetOut(String.format("%.2f", maxNetOutValue / 1000000));
        metricsResultDTO.setCpu(String.format("%.2f", maxCpuValue * 100));
        metricsResultDTO.setMem(String.format("%.2f", maxMemValue * 100));

        return metricsResultDTO;
    }

    public MetricResultAnomalyDto getMetricsForDate(LocalDateTime time) {

        String date=time.toString().split("\\.")[0];

        RequestDate requestDate = new RequestDate();
        requestDate.setStartDate(date);

        return getMetricsAnomaly(requestDate);
    }

}
