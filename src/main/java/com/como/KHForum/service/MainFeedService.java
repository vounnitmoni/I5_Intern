package com.como.KHForum.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.como.KHForum.entity.Answer;
import com.como.KHForum.entity.Comment;
import com.como.KHForum.payload.response.MainFeedResponse;
import com.como.KHForum.repository.AnswerRepo;
import com.como.KHForum.repository.CommentRepo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Service
public class MainFeedService {
    @Autowired AnswerRepo answerRepo;
    @Autowired CommentRepo commentRepo;
//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
    public MainFeedResponse coreFeed(Long q_id){
        final Set<Answer> answer = answerRepo.findAnswerIdByQ_id(q_id);
        final Set<Long> answer_id = new HashSet<>();
        final Set<Set<Comment>> comments = new HashSet<>();
        answer.forEach((e) -> {
            answer_id.add(e.getId());
        });

        for(Long i : answer_id){
            comments.add(commentRepo.findCommentsByAnswer_id(i));
        }
        MainFeedResponse payload = new MainFeedResponse(answer, comments);
        return payload;
    }
}
