package com.como.KHForum.payload.response.generalResponse;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RandomQuestionResponse {
    private Long id;
    private String question;
    private String body;
    private LocalDate post_duration;
    private String community;
    private Integer answer;
    private Integer vote;
    @Lob
    private List<byte[]> photo; 
}
