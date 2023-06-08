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

    @Query(value = "SELECT * FROM kh_forum.communities where id in (select community_id from kh_forum.community_category as cc " +
                   "inner join kh_forum.user_categories as uc on cc.category_id = uc.category_id " +    
                   "where uc.user_id = :id order by rand()) limit 20", nativeQuery = true)
    List<Community> recommendUserCommunityLimit20(@Param("id") Long id);
    
    @Query(value = "SELECT * FROM kh_forum.communities where id in (select community_id from kh_forum.community_category as cc " +
                    "inner join kh_forum.user_categories as uc on cc.category_id = uc.category_id " +    
                    "where uc.user_id = :id order by rand()) and id not in (:prev_id) limit 20", nativeQuery = true)
    List<Community> recommendUserCommunityListLimit20WithNotInPrev(@Param("id") Long id, @Param("prev_id") List<Long> prev_id);

    @Query(value = "select * from kh_forum.communities where id= :id", nativeQuery = true)
    Community communityById(@Param("id") Long id);
}
