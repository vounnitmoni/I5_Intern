package com.como.KHForum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.Role;

@Repository
public interface RoleRepo extends JpaRepository<Integer, Role> {
    
}
