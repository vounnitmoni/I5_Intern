package com.como.KHForum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.AppUser;

@Repository
public interface AppUserRepo extends JpaRepository<AppUser, Long>{
    AppUser findByAccountId(Long account_id);
}
