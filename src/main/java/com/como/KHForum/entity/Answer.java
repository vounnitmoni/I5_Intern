package com.como.KHForum.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "answers")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Answer {   
    private Long id;
    private String answer;
    private Integer vote;
    private LocalTime create_time;
    private LocalDate create_date;
    public Answer(String answer, Integer vote, LocalTime create_time, LocalDate create_date) {
        this.answer = answer;
        this.vote = vote;
        this.create_time = create_time;
        this.create_date = create_date;
    }    
}
