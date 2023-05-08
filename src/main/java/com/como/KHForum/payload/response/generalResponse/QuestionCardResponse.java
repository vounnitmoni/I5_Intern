package com.como.KHForum.payload.response.generalResponse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuestionCardResponse {
    private String question;
    private String body;
    private String post_duration;
    private String community;
    private Integer answer;
    private Integer vote;
}
