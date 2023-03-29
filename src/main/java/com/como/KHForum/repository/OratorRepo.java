package com.como.KHForum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.Orator;

@Repository
public interface OratorRepo extends JpaRepository<Long, Orator>{
    
}
