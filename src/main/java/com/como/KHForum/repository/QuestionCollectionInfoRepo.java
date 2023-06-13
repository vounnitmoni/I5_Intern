package com.como.KHForum.repository;

import java.math.BigInteger;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.QuestionCollectionInfo;
import com.como.KHForum.entity.enums.EVote;

@Repository
public interface QuestionCollectionInfoRepo extends JpaRepository<QuestionCollectionInfo, Long>{
    @Query(value = "select case when count(id)> 0 then true else false end from kh_forum.question_collection_info as qci where qci.user_id = :user_id and qci.question_id = :question_id", nativeQuery = true)
    BigInteger existsUserInRecord(@Param("user_id") Long user_id, @Param("question_id") Long q_id);

    @Query(value = "select vote_status from kh_forum.question_collection_info where user_id = :user_id and question_id = :q_id", nativeQuery = true)
    EVote findUserVoteStatus(@Param("user_id") Long user_id, @Param("q_id") Long q_id);

    @Modifying
    @Query(value = "delete from kh_forum.question_collection_info where user_id = :user_id and question_id = :q_id", nativeQuery = true)
    void deleteUserVote(@Param("user_id") Long user_id, @Param("q_id") Long q_id);
}
