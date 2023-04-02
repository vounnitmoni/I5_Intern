package com.como.KHForum.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.Role;
import com.como.KHForum.entity.enums.ERole;

@Repository
public interface RoleRepo extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(ERole name);
}
