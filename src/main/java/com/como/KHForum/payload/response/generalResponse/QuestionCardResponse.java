package com.como.KHForum.payload.response.generalResponse;

import java.time.LocalDate;

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
    private LocalDate post_duration;
    private String community;
    private String username;
    private Integer answer;
    private Integer vote;
    
    public QuestionCardResponse(String question, String body, LocalDate post_duration, String username, Integer answer,
            Integer vote) {
        this.question = question;
        this.body = body;
        this.post_duration = post_duration;
        this.username = username;
        this.answer = answer;
        this.vote = vote;
    }

    
}
