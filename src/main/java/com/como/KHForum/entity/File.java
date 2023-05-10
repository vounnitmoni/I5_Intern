package com.como.KHForum.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "file")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class File {
    @Id
    @GeneratedValue(
        strategy = GenerationType.IDENTITY
    )
    private Long id;

    @ManyToOne(targetEntity = Questionnaire.class)
    @JoinColumn(name = "questionnaire_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private Questionnaire questionnaire;

    @Column(name = "questionnaire_id") private Long questionnaire_id;

    @Lob
    @Column(name = "photo", columnDefinition="LONGBLOB")
    private byte[] photo;

    public File(Long questionnaire_id, byte[] photo) {
        this.questionnaire_id = questionnaire_id;
        this.photo = photo;
    }

    
}
