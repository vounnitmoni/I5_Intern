package com.como.KHForum.repository;


import java.time.LocalDateTime;
import java.util.List;
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

    // //limit traffic 
    // @Query(value = "select * from kh_forum.answers where question_id = :q_id and id > :last_id order by vote desc limit 20", nativeQuery = true)
    // Set<Answer> findAnswerIdByQ_id(@Param("q_id") Long q_id, @Param("last_id") Long last_id);
    // @Query(value = "select id from kh_forum.answers where question_id = :q_id and id > :last_id limit 1", nativeQuery = true)
    // Long findLastIdOfLastTwenty(@Param("q_id") Long q_id, @Param("last_id") Long last_id);

    @Query(value = "select count(id) from kh_forum.answers where question_id = :q_id", nativeQuery = true)
    Integer countAnswerByQ_Id(@Param("q_id") Long id);

    @Query(value = "select id from kh_forum.answers where question_id = :id", nativeQuery = true)
    List<Long> listAnswerIdByQ_Id(@Param("id") Long id);

    @Query(value = "select * from kh_forum.answers where question_id = :id order by vote desc, create_date desc, create_time desc limit 15", nativeQuery = true)
    Set<Answer> listAnswerByQ_Id(@Param("id") Long id);

    @Query(value = "select cast(concat(create_date, ' ', create_time) as datetime) as a from kh_forum.answers where id = :id", nativeQuery = true)
    LocalDateTime castAStmpToDateTime(@Param("id") Long id);

}
