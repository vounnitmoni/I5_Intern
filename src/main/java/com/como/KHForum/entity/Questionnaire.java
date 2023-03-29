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
@Table(name = "questionnaire")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Questionnaire {
    private Long id;
    private String question;
    private LocalTime time;
    private LocalDate update_date; 
    private LocalDate date;
    public Questionnaire(String question, LocalTime time, LocalDate update_date, LocalDate date) {
        this.question = question;
        this.time = time;
        this.update_date = update_date;
        this.date = date;
    }   
}
