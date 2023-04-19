package com.como.KHForum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.CommunityCategory;

@Repository
public interface CommunityCategoryRepo extends JpaRepository<CommunityCategory, Long>{
    
}
