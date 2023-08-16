package dev.project.hanium.api;

import dev.project.hanium.dto.agent.AgentDto;
import dev.project.hanium.request.Agent.CreateAgentRequest;
import dev.project.hanium.service.AgentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AgentApi {
    private final AgentService agentService;

    @PostMapping("/agents/new")
    public void createAgent(@RequestBody CreateAgentRequest request) {
        agentService.create(AgentDto.fromCreateAgent(request));
    }
}
