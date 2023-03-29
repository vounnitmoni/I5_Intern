package com.como.KHForum.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
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
    private Long id; 
    private String comment;
    private LocalDateTime create_stamp;
    private Long parent_id;
    public Comment(String comment, LocalDateTime create_stamp, Long parent_id) {
        this.comment = comment;
        this.create_stamp = create_stamp;
        this.parent_id = parent_id;
    }
    
}
