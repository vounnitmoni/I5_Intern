package com.como.KHForum.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
@Table(name = "communities")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Community {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private LocalDateTime create_stamp;
    private Integer report;
    private Boolean pending;
    @ManyToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "creator_id", referencedColumnName = "id", insertable = false, updatable = false)
    private User creatorId;
    @Column(name = "creator_id")
    private Long creator_id;

    public Community(String name, LocalDateTime create_stamp, Integer report, Long creator_id, Boolean pending) {
        this.name = name;
        this.create_stamp = create_stamp;
        this.report = report;
        this.creator_id = creator_id;
        this.pending = pending;
    }

    
    
}
