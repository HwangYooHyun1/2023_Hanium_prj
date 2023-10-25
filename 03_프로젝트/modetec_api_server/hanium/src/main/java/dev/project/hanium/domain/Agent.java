package dev.project.hanium.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
public class Agent extends AuditingFields {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "agent_ip")
    private String ip;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @Column(name = "agent_name")
    private String agentName;

    @Column(name = "description")
    private String description;

    @Builder
    public Agent(Long id, String ip, Project project, String agentName, String description) {
        this.id = id;
        this.ip = ip;
        this.project = project;
        this.agentName = agentName;
        this.description = description;
    }
}

