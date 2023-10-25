package dev.project.hanium.service;

import dev.project.hanium.domain.Project;
import dev.project.hanium.dto.agent.AgentDto;
import dev.project.hanium.exception.ErrorCode;
import dev.project.hanium.exception.HaniumException;
import dev.project.hanium.repository.AgentRepository;
import dev.project.hanium.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AgentService {
    private final AgentRepository agentRepository;
    private final ProjectRepository projectRepository;
    public void create(AgentDto dto) {
        Project project = projectRepository.findByProjectName(dto.getProjectName())
                .orElseThrow(() -> new HaniumException(ErrorCode.PROJECT_NOT_FOUND, String.format("%s is not founded", dto.getProjectName())));

        agentRepository.findByAgentNameAndProject(dto.getAgentName(), project).ifPresent(agent -> {
            throw new HaniumException(ErrorCode.DUPLICATED_AGENT_NAME, String.format("%s is duplicated name", agent.getAgentName()));
        });

        agentRepository.save(dto.toEntity(project));
    }
}
