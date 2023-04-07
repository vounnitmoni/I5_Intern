package com.como.KHForum.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.Category;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Long> {
    @Query(value = "select * from kh_forum.category where id in (:id)", nativeQuery = true)
    List<String> findCategoryNameList(@Param("id") List<Long> id);
}
