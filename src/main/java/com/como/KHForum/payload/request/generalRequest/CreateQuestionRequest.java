package com.como.KHForum.payload.request.generalRequest;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateQuestionRequest {
    @NotBlank private String question;
    @NotBlank private String body;
    @NotBlank private String community;
}
