package dev.shop.shop.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/v1")
public class ApiExceptionController {
    @GetMapping(value = "members")
    public MemberDto getMember(@PathVariable String id) throws IllegalArgumentException{
        if(id.equals("ex")) return new IllegalArgumentException();
        return new MemberDto(id,"spring " + id);
    }

    @Data
    @AllArgsConstructor
    private static class MemberDto{
        private String id;
        private String name;
    }
}
