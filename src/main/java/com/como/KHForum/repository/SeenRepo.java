package com.como.KHForum.repository;

import java.math.BigInteger;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.Seen;

@Repository
public interface SeenRepo extends JpaRepository<Seen, Long>{
    @Query(value = "select case when count(id)> 0 then true else false end from kh_forum.seens as s where s.user_id = :user_id and s.questionnaire_id = :q_id", nativeQuery = true)
    BigInteger ifSeenExists(@Param("user_id") Long user_id, @Param("q_id") Long q_id);

    @Query(value = "select seen from kh_forum.seens as s where s.user_id = :user_id and s.questionnaire_id = :q_id", nativeQuery = true)
    Boolean findSeen(@Param("user_id") Long user_id, @Param("q_id") Long q_id);
}
