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
@Table(name = "community_category")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CommunityCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(targetEntity = Community.class)
    @JoinColumn(name = "community_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private Community communityId;
    @ManyToOne(targetEntity = Category.class)
    @JoinColumn(name = "category_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private Category categoryId;

    @Column(name = "community_id") private Long community_id;
    @Column(name = "category_id") private Long category_id;

    public CommunityCategory(Long community_id, Long category_id) {
        this.community_id = community_id;
        this.category_id = category_id;
    }   
}
