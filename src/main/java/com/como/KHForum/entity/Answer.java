package com.como.KHForum.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)   
    private Long id;
    private String answer;
    private Integer vote;
    private LocalTime create_time;
    private LocalDate create_date;

    @ManyToOne(targetEntity = Questionnaire.class, fetch = FetchType.EAGER) 
    @JoinColumn(name = "question_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Questionnaire questionId;
    @Column(name = "question_id") private Long question_id;

    @ManyToOne
    @JoinColumn(name = "author_id", referencedColumnName = "id")
    @JsonBackReference
    private AppUser author_id;

    public Answer(String answer, Integer vote, LocalTime create_time, LocalDate create_date) {
        this.answer = answer;
        this.vote = vote;
        this.create_time = create_time;
        this.create_date = create_date;
    }    
}
