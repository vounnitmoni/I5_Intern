package com.como.KHForum.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import com.como.KHForum.entity.enums.EIsa;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

    @ManyToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private User user_id;

    @ManyToOne(targetEntity = Community.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "community_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private Community community_id;

    @Column(name = "user_id") private Long userId;
    @Column(name = "community_id") private Long communityId;

    private LocalTime join_time;
    private LocalDate join_date;
    private Boolean isAllowed;
    @Column(columnDefinition = "ENUM('ISA_ADMIN', 'ISA_REVIEVER', 'ISA_MEMBER')")
    @Enumerated(EnumType.STRING)
    private EIsa isA;

    public UserCommunity(Long userId, Long communityId, LocalTime join_time, LocalDate join_date, Boolean isAllowed, EIsa isA) {
        this.userId = userId;
        this.communityId = communityId;
        this.join_time = join_time;
        this.join_date = join_date;
        this.isAllowed = isAllowed;
        this.isA = isA;
    }  
}
