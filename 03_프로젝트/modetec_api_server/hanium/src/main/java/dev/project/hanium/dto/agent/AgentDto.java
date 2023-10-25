package dev.project.hanium.dto.agent;

import dev.project.hanium.domain.Agent;
import dev.project.hanium.domain.Project;
import dev.project.hanium.request.Agent.CreateAgentRequest;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class AgentDto {
    private String ip;
    private String projectName;
    private String agentName;
    private String description;

    @Builder
    public AgentDto(String ip, String projectName, String agentName, String description) {
        this.ip = ip;
        this.projectName = projectName;
        this.agentName = agentName;
        this.description = description;
    }

    public static AgentDto fromCreateAgent(CreateAgentRequest request){
        return AgentDto.builder()
                .ip(request.getIp())
                .projectName(request.getProjectName())
                .agentName(request.getAgentName())
                .description(request.getDescription())
                .build();
    }

    public Agent toEntity(Project project) {
        return Agent.builder()
                .ip(ip)
                .project(project)
                .agentName(agentName)
                .description(description)
                .build();
    }
}
