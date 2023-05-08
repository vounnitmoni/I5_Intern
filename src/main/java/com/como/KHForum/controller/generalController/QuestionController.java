package com.como.KHForum.controller.generalController;

import java.math.BigInteger;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.como.KHForum.entity.QuestionCollectionInfo;
import com.como.KHForum.entity.Questionnaire;
import com.como.KHForum.payload.request.generalRequest.CreateQuestionRequest;
import com.como.KHForum.payload.request.generalRequest.VoteRequest;
import com.como.KHForum.repository.CommunityRepo;
import com.como.KHForum.repository.QuestionCollectionInfoRepo;
import com.como.KHForum.repository.QuestionnaireRepo;
import com.como.KHForum.webconfig.session.UserSessions;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/all/question")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('ORATOR') or hasRole('USER')")
public class QuestionController {
    @Autowired QuestionnaireRepo questionnaireRepo;
    @Autowired UserSessions userSessions;
    @Autowired CommunityRepo communityRepo;
    @Autowired QuestionCollectionInfoRepo questionCollectionInfoRepo;

    @PostMapping("/create")
    public ResponseEntity<?> createQuestion(@Valid @RequestBody CreateQuestionRequest request){
        //question with regex validation, asker_id,
        Questionnaire questionnaire = new Questionnaire(request.getQuestion(),
                                                        request.getBody(), 
                                                        LocalTime.now(), 
                                                        LocalDate.now(), 
                                                        null,
                                                        false, 
                                                        0, 
                                                        userSessions.getUserId(),
                                                        communityRepo.findCommunityIdByName(request.getCommunity()),
                                                        0);
        questionnaireRepo.save(questionnaire);
        return ResponseEntity.ok(questionnaire);
    }

    @PostMapping("{question_id}/vote")
    public ResponseEntity<?> voteQuestion(@RequestBody VoteRequest request, @PathVariable Long question_id){
        QuestionCollectionInfo questionCollectionInfo = new QuestionCollectionInfo(userSessions.getUserId(), 
                                                                                   question_id, 
                                                                                   request.getVoted(), 
                                                                                   request.getReported());
        questionCollectionInfoRepo.saveAndFlush(questionCollectionInfo);

        Thread asyncOpt = new Thread(()->{
            try {
                Questionnaire questionnaire = questionnaireRepo.findAllById(question_id);
                if(questionCollectionInfo.getReported()){
                    questionnaire.setReport(questionnaire.getReport()+1);
                }else{
                    questionnaire.setReport(questionnaire.getReport()-1);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }); 
        asyncOpt.start();
        return ResponseEntity.ok(questionCollectionInfo);
    }
}
