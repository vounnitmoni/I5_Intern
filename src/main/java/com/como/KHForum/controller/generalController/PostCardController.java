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
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    protected class Flag{
        private Integer flags;
    }
    @Getter
    @Setter
    protected class FeedRequest{
        private Long question_id;
        private Integer flags;
        FeedRequest(){};
        FeedRequest (Long question_id, Integer flags){
            this.flags = flags;
            this.question_id = question_id;
        }
    }

//------------------------------------------------------------------------------------------------
    @PostMapping("/test")
    public ResponseEntity<?> test(){
        MainFeedResponse payload = mainFeedService.coreFeed((long) 7, 2);
        return ResponseEntity.ok(payload);
    }
}
