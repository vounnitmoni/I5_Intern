package com.como.KHForum.repository;

import java.util.List;

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

    @Query(value = "select name from kh_forum.communities where id = :id", nativeQuery =  true)
    String findCommunityNameById(@Param("id") Long id);

    @Query(value = "select uc.* from kh_forum.communities as uc left join kh_forum.user_communties as c on uc.id = c.community_id where c.user_id = :user_id", nativeQuery = true)
    List<Community> findUserCommunityList(@Param("user_id") Long id);

    
}
