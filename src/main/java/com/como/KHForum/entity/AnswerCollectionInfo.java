package com.como.KHForum.entity;

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
@Table(name = "answer_collection_info")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AnswerCollectionInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private User useId;

    @ManyToOne(targetEntity = Answer.class)
    @JoinColumn(name = "answer_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private Answer answerId;

    @Column(name = "user_id") private Long user_id;
    @Column(name = "answer_id") private Long answer_id;
    private Boolean voted;
    private Boolean reported;

    public AnswerCollectionInfo(Long user_id, Long answer_id, Boolean voted, Boolean reported) {
        this.user_id = user_id;
        this.answer_id = answer_id;
        this.voted = voted;
        this.reported = reported;
    }  
}
