package com.como.KHForum.repository;

import java.math.BigInteger;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.AnswerCollectionInfo;
import com.como.KHForum.entity.enums.EVote;

@Repository
public interface AnswerCollectionInfoRepo extends JpaRepository<AnswerCollectionInfo, Long>{
    @Query(value = "select case when count(id)> 0 then true else false end from kh_forum.answer_collection_info as aci where aci.user_id = :user_id and aci.answer_id = :answer_id", nativeQuery = true)
    BigInteger existsUserInRecord(@Param("user_id") Long user_id, @Param("answer_id") Long answer_id);

    @Query(value = "select id from kh_forum.answer_collection_info as aci where answer_id = :answer_id and user_id = :user_id", nativeQuery = true)
    Long findIdByAnswer_IdAndUser_Id(@Param("answer_id") Long a_id, @Param("user_id") Long u_id);

    @Query(value = "select vote_status from kh_forum.answer_collection_info where user_id= :user_id and answer_id = :a_id", nativeQuery = true)
    EVote findVoteStatus(@Param("user_id") Long user_id, @Param("a_id") Long a_id);
}
