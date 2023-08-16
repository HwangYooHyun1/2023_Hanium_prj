package dev.project.hanium.request.Agent;

import lombok.Getter;
import lombok.Setter;



@Getter @Setter
public class CreateAgentRequest {
    private String ip;
    private String projectName;
    private String agentName;
    private String description;
}
