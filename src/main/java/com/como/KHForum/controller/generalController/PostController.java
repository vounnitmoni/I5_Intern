package com.como.KHForum.controller.generalController;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.como.KHForum.payload.request.generalRequest.FlagRequest;
import com.como.KHForum.payload.response.authResponse.UserInfoResponse;
import com.como.KHForum.repository.AnswerRepo;
import com.como.KHForum.repository.CommentRepo;
import com.como.KHForum.repository.QuestionCollectionInfoRepo;
import com.como.KHForum.repository.QuestionnaireRepo;
import com.como.KHForum.webconfig.session.UserSessions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@RestController
@RequestMapping("api/all/post")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('ORATOR') or hasRole('USER')")
public class PostController {
    @Autowired UserSessions userSessions;
    @Autowired QuestionnaireRepo questionnaireRepo;
    @Autowired QuestionCollectionInfoRepo questionCollectionInfoRepo;
    @Autowired CommentRepo commentRepo;
    @Autowired AnswerRepo answerRepo;
//--------------------------------------------------------------------------------------------------
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    protected class UserPostInfoResponse{
        private Long user_id;
        private Long question_id;
        private String username;
        private String question;
        private String description;
        private List<byte[]> image;
        private Integer vote;
        private Integer comment;
        private LocalDateTime postStmp;
        private Integer ago;
    }
//--------------------------------------------------------------------------------------------------

    @PostMapping("/user/{user_id}")
    public ResponseEntity<?> userPost(@RequestBody FlagRequest request, @PathVariable Long user_id){
        Set<UserInfoResponse> userInfoResponses = new HashSet<>();
        Integer q;
        Long last_id;
        if(request.getFlag() == 0){
            q= 0;
            last_id = q.longValue();
        }else{
            q = 20*request.getFlag();
            last_id = questionnaireRepo.findLastIdOfLastTwentyByUserId(user_id, q);
        }
        return ResponseEntity.ok().body(userInfoResponses);
    }
}
