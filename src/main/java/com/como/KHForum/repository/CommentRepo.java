package com.como.KHForum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.Comment;

@Repository
public interface CommentRepo extends JpaRepository<Comment, Long>{
    
}
