package dev.project.hanium.ELK_Query;

public class MetricQuery {
    public static String query(String fromDate, String toDate) {
        return "{\n" +
                "  \"size\": 0,\n" +
                "  \"query\": {\n" +
                "    \"bool\": {\n" +
                "      \"filter\": {\n" +
                "        \"range\": {\n" +
                "          \"@timestamp\": {\n" +
                "            \"gte\": \"" + fromDate + "\",\n" +
                "            \"lte\": \"" + toDate + "\"\n" +
                "          }\n" +
                "        }\n" +
                "      }\n" +
                "    }\n" +
                "  },\n" +
                "  \"aggs\": {\n" +
                "    \"avg_cpu\": {\n" +
                "      \"avg\": {\n" +
                "        \"field\": \"system.cpu.total.pct\"\n" +
                "      }\n" +
                "    },\n" +
                "    \"avg_mem\":{\n" +
                "      \"avg\": {\n" +
                "        \"field\": \"system.memory.actual.used.pct\"\n" +
                "      }\n" +
                "    },\n" +
                "    \"avg_net_in\":{\n" +
                "      \"avg\": {\n" +
                "        \"field\": \"system.network.in.bytes\"\n" +
                "      }\n" +
                "    },\n" +
                "    \"avg_net_out\":{\n" +
                "      \"avg\": {\n" +
                "        \"field\": \"system.network.out.bytes\"\n" +
                "      }\n" +
                "    },\n" +
                "    \"max_cpu\":{\n" +
                "      \"max\": {\n" +
                "        \"field\": \"system.cpu.total.pct\"   // CPU 사용량 필드명\n" +
                "      }\n" +
                "    },\n" +
                "    \"max_mem\":{\n" +
                "      \"max\": {\n" +
                "        \"field\": \"system.memory.actual.used.pct\" \n" +
                "      }\n" +
                "    },   \n" +
                "    \"max_net_in\":{\n" +
                "      \"max\": {\n" +
                "        \"field\": \"system.network.in.bytes\" \n" +
                "      }\n" +
                "    },\n" +
                "    \"max_net_out\":{\n" +
                "      \"max\": {\n" +
                "        \"field\": \"system.network.out.bytes\" \n" +
                "      }\n" +
                "    }\n" +
                "  }\n" +
                "}";
    }
}
