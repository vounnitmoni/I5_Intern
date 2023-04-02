package com.como.KHForum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.Answer;

@Repository
public interface AnswerRepo extends JpaRepository<Answer, Long>{
    
}
