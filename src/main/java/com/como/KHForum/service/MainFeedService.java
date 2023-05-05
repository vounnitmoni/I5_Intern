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

@Service
public class MainFeedService {
    @Autowired AnswerRepo answerRepo;
    @Autowired CommentRepo commentRepo;
//------------------------------------------------------------------------------------------------
    Long number = (long) 0;
    Long last_id = (long) 0;
//------------------------------------------------------------------------------------------------
    
    public MainFeedResponse coreFeed(Long q_id, Integer flags){       
        final Set<Long> answer_id = new HashSet<>();
        final Set<Set<Comment>> comments = new HashSet<>();
        for(int i = 1; i<=flags; i++){
            Long a = answerRepo.findLastIdOfLastTwenty(q_id, number);
            number = a;
            System.out.println(number);
        }

        last_id = number;
        Set<Answer> answer = answerRepo.findAnswerIdByQ_id(q_id, last_id);

        answer.forEach((e) -> {
            answer_id.add(e.getId());
            if(number < e.getId()) number = e.getId();
       });

        for(Long i : answer_id){
            comments.add(commentRepo.findCommentsByAnswer_id(i));
        }
        MainFeedResponse payload = new MainFeedResponse(answer, comments);
        return payload;
    }
}
