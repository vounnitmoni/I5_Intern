package com.como.KHForum.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Table(name = "user_communties")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserCommunity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = AppUser.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private AppUser user_id;

    @ManyToOne(targetEntity = Community.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "community_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private Community community_id;

    @Column(name = "user_id") private Long userId;
    @Column(name = "community_id") private Long communityId;

    private LocalTime join_time;
    private LocalDate join_date;
    private Boolean isAllowed;
    private Boolean isAdmin;

    public UserCommunity(Long userId, Long communityId, LocalTime join_time, LocalDate join_date, Boolean isAllowed, Boolean isAdmin) {
        this.userId = userId;
        this.communityId = communityId;
        this.join_time = join_time;
        this.join_date = join_date;
        this.isAllowed = isAllowed;
        this.isAdmin = isAdmin;
    }  
}
