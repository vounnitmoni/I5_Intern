package com.como.KHForum.payload.request.generalRequest;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateQuestionRequest {
    private String question;
    private String community;
}
