package com.como.KHForum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.Community;

@Repository
public interface CommunityRepo extends JpaRepository<Long, Community>{
    
}
