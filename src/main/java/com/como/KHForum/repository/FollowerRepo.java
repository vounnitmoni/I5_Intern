package com.como.KHForum.repository;

import java.math.BigInteger;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.Follower;

@Repository
public interface FollowerRepo extends JpaRepository<Follower, Long>{
    @Query(value = "select case when count(id)> 0 then true else false end from kh_forum.following where follower_id = :follower_id and followee_id = :followee_id", nativeQuery = true)
    BigInteger isFollowed(@Param("follower_id") Long follower_id, @Param("followee_id") Long followee_id);

    @Query(value = "select * from kh_forum.following where follower_id = :follower_id and followee_id = :followee_id", nativeQuery = true)
    Follower follower(@Param("follower_id") Long follower_id, @Param("followee_id") Long followee_id);
}
