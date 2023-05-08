package com.como.KHForum.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.UserCategory;

@Repository
public interface UserCategoryRepo extends JpaRepository<UserCategory, Long> {
    //random
    @Query(value = "select id from kh_forum.user_categories where user_id = (:id) order by rand() limit 5", nativeQuery = true)
    Set<Long> randomCategories(@Param("id") Long id);
    //------
}
