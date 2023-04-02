package com.como.KHForum.payload.response.successResponse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SuccessMessageResponse {
    private String message;
    private Boolean success;
}
