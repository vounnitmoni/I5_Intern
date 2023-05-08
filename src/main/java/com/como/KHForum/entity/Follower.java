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
@Table(name = "following")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Follower {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "follower_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private User followerId;
    
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "followee_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private User followeeId;

    @Column(name = "follower_id") private Long follower_id;
    @Column(name = "followee_id") private Long followee_id;
    
    public Follower(Long follower_id, Long followee_id) {
        this.follower_id = follower_id;
        this.followee_id = followee_id;
    }

    


}
