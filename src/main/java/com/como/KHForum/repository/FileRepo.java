package com.como.KHForum.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.File;

@Repository
public interface FileRepo extends JpaRepository<File,Long>{
    @Query(value = "select photo from kh_forum.file where questionnaire_id = :id", nativeQuery = true)
    List<byte[]> fileByQ_id(@Param("id") Long id);

    @Query(value = "select * from kh_forum.file where community_id = :id and file_status = 'PROFILE'", nativeQuery = true)
    File communityProfilePic(@Param("id") Long id);
    @Query(value = "select * from kh_forum.file where community_id = :id and file_status = 'COVER'", nativeQuery = true)
    File communityCoverPic(@Param("id") Long id);

    @Query(value = "select * from kh_forum.file where user_id = :id and file_status = 'PROFILE'", nativeQuery = true)
    File userProfilePic(@Param("id") Long id);
    @Query(value = "select * from kh_forum.file where user_id = :id and file_status = 'COVER'", nativeQuery = true)
    File userCoverPic(@Param("id") Long id);


}
