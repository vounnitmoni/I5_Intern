package com.como.KHForum.controller.generalController;

import java.math.BigInteger;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.como.KHForum.entity.Answer;
import com.como.KHForum.entity.AnswerCollectionInfo;
import com.como.KHForum.entity.AppUser;
import com.como.KHForum.entity.File;
import com.como.KHForum.entity.QuestionCollectionInfo;
import com.como.KHForum.entity.Questionnaire;
import com.como.KHForum.entity.User;
import com.como.KHForum.entity.enums.EFileStatus;
import com.como.KHForum.entity.enums.EVote;
import com.como.KHForum.payload.request.generalRequest.AnswerRequest;
import com.como.KHForum.repository.AnswerCollectionInfoRepo;
import com.como.KHForum.repository.AnswerRepo;
import com.como.KHForum.repository.AppUserRepo;
import com.como.KHForum.repository.FileRepo;
import com.como.KHForum.repository.UserRepo;
import com.como.KHForum.service.ServiceUtils.Utility;
import com.como.KHForum.service.ServiceUtils.VoteStatusService;
import com.como.KHForum.service.ServiceUtils.Utility.DateTimeObject;
import com.como.KHForum.webconfig.session.UserSessions;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@RestController
@RequestMapping("api/all/answer")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('ORATOR') or hasRole('USER')")
public class AnswerController {
    @Autowired UserSessions userSessions;
    @Autowired AnswerRepo answerRepo;
    @Autowired AnswerCollectionInfoRepo answerCollectionInfoRepo;
    @Autowired FileRepo fileRepo;
    @Autowired AppUserRepo appUserRepo;
    @Autowired UserRepo userRepo;
    @Autowired Utility serviceUtils;
    @Autowired VoteStatusService voteStatusService;

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
        answerRepo.saveAndFlush(answer);
        File file = new File(null, null, null, answer.getId(), null, EFileStatus.ANSWER, request.getPhoto());
        fileRepo.save(file);                        
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

    // @PostMapping("{answer_id}/vote")
    // public ResponseEntity<?> voteAnswer(@RequestBody VoteRequest request, @PathVariable Long answer_id){
    //     AnswerCollectionInfo answerCollectionInfo = new AnswerCollectionInfo(userSessions.getUserId(), answer_id, request.getVoted(), request.getReported());
    //     // switch(answerRepo.findAllById(answer_id).getVote()){
    //     //     case "true":
    //     //         if(request.getVoted() == true){return ResponseEntity.badRequest().body(new IllegalArgumentException());}
    //     //         else{answerCollectionInfoRepo.saveAndFlush(answerCollectionInfo);}
    //     //     case "false":
    //     //         if(request.getVoted() == false){return ResponseEntity.badRequest().body(new IllegalArgumentException());}
    //     //         else{answerCollectionInfoRepo.saveAndFlush(answerCollectionInfo);}
    //     // }
    //     Long id = userSessions.getUserId();
    //     Thread asyncOpt = new Thread(()->{
    //        try {
    //             Answer answer = answerRepo.findAllById(answer_id);
    //             Long prev_vote = answerCollectionInfoRepo.findIdByAnswer_IdAndUser_Id(answer_id, id);
    //             if(answerCollectionInfo.getVoted()){
    //                 answer.setVote(answer.getVote()+1);
    //             }else{
    //                 answer.setVote(answer.getVote()-1);
    //             }

    //             if(answerCollectionInfo.getReported()){
    //                 answer.setReport(answer.getReport()+1);
    //             }else{
    //                 answer.setReport(answer.getReport()-1);
    //             }
    //             answerCollectionInfoRepo.deleteById(prev_vote);
    //             answerRepo.save(answer);
    //        } catch (Exception e) {
    //             e.printStackTrace();
    //        } 
    //     });
    //     asyncOpt.start();
    //     answerCollectionInfoRepo.save(answerCollectionInfo);
    //     return ResponseEntity.ok(answerCollectionInfo);
    // }
    @GetMapping("/ofquestion/{q_id}")
    public ResponseEntity<?> answerOfQuestion(@PathVariable Long q_id){    
        Set<AnswerListResponse> listAnswer = new LinkedHashSet<>();
        answerRepo.listAnswerByQ_Id(q_id).forEach(e ->{
            AppUser appUser = appUserRepo.appUserInfoByAuthId(e.getAuthor_id()); 
            User user = userRepo.userInfoById(e.getAuthor_id());
            DateTimeObject object = serviceUtils.DateTimeConverter(answerRepo.castAStmpToDateTime(e.getId()));
            String name_shortcut = String.valueOf(appUser.getFirstname().charAt(0)) + String.valueOf(appUser.getLastname().charAt(0));
            AnswerListResponse res = new AnswerListResponse(e.getId(), 
                                                e.getAuthor_id(), 
                                                appUser.getFirstname(), 
                                                appUser.getLastname(), 
                                                user.getUsername(),
                                                name_shortcut, 
                                                e.getAnswer(),
                                                e.getVote(),
                                                voteStatusService.answerVoteStatus(e.getId()), 
                                                object.getAgo_status(), 
                                                object.getAgo(), 
                                                fileRepo.userProfilePic(e.getAuthor_id()).getPhoto(), 
                                                fileRepo.AnswerPhoto(e.getId()).getPhoto());
            listAnswer.add(res);
        });
        return ResponseEntity.ok(listAnswer); 
    }

        @Transactional
    @PatchMapping("/upvote/{a_id}")
    public ResponseEntity<?> upVoteQuestion(@PathVariable Long a_id){
        Answer answer = answerRepo.findAllById(a_id);
        if(answerCollectionInfoRepo.existsUserInRecord(userSessions.getUserId(), a_id) == BigInteger.ONE){
            if(answerCollectionInfoRepo.findVoteStatus(userSessions.getUserId(), a_id) == EVote.UP_VOTE){
                answer.setVote(answer.getVote() - 1);
                answerCollectionInfoRepo.deleteUserVote(userSessions.getUserId(), a_id);
                return ResponseEntity.ok("1");
            }else{
                answer.setVote(answer.getVote() + 2);
                answerCollectionInfoRepo.deleteUserVote(userSessions.getUserId(), a_id);
                AnswerCollectionInfo answerCollectionInfo = new AnswerCollectionInfo(userSessions.getUserId(), 
                                                                                        a_id, 
                                                                                        true, 
                                                                                        null,
                                                                                        EVote.UP_VOTE);
                answerCollectionInfoRepo.save(answerCollectionInfo);
                return ResponseEntity.ok("2");
            }
        }
        answer.setVote(answer.getVote() + 1);
        AnswerCollectionInfo answerCollectionInfo = new AnswerCollectionInfo(userSessions.getUserId(), 
                                                                                        a_id, 
                                                                                        true, 
                                                                                        null,
                                                                                        EVote.UP_VOTE);
        answerCollectionInfoRepo.save(answerCollectionInfo);
        answerCollectionInfoRepo.save(answerCollectionInfo);
        return ResponseEntity.ok("3");
    }

    @Transactional
    @PatchMapping("/downvote/{a_id}")
    public ResponseEntity<?> downVoteQuestion(@PathVariable Long a_id){
        Answer answer = answerRepo.findAllById(a_id);
        if(answerCollectionInfoRepo.existsUserInRecord(userSessions.getUserId(), a_id) == BigInteger.ONE){
            if(answerCollectionInfoRepo.findVoteStatus(userSessions.getUserId(), a_id) == EVote.DOWN_VOTE){
                answer.setVote(answer.getVote() + 1);
                answerCollectionInfoRepo.deleteUserVote(userSessions.getUserId(), a_id);
                return ResponseEntity.ok("1");
            }else{
                answer.setVote(answer.getVote() - 2);
                answerCollectionInfoRepo.deleteUserVote(userSessions.getUserId(), a_id);
                AnswerCollectionInfo answerCollectionInfo = new AnswerCollectionInfo(userSessions.getUserId(), 
                                                                                           a_id, 
                                                                                           true, 
                                                                                           null,
                                                                                           EVote.DOWN_VOTE);
                answerCollectionInfoRepo.save(answerCollectionInfo);
                return ResponseEntity.ok("2");
            }
        }
        answer.setVote(answer.getVote() - 1);
        AnswerCollectionInfo answerCollectionInfo = new AnswerCollectionInfo(userSessions.getUserId(), 
                                                                                           a_id, 
                                                                                           true, 
                                                                                           null,
                                                                                           EVote.DOWN_VOTE);
        answerCollectionInfoRepo.save(answerCollectionInfo);
        return ResponseEntity.ok("3");
    }
//-------------------------------Answer Response------------------------------\
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    protected class AnswerListResponse{
        private Long answer_id;
        private Long author_id;
        private String firstname;
        private String lastname;
        private String username;
        private String name_shortcut;
        private String answer;
        private Integer vote;
        private EVote vote_status;
        private String ago_string;
        private Integer ago_number;
        private byte[] author_photo;
        private byte[] answer_photo;
    }
}
