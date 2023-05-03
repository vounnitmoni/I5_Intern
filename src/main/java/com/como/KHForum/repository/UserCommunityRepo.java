package com.como.KHForum.repository;

import java.math.BigInteger;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.UserCommunity;

@Repository
public interface UserCommunityRepo extends JpaRepository<UserCommunity, Long> {
    @Query(value = "select case when count(id)> 0 then true else false end from kh_forum.user_communties as uc where uc.community_id = :c_id and uc.user_id = :u_id", nativeQuery = true)
    BigInteger isExistsInCommunity(@Param("c_id") Long c_id, @Param("u_id") Long u_id);

    @Query(value = "select c.name from kh_forum.user_communties as uc inner join kh_forum.communities as c on uc.community_id = c.id where uc.user_id = :user_id", nativeQuery = true)
    List<String> findUserCommunityList(@Param("user_id") Long id);
}
