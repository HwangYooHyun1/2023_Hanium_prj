package dev.project.hanium.domain;

import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
public class Server extends AuditingFields {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "server_ip")
    private String ip;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    @Column(name = "server_name")
    private String serverName;

    @Column(name = "description")
    private String description;
}
