package com.como.KHForum.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.Category;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Long> {
    @Query(value = "select * from kh_forum.category where id in (:id)", nativeQuery = true)
    List<String> findCategoryNameList(@Param("id") List<Long> id);

    @Query(value = "select id from kh_forum.categories where name = :name", nativeQuery = true)
    Long findCategoryIdByName(@Param("name") String name);

    @Query(value = "select * from kh_forum.categories where name = :name", nativeQuery = true)
    Category findCategoryByName(String name);

    Optional<Category> findByName(String name);
    Boolean existsByName(String name);

    @Query(value = "select * from kh_forum.categories", nativeQuery = true)
    List<Category> allCategory();

//---------------------------------new approach---------------------------
    @Query(value = "select * from kh_forum.categories order by rand() limit 20", nativeQuery = true)
    Set<Category> categories();
    @Query(value = "select * from kh_forum.categories where id not in (:setOf_id) order by rand() limit 20", nativeQuery = true)
    Set<Category> categoriesWithNotIn(@Param("setOf_id") Set<Long> id);
}
