package com.como.KHForum.repository;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.Comment;

@Repository
public interface CommentRepo extends JpaRepository<Comment, Long>{
    @Query(value = "with recursive cte as ( " +
                   "select * " +
                   "from kh_forum.comments "+
                   "where answer_id = :id "+
                   "union all "+
                   "select kh_forum.comments.* "+
                   "from cte join "+
                        "kh_forum.comments "+
                                "on kh_forum.comments.parent_id = cte.id) "+
                   "select * from cte;", nativeQuery = true)
    Set<Comment> findCommentsByAnswer_id(@Param("id") Long id);

    @Query(value = "select count(id) from kh_forum.comments where answer_id in :id", nativeQuery = true)
    Integer countCommentsByAnswer_Id(@Param("id") List<Long> id);

    @Query(value = "select * from kh_forum.comments where id = :id", nativeQuery = true)
    Comment commentInfoById(@Param("id") Long id);

    @Query(value = "select * from kh_forum.comments where answer_id = :id order by create_stamp asc limit 5", nativeQuery = true)
    Set<Comment> commentsByAnswerId(@Param("id") Long answer_id);
    @Query(value = "select * from kh_forum.comments where answer_id = :id and id not in (:prev_id) limit 15", nativeQuery = true)
    Set<Comment> commentsByAnswerIdWithNotPrev(@Param("id") Long answer_id, @Param("prev_id") Set<Long> prev_id);

    @Query(value = "select case when count(id)> 0 then true else false end from kh_forum.comments where answer_id = :id", nativeQuery = true)
    BigInteger commentExist(@Param("id") Long id);

    @Query(value = "select case when count(id)> 0 then true else false end from kh_forum.comments where parent_id = :id", nativeQuery = true)
    BigInteger commentParentExist(@Param("id") Long id);

}
