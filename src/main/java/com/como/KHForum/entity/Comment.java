package com.como.KHForum.entity;

import java.time.LocalDateTime;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.annotation.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "comments")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 

    @Size(max = 500)
    private String comment;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime create_stamp;
    
    @Nullable
    private Long parent_id;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private User userId;
    @Column(name = "user_id") private Long user_id;
    
    @ManyToOne(targetEntity = Answer.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "answer_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private Answer answerId;
    @Column(name = "answer_id") private Long answer_id;

    public Comment(String comment, LocalDateTime create_stamp, Long parent_id, Long answer_id, Long user_id) {
        this.comment = comment;
        this.create_stamp = create_stamp;
        this.parent_id = parent_id;
        this.answer_id = answer_id;
        this.user_id = user_id;
    }
    
    
}
