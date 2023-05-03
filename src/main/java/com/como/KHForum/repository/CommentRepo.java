package com.como.KHForum.repository;

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
    
}
