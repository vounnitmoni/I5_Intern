package com.como.KHForum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.Follower;

@Repository
public interface FollowerRepo extends JpaRepository<Follower, Long>{
    
}
