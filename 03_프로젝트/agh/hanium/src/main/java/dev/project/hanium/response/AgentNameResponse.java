package dev.project.hanium.response;


import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class AgentNameResponse {
    List<String> agents;

    public AgentNameResponse(List<String> agents) {
        this.agents = agents;
    }
}
