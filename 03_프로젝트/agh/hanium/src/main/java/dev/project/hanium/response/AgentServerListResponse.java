package dev.project.hanium.response;


import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter @Setter
public class AgentServerListResponse {
    Map<String,String> map;

    public AgentServerListResponse(Map<String,String> map) {
        this.map = map;
    }
}
