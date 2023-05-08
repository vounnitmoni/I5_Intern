package com.como.KHForum.controller.QuestionCardController;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.como.KHForum.entity.Questionnaire;
import com.como.KHForum.repository.AnswerRepo;
import com.como.KHForum.repository.FollowerRepo;
import com.como.KHForum.repository.QuestionnaireRepo;
import com.como.KHForum.repository.UserCategoryRepo;
import com.como.KHForum.repository.UserCommunityRepo;
import com.como.KHForum.webconfig.session.UserSessions;

@RestController
@RequestMapping("api/all/post")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('ORATOR') or hasRole('USER')")
public class QuestionCardController {
    @Autowired UserSessions userSessions;
    @Autowired QuestionnaireRepo questionnaireRepo;
    @Autowired AnswerRepo answerRepo;
    @Autowired FollowerRepo followerRepo;
    @Autowired UserCommunityRepo userCommunityRepo;
    @Autowired UserCategoryRepo userCategoryRepo;
    Integer number = 20;

    @GetMapping("")
    public ResponseEntity<?> post(){
        Set<Long> community_id = userCommunityRepo.randomCommunityId(userSessions.getUserId());
        Set<Long> followee_id = followerRepo.randomFollowee_id(userSessions.getUserId());
        Set<Long> category_id = userCategoryRepo.randomCategories(userSessions.getUserId());
        Set<Questionnaire> randomCommunityQuestions = questionnaireRepo.randQuestionnairesByCommunity(community_id);
        Set<Questionnaire> randomFolloweeQuestions = questionnaireRepo.randQuestionnairesByFollowee(followee_id);
        Set<Questionnaire> randomCategoryQuestions = questionnaireRepo.randomQuestionnairesByCategories(category_id);

        Set<Questionnaire> post_questionnaires = new HashSet<>();
        Stream.of(randomCommunityQuestions,randomCategoryQuestions, randomFolloweeQuestions).forEach(post_questionnaires::addAll);

        return ResponseEntity.ok(post_questionnaires);
    }
    @GetMapping("/test")
    public ResponseEntity<?> test(){
        Set<Long> community_id = userCommunityRepo.randomCommunityId(userSessions.getUserId());
        Set<Questionnaire> randomCommunityQuestions = questionnaireRepo.randQuestionnairesByCommunity(community_id);
        return ResponseEntity.ok(randomCommunityQuestions);
    }

}



//My Note:
    //need community, userinfo, question(all),
    //questions can be from user(following algo) and recommend by community, category. 
    //only render 20 post each time scroll,
    //user following, ex: a follows 10 people and today those ten post 4 => 4 + posts by communities + category;    
 //Completed: 
    //completed random category questionnaires(5)
    //post by follow 7 more 
    //post by community 8 more
    //order by date desc is neccesserly bcuz seens is accurated enough
