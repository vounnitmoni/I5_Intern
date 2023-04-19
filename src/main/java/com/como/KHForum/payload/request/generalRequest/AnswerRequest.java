package com.como.KHForum.payload.request.generalRequest;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnswerRequest {
    private String answer;
    private Long question_id;
}
