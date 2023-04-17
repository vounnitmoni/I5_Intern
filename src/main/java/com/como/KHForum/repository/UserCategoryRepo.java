package com.como.KHForum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.UserCategory;

@Repository
public interface UserCategoryRepo extends JpaRepository<UserCategory, Long> {
    
}
