package com.como.KHForum.payload.response.successResponse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SignUpSuccessResponse {
    private String message;
    private Boolean status;
    private String accessToken;
}
