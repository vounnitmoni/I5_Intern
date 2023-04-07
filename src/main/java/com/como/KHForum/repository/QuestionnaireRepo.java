package com.como.KHForum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.Questionnaire;

@Repository
public interface QuestionnaireRepo extends JpaRepository<Questionnaire, Long> {
    
}
