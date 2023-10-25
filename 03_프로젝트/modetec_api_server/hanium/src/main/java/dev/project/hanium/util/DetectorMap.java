package dev.project.hanium.util;

import java.util.HashMap;
import java.util.Map;

public class DetectorMap {
    public static Map<String, String> getDetectorMap() {
        Map<String, String> map = new HashMap<>();
        map.put("status_code_rate_ecs","Nginx access status code rate");
        map.put("source_ip_request_rate_ecs","Nginx access source IP high count");
        map.put("source_ip_url_count_ecs","Nginx access source IP high dc URL");
        map.put("visitor_rate_ecs","Nginx access visitor rate");
        map.put("low_request_rate_ecs","Nginx request rate");
        return map;
    }
}