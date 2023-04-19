package com.como.KHForum.entity;

import org.aspectj.weaver.patterns.TypePatternQuestions.Question;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "question_collection_info")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuestionCollectionInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private User userId;

    @ManyToOne(targetEntity = Questionnaire.class)
    @JoinColumn(name = "question_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private Questionnaire questionId;

    @Column(name = "user_id") private Long user_id;
    @Column(name = "question_id") private Long question_id;

    private Boolean voted;
    private Boolean reported;
    public QuestionCollectionInfo(Long user_id, Long question_id, Boolean voted, Boolean reported) {
        this.user_id = user_id;
        this.question_id = question_id;
        this.voted = voted;
        this.reported = reported;
    }
}
