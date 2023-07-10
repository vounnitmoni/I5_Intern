package com.como.KHForum.controller.generalController;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.como.KHForum.entity.Questionnaire;
import com.como.KHForum.payload.request.generalRequest.SearchRequestion;
import com.como.KHForum.repository.AnswerRepo;
import com.como.KHForum.repository.CommentRepo;
import com.como.KHForum.repository.FileRepo;
import com.como.KHForum.repository.QuestionCollectionInfoRepo;
import com.como.KHForum.service.SearchService.SearchService;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@RestController
@RequestMapping("api/all/search")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('ORATOR') or hasRole('USER')")
public class SearchController {
    @Autowired SearchService searchService;
    @Autowired QuestionCollectionInfoRepo questionCollectionInfoRepo;
    @Autowired AnswerRepo answerRepo;
    @Autowired CommentRepo commentRepo;
    @Autowired FileRepo fileRepo;

    Set<SearchCommunityResponse> emptySet = new HashSet<>();

    @PostMapping("/question")
    public ResponseEntity<?> searchQuestion(@RequestBody SearchRequestion requestion){
        Set<Questionnaire> result = searchService.searchQuestionService(requestion.getParam());
        Set<SearchQuestionnairRepsonse> repsonses = new LinkedHashSet<>();
        result.forEach(e -> {
            Integer count_answer = answerRepo.countAnswerByQ_Id(e.getId()) + commentRepo.countCommentsByAnswer_Id(answerRepo.listAnswerIdByQ_Id(e.getId()));
            String[] paramSeparation = requestion.getParam().split("[\\p{Punct}\\s]+");
            SearchQuestionnairRepsonse repsonse = new SearchQuestionnairRepsonse(e.getId(), e.getQuestion(), e.getBody(), e.getVote(), count_answer, paramSeparation);
            repsonses.add(repsonse);
        });
        return ResponseEntity.ok((requestion.getParam() != "") ? repsonses : emptySet);
    }

    @PostMapping("/user")
    public ResponseEntity<?> searchUser(@RequestBody SearchRequestion request) {
        return ResponseEntity.ok((request.getParam() != "") ? searchService.searchUserService(request.getParam()) : emptySet);
    }

    @PostMapping("/community") 
    public ResponseEntity<?> searchCommunity(@RequestBody SearchRequestion request) {
        return ResponseEntity.ok((request.getParam() != "" ? searchService.searchCommunityService(request.getParam()) : emptySet)); 
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    protected class SearchQuestionnairRepsonse {
        private Long id;
        private String question;
        private String body;
        private Integer vote; 
        private Integer answer;
        private String[] param_separation;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    protected class SearchUserResponse{
        private Long id;
        private String firstname;
        private String lastname;
        private String username; 
        private byte[] profile_pic;
        private String[] param_separation;
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    protected class SearchCommunityResponse {
        private Long id; 
        private String community;
        private Integer member;
        private byte[] profile_pic;
        private String[] param_separation;
    }
}