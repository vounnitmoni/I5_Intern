package com.como.KHForum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.UserCommunity;

@Repository
public interface UserCommunityRepo extends JpaRepository<UserCommunity, Long> {
    
}
