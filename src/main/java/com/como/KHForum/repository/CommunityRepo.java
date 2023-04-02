package com.como.KHForum.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.Community;

@Repository
public interface CommunityRepo extends JpaRepository<Community, Long>{
    Boolean existsByName(String name);

    @Query(value = "select name from kh_forum.communities where creator_id = :creator_id", nativeQuery = true)
    List<String> findNameByCreatorId(@Param("creator_id") Long creator_id);  
}
