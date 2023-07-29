package dev.project.hanium.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserLoginRequest {
    private String username;
    private String passwd;
}
