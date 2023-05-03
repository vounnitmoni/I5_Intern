package com.como.KHForum.controller.generalController;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.como.KHForum.entity.Answer;
import com.como.KHForum.entity.Comment;
import com.como.KHForum.payload.response.MainFeedResponse;
import com.como.KHForum.repository.AnswerRepo;
import com.como.KHForum.repository.CommentRepo;
import com.como.KHForum.repository.QuestionnaireRepo;
import com.como.KHForum.service.MainFeedService;
import com.como.KHForum.webconfig.session.UserSessions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@RestController
@RequestMapping("api/all/card")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('ORATOR') or hasRole('USER')")
public class PostCardController {
    @Autowired QuestionnaireRepo questionnaireRepo;
    @Autowired AnswerRepo answerRepo;
    @Autowired UserSessions userSessions;
    @Autowired CommentRepo commentRepo;
    @Autowired MainFeedService mainFeedService;
//------------------------------------------------------------------------------------------------
    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    protected class Payload{
        private Set<Answer> answers = new HashSet<>();
        private Set<Set<Comment>> comments = new HashSet<>();
    }

//------------------------------------------------------------------------------------------------
    //Core
    // @PostMapping("/test")
    // public ResponseEntity<?> test(@RequestBody Long q_id){
    //     final Set<Answer> answer = answerRepo.findAnswerIdByQ_id(q_id);
    //     final Set<Long> answer_id = new HashSet<>();
    //     final Set<Set<Comment>> comments = new HashSet<>();
    //     answer.forEach((e) -> {
    //         answer_id.add(e.getId());
    //     });

    //     for(Long i : answer_id){
    //         comments.add(commentRepo.findCommentsByAnswer_id(i));
    //     }
    //     Payload payload = new Payload(answer, comments);
    //     return ResponseEntity.ok(payload);
    // }
    @PostMapping("/test")
    public ResponseEntity<?> test(@RequestBody Long q_id){
        MainFeedResponse payload = mainFeedService.coreFeed(q_id);
        return ResponseEntity.ok(payload);
    }
}
