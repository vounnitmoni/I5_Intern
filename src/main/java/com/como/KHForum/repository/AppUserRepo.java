package com.como.KHForum.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.AppUser;

@Repository
public interface AppUserRepo extends JpaRepository<AppUser, Long>{
    //predefined query
    final String selectAll = "select * from kh_forum.app_user ";
//---------------------------------------------------------------------------
    @Query(value = selectAll + "where account_id = :id", nativeQuery = true)
    Optional<AppUser> findAppUserByAuthId(@Param("id") Long id);

    @Query(value = selectAll + "where account_id = :id", nativeQuery = true)
    AppUser  appUserInfoByAuthId(@Param("id") Long id);

    @Query(value = "select user_category.category_id from kh_forum.app_user inner join kh_forum.user_category on app_user.id = user_category.user_id where account_id = :id", nativeQuery = true)
    List<Long> findCategoryIdList(@Param("id") Long id);

    @Query(value = "select id from kh_forum.app_user where account_id = :id", nativeQuery = true)
    Long appUserID(@Param("id") Long id);

    @Query(value = "select username from kh_forum.app_user where account_id = :id", nativeQuery = true)
    String userNameByAccId(@Param("id") Long id);

}