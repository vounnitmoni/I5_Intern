package com.como.KHForum.payload.response.generalResponse;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuestionCardResponse {
    private Long id;
    private String question;
    private String body;
    private LocalDate post_duration;
    private String username;
    private Integer answer;
    private Integer vote;
    @Lob 
    private List<byte[]> photo;  
}
