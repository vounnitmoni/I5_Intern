package com.como.KHForum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.como.KHForum.repository.AnswerRepo;
import com.como.KHForum.repository.CommentRepo;

@Service
public class MainFeedService {
    @Autowired AnswerRepo answerRepo;
    @Autowired CommentRepo commentRepo;
//------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------
    
//     public MainFeedResponse coreFeed(Long q_id, Integer flags){       
//         final Set<Long> answer_id = new HashSet<>();
//         final Set<Set<Comment>> comments = new HashSet<>();
//         final Set<Comment> comment = new HashSet<>();
//         Integer q;
//         Long last_id;
//         if(flags == 0){
//             q= 0;
//             last_id = q.longValue();
//         }else{
//             q = 20*flags;
//             last_id = answerRepo.findLastIdOfLastTwenty(q_id, q.longValue());
//         }
//         Set<Answer> answer = answerRepo.findAnswerIdByQ_id(q_id, last_id);

//         answer.forEach((e) -> {
//             answer_id.add(e.getId());
//        });

//         for(Long i : answer_id){
//             comments.add(commentRepo.findCommentsByAnswer_id(i));
//         }
//         comment.forEach(e ->{
//             comment.add(e);
//         });
//         for(Set<Comment> i : comments){
//             for(Comment j : i){
//                 comment.add(j);
//             }
//         }
//         MainFeedResponse payload = new MainFeedResponse(answer, comment);
//         return payload;
//     }
 }
