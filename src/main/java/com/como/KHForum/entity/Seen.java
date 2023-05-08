package com.como.KHForum.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "seens")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Seen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private User userId;

    @JsonIgnore
    @ManyToOne(targetEntity = Questionnaire.class)
    @JoinColumn(name = "questionnaire_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Questionnaire questionnaireId;
    
    @Column(name = "user_id") private Long user_id;
    @Column(name = "questionnaire_id") private Long questionnaire_id;
    private Boolean seen;

    public Seen(Long user_id, Long questionnaire_id, Boolean seen) {
        this.user_id = user_id;
        this.questionnaire_id = questionnaire_id;
        this.seen = seen;
    }    
}
