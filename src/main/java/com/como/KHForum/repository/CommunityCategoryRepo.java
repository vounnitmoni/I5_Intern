package com.como.KHForum.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.CommunityCategory;

@Repository
public interface CommunityCategoryRepo extends JpaRepository<CommunityCategory, Long>{
    @Query(value = "SELECT community_id FROM kh_forum.community_category as cc where category_id in (:id) limit by 5", nativeQuery =  true)
    Set<Long> randomCommunityId(@Param("id") Set<Long> id);
}
