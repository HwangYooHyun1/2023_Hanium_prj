package dev.project.hanium.domain;


import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
public class Project extends AuditingFields {
    @Id
    @Column(name = "project_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "project_name")
    private String projectName;

    @Column(name = "project_description")
    private String projectDescription;

    @Builder
    public Project(Long id, String projectName, String projectDescription) {
        this.id = id;
        this.projectName = projectName;
        this.projectDescription = projectDescription;
    }
}
