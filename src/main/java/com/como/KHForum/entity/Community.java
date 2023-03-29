package com.como.KHForum.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "communities")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Community {
    private Long id;
    private Long name;
    private LocalDateTime create_stamp;
    public Community(Long name, LocalDateTime create_stamp) {
        this.name = name;
        this.create_stamp = create_stamp;
    }
    
}
