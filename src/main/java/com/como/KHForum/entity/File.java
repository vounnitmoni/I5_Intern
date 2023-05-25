package com.como.KHForum.entity;

import java.util.List;

import com.como.KHForum.entity.enums.EFileStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private User user;

    @ManyToOne(targetEntity = Community.class)
    @JoinColumn(name = "community_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private Community community;

    @Column(name = "user_id") private Long user_id;
    @Column(name = "community_id") private Long community_id;
    @Column(name = "questionnaire_id") private Long questionnaire_id;

    @Enumerated(EnumType.STRING)
    private EFileStatus fileStatus;

    @Lob
    @Column(name = "photo", columnDefinition="LONGBLOB")
    private byte[] photo;

    public File(Long user_id, Long community_id, Long questionnaire_id, EFileStatus fileStatus, byte[] photo) {
        this.user_id = user_id;
        this.community_id = community_id;
        this.questionnaire_id = questionnaire_id;
        this.fileStatus = fileStatus;
        this.photo = photo;
    }   
}
