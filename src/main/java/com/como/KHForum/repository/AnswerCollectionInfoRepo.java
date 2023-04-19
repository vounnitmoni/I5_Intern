package com.como.KHForum.repository;

import java.math.BigInteger;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.AnswerCollectionInfo;

@Repository
public interface AnswerCollectionInfoRepo extends JpaRepository<AnswerCollectionInfo, Long>{
    @Query(value = "select case when count(id)> 0 then true else false end from kh_forum.answer_collection_info as aci where aci.user_id = :user_id and aci.answer_id = :answer_id", nativeQuery = true)
    BigInteger existsUserInRecord(@Param("user_id") Long user_id, @Param("answer_id") Long answer_id);
}
