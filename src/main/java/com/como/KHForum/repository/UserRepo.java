package com.como.KHForum.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.User;


@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Boolean existsByEmail(String email);
    Boolean existsByUsername(String username);   
    User findUserByEmail(String email);
    Optional<User> findById(Long id);

    @Query(value = "select * from kh_forum.users where id = :id", nativeQuery = true)
    User userInfoById(@Param("id") Long id);
}
