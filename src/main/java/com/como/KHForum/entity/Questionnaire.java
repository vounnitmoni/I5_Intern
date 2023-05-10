package com.como.KHForum.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import io.micrometer.common.lang.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
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
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String question;
    private String body;
    @JsonFormat(pattern = "HH:mm:ss") private LocalTime time;
    @JsonFormat(pattern = "yyyy-MM-dd") private LocalDate create_stmp; 
    @JsonFormat(pattern = "yyyy-MM-dd") @Nullable private LocalDate update_stmp;
    
    @Lob
    @Column(name = "photo", columnDefinition="BLOB")
    private List<byte[]> photo;
    
    private Boolean is_approve;
    private Integer report;
    private Integer vote;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "author_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private User authorId;
    @Column(name = "author_id") private Long author_id;
    
    @ManyToOne(targetEntity = Community.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "community_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private Community communityId;
    @Column(name = "community_id") private Long community_id;

    public Questionnaire(String question ,String body, LocalTime time, LocalDate create_stmp, LocalDate update_stmp,
            Boolean is_approve, Integer report, Long author_id, Long community_id, Integer vote, List<byte[]> photo) {
        this.question = question;
        this.body = body;
        this.time = time;
        this.create_stmp = create_stmp;
        this.update_stmp = update_stmp;
        this.is_approve = is_approve;
        this.report = report;
        this.author_id = author_id;
        this.community_id = community_id;
        this.vote = vote;
        this.photo = photo;
    }

    
}
