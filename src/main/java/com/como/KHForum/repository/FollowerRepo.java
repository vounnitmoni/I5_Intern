package com.como.KHForum.repository;

import java.math.BigInteger;
import java.util.Set;

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

    @Query(value = "select followee_id from kh_forum.following where follower_id = :follower_id order by rand() limit 7", nativeQuery = true)
    Set<Long> randomFollowee_id(@Param("follower_id") Long follower_id);
    @Query(value = "select followee_id from kh_forum.following where follower_id = :follower_id and id not in (:prev_id) order by rand() limit 7", nativeQuery = true)
    Set<Long> randomFollowee_idWithNotIn(@Param("follower_id") Long follower_id, @Param("prev_id") Set<Long> prev_id);

    @Query(value = "select count(id) from kh_forum.following where followee_id = :user_id", nativeQuery = true)
    Integer followerAmount(@Param("user_id") Long user_id);

    @Query(value = "select count(id) from kh_forum.following where follower_id = :user_id", nativeQuery = true)
    Integer followingAmount(@Param("user_id") Long user_id);

    @Query(value = "select * from kh_forum.following where followee_id = :user_id limit 15", nativeQuery = true)
    Set<Follower> listFollower(@Param("user_id") Long user_id);
    @Query(value = "select * from kh_forum.following where follower_id = :user_id limit 15", nativeQuery = true)
    Set<Follower> listFollowing(@Param("user_id") Long user_id);

    @Query(value = "select * from kh_forum.following where followee_id = :user_id and id not in (:prev_id) limit 15", nativeQuery = true)
    Set<Follower> listFollowerWithNotIn(@Param("user_id") Long user_id, @Param("prev_id") Set<Long> prev_id);
    @Query(value = "select * from kh_forum.following where follower_id = :user_id and id not in (:prev_id) limit 15", nativeQuery = true)
    Set<Follower> listFollowingWithNotIn(@Param("user_id") Long user_id, @Param("prev_id") Set<Long> prev_id);

}
