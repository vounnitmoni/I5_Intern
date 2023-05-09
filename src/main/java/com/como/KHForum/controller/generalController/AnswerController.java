package com.como.KHForum.controller.generalController;

import java.time.LocalDate;
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

import com.como.KHForum.entity.Answer;
import com.como.KHForum.entity.AnswerCollectionInfo;
import com.como.KHForum.payload.request.generalRequest.AnswerRequest;
import com.como.KHForum.payload.request.generalRequest.VoteRequest;
import com.como.KHForum.repository.AnswerCollectionInfoRepo;
import com.como.KHForum.repository.AnswerRepo;
import com.como.KHForum.webconfig.session.UserSessions;


@RestController
@RequestMapping("api/all/answer")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('ORATOR') or hasRole('USER')")
public class AnswerController {
    @Autowired UserSessions userSessions;
    @Autowired AnswerRepo answerRepo;
    @Autowired AnswerCollectionInfoRepo answerCollectionInfoRepo;
    
    @PostMapping
    public ResponseEntity<?> answerQuestion(@RequestBody AnswerRequest request){
        //question_id, asnwer
        Answer answer = new Answer(request.getAnswer(), 
                                   0, 
                                   LocalTime.now(), 
                                   LocalDate.now(), 
                                   request.getQuestion_id(), 
                                   userSessions.getUserId(),
                                   0);
        answerRepo.save(answer);
                                   
        return ResponseEntity.ok(answer);
    }
    //Use in useEffect
    // @GetMapping("{answer_id}/vote")
    // public ResponseEntity<?> voteOrNot(@PathVariable Long answer_id){
    //     if(answerCollectionInfoRepo.existsUserInRecord(userSessions.getUserId(), answer_id) == BigInteger.ZERO){

    //     }
    // }
    // protected Boolean isDoubleVote(){
    //     if()
    // }

    @PostMapping("{answer_id}/vote")
    public ResponseEntity<?> voteAnswer(@RequestBody VoteRequest request, @PathVariable Long answer_id){
        AnswerCollectionInfo answerCollectionInfo = new AnswerCollectionInfo(userSessions.getUserId(), answer_id, request.getVoted(), request.getReported());
        // switch(answerRepo.findAllById(answer_id).getVote()){
        //     case "true":
        //         if(request.getVoted() == true){return ResponseEntity.badRequest().body(new IllegalArgumentException());}
        //         else{answerCollectionInfoRepo.saveAndFlush(answerCollectionInfo);}
        //     case "false":
        //         if(request.getVoted() == false){return ResponseEntity.badRequest().body(new IllegalArgumentException());}
        //         else{answerCollectionInfoRepo.saveAndFlush(answerCollectionInfo);}
        // }
        Long id = userSessions.getUserId();
        Thread asyncOpt = new Thread(()->{
           try {
                Answer answer = answerRepo.findAllById(answer_id);
                Long prev_vote = answerCollectionInfoRepo.findIdByAnswer_IdAndUser_Id(answer_id, id);
                if(answerCollectionInfo.getVoted()){
                    answer.setVote(answer.getVote()+1);
                }else{
                    answer.setVote(answer.getVote()-1);
                }

                if(answerCollectionInfo.getReported()){
                    answer.setReport(answer.getReport()+1);
                }else{
                    answer.setReport(answer.getReport()-1);
                }
                answerCollectionInfoRepo.deleteById(prev_vote);
                answerRepo.save(answer);
           } catch (Exception e) {
                e.printStackTrace();
           } 
        });
        asyncOpt.start();
        answerCollectionInfoRepo.save(answerCollectionInfo);
        return ResponseEntity.ok(answerCollectionInfo);
    }

}
