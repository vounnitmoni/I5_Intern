package com.como.KHForum.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.User;

@Repository
public interface UserRepo extends JpaRepository<Long, User> {

    Optional<User> findByUsername(String username);
    
}
