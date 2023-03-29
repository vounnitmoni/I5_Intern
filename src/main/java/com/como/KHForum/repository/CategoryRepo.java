package com.como.KHForum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.Category;

@Repository
public interface CategoryRepo extends JpaRepository<Long, Category> {
    
}
