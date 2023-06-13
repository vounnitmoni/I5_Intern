package com.como.KHForum.repository;

import java.math.BigInteger;
import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.UserCommunity;

@Repository
public interface UserCommunityRepo extends JpaRepository<UserCommunity, Long> {
    @Query(value = "select case when count(id)> 0 then true else false end from kh_forum.user_communties as uc where uc.community_id = :c_id and uc.user_id = :u_id", nativeQuery = true)
    BigInteger isExistsInCommunity(@Param("c_id") Long c_id, @Param("u_id") Long u_id);

    @Query(value = "select c.* from kh_forum.user_communties as uc inner join kh_forum.communities as c on uc.community_id = c.id where uc.user_id = :user_id", nativeQuery = true)
    List<Object[]> findUserCommunityList(@Param("user_id") Long id);

    //session user
    @Query(value = "select community_id from kh_forum.user_communties as uc where user_id = :user_id order by rand() limit 8", nativeQuery = true)
    Set<Long> randomCommunityId(@Param("user_id") Long id);
    @Query(value = "select community_id from kh_forum.user_communties as uc where user_id = :user_id and id not in (:prev_id) order by rand() limit 8", nativeQuery = true)
    Set<Long> randomCommunityIdWithMotIn(@Param("user_id") Long id, @Param("prev_id") Set<Long> prev_id);

    @Query(value = "select count(id) from kh_forum.user_communties where community_id = :id", nativeQuery = true)
    Integer communityMembers(@Param("id") Long id);

    @Query(value = "select * from kh_forum.user_communties where user_id = :uid and community_id = :cid", nativeQuery = true)
    UserCommunity findUserCommunityInfo(@Param("cid") Long cid, @Param("uid") Long uid);

    @Modifying
    @Query(value = "delete from kh_forum.user_communties where user_id = :uid and community_id = :cid", nativeQuery = true)
    void deleteUserJoinCommunity(@Param("cid") Long cid, @Param("uid") Long uid);
}
