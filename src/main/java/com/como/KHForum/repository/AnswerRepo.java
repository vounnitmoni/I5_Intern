package com.como.KHForum.repository;


import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.Answer;

@Repository
public interface AnswerRepo extends JpaRepository<Answer, Long> {
    @Query(value = "SELECT * FROM kh_forum.answers where id = :id", nativeQuery = true)
    Answer findAllById(@Param("id") Long id);

    //limit traffic 
    @Query(value = "select * from kh_forum.answers where question_id = :q_id and id > :last_id limit 1", nativeQuery = true)
    Set<Answer> findAnswerIdByQ_id(@Param("q_id") Long q_id, @Param("last_id") Long last_id);
    @Query(value = "select id from kh_forum.answers where question_id = :q_id and id > :last_id limit 1", nativeQuery = true)
    Long findLastIdOfLastTwenty(@Param("q_id") Long q_id, @Param("last_id") Long last_id);

}
