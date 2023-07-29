package dev.project.hanium.api;

import dev.project.hanium.dto.user.UserDto;
import dev.project.hanium.request.MemberJoinRequest;
import dev.project.hanium.request.UserLoginRequest;
import dev.project.hanium.response.CommonResponse;
import dev.project.hanium.response.UserLoginResponse;
import dev.project.hanium.response.UserJoinResponse;
import dev.project.hanium.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserApiController {
    private final UserService userService;
    @PostMapping("/join")
    public CommonResponse<UserJoinResponse> join(@RequestBody MemberJoinRequest request) {
        UserDto user = userService.join(request.getUsername(), request.getPasswd());
    }

    @PostMapping("/login")
    public CommonResponse<UserLoginResponse> login(@RequestBody UserLoginRequest request) {
        String token = userService.login(request.getUsername(), request.getPasswd());
        return CommonResponse.success(new UserLoginResponse(token));
    }
}
