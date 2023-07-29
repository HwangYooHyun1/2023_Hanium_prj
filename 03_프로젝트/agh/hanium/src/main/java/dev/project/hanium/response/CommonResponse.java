package dev.project.hanium.response;

import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommonResponse<T> {
    private String returnCode;
    private T info;

    public static CommonResponse<Void> error(String errorCode) {return new CommonResponse<>(errorCode, null);}

    public static CommonResponse<Void> success(){return new CommonResponse<>("SUCCESS",null);}

    public static <T> CommonResponse<T> success(T info) {return new CommonResponse<>("SUCCESS",info);}

    public String toStream() {
        if (info == null) {
            return "{" + "\"returnCode\":" + "\"" + returnCode + "\"," +
                    "\"info\":" + null + "}";
        }

        return "{" + "\"returnCode\":" + "\"" + returnCode + "\"," +
                "\"info\":" + "\"" + info + "\"" + "}";
    }
}
