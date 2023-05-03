package com.como.KHForum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.Community;

@Repository
public interface CommunityRepo extends JpaRepository<Community, Long> {
    Boolean existsByName(String name);
    @Query(value = "select id from kh_forum.communities where name = :name", nativeQuery =  true)
    Long findCommunityIdByName(@Param("name") String name);

    
}
