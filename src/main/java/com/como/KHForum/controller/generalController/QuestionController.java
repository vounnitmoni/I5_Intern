package com.como.KHForum.controller.generalController;

import java.math.BigInteger;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

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

import com.como.KHForum.entity.File;
import com.como.KHForum.entity.QuestionCollectionInfo;
import com.como.KHForum.entity.Questionnaire;
import com.como.KHForum.entity.enums.EFileStatus;
import com.como.KHForum.entity.enums.EVote;
import com.como.KHForum.payload.request.generalRequest.CreateQuestionRequest;
import com.como.KHForum.payload.response.generalResponse.RandomQuestionResponse;
import com.como.KHForum.repository.AnswerRepo;
import com.como.KHForum.repository.AppUserRepo;
import com.como.KHForum.repository.CommentRepo;
import com.como.KHForum.repository.CommunityRepo;
import com.como.KHForum.repository.FileRepo;
import com.como.KHForum.repository.QuestionCollectionInfoRepo;
import com.como.KHForum.repository.QuestionnaireRepo;
import com.como.KHForum.repository.UserRepo;
import com.como.KHForum.service.ServiceUtils.Utility;
import com.como.KHForum.service.ServiceUtils.Utility.DateTimeObject;
import com.como.KHForum.service.ServiceUtils.VoteStatusService;
import com.como.KHForum.webconfig.session.UserSessions;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@RestController
@RequestMapping("api/all/question")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('ORATOR') or hasRole('USER')")
public class QuestionController {
    @Autowired QuestionnaireRepo questionnaireRepo;
    @Autowired UserSessions userSessions;
    @Autowired CommunityRepo communityRepo;
    @Autowired QuestionCollectionInfoRepo questionCollectionInfoRepo;
    @Autowired AnswerRepo answerRepo;
    @Autowired CommentRepo commentRepo;
    @Autowired FileRepo fileRepo;
    @Autowired AppUserRepo appUserRepo;
    @Autowired Utility utility;
    @Autowired UserRepo userRepo;
    @Autowired VoteStatusService voteStatusService;

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
        questionnaireRepo.saveAndFlush(questionnaire);
        request.getPhoto().forEach(e->{
            File q_photo = new File(null, null, questionnaire.getId(), null, null, EFileStatus.QUESTION, e);
            fileRepo.save(q_photo); 
        });                                            
        return ResponseEntity.ok(questionnaire);
    }

    @GetMapping("/{q_id}")
    public ResponseEntity<?> eachQuestionInfo(@PathVariable Long q_id){
        Questionnaire e = questionnaireRepo.findAllById(q_id);
        Integer count_answer = answerRepo.countAnswerByQ_Id(e.getId()) + commentRepo.countCommentsByAnswer_Id(answerRepo.listAnswerIdByQ_Id(e.getId()));
        DateTimeObject object = utility.DateTimeConverter(questionnaireRepo.castQStmpToDateTime(e.getId()));
        PostInfoResponse response = new PostInfoResponse(e.getId(),
                                                                 e.getCommunity_id(),
                                                                 e.getAuthor_id(),
                                                                 fileRepo.communityProfilePic(e.getCommunity_id()).getPhoto(), 
                                                                 communityRepo.communityById(e.getCommunity_id()).getName(),
                                                                 userRepo.userInfoById(e.getAuthor_id()).getUsername(), 
                                                                 e.getQuestion(), 
                                                                 e.getBody(), 
                                                                 e.getVote(), 
                                                                 count_answer, 
                                                                 object.getAgo(), 
                                                                 object.getAgo_status(), 
                                                                 fileRepo.fileByQ_id(e.getId()),
                                                                 voteStatusService.questionVoteStatus(e.getId()));
        return ResponseEntity.ok().body(response);
    }

    @Transactional
    @PatchMapping("/upvote/{q_id}")
    public ResponseEntity<?> upVoteQuestion(@PathVariable Long q_id){
        Questionnaire questionnaire = questionnaireRepo.findAllById(q_id);
        if(questionCollectionInfoRepo.existsUserInRecord(userSessions.getUserId(), q_id) == BigInteger.ONE){
            if(questionCollectionInfoRepo.findUserVoteStatus(userSessions.getUserId(), q_id) == EVote.UP_VOTE){
                questionnaire.setVote(questionnaire.getVote() - 1);
                questionCollectionInfoRepo.deleteUserVote(userSessions.getUserId(), q_id);
                return ResponseEntity.ok("1");
            }else{
                questionnaire.setVote(questionnaire.getVote() + 2);
                questionCollectionInfoRepo.deleteUserVote(userSessions.getUserId(), q_id);
                QuestionCollectionInfo questionCollectionInfo = new QuestionCollectionInfo(userSessions.getUserId(), 
                                                                                           q_id, 
                                                                                           true, 
                                                                                           null,
                                                                                           EVote.UP_VOTE);
                questionCollectionInfoRepo.save(questionCollectionInfo);
                return ResponseEntity.ok("2");
            }
        }
        questionnaire.setVote(questionnaire.getVote() + 1);
        QuestionCollectionInfo questionCollectionInfo = new QuestionCollectionInfo(userSessions.getUserId(), 
                                                                                   q_id, 
                                                                             true, 
                                                                          null,
                                                                                   EVote.UP_VOTE);
        questionCollectionInfoRepo.save(questionCollectionInfo);
        return ResponseEntity.ok("3");
    }

    @Transactional
    @PatchMapping("/downvote/{q_id}")
    public ResponseEntity<?> downVoteQuestion(@PathVariable Long q_id){
        Questionnaire questionnaire = questionnaireRepo.findAllById(q_id);
        if(questionCollectionInfoRepo.existsUserInRecord(userSessions.getUserId(), q_id) == BigInteger.ONE){
            if(questionCollectionInfoRepo.findUserVoteStatus(userSessions.getUserId(), q_id) == EVote.DOWN_VOTE){
                questionnaire.setVote(questionnaire.getVote() + 1);
                questionCollectionInfoRepo.deleteUserVote(userSessions.getUserId(), q_id);
                return ResponseEntity.ok("1");
            }else{
                questionnaire.setVote(questionnaire.getVote() - 2);
                questionCollectionInfoRepo.deleteUserVote(userSessions.getUserId(), q_id);
                QuestionCollectionInfo questionCollectionInfo = new QuestionCollectionInfo(userSessions.getUserId(), 
                                                                                           q_id, 
                                                                                           true, 
                                                                                           null,
                                                                                           EVote.DOWN_VOTE);
                questionCollectionInfoRepo.save(questionCollectionInfo);
                return ResponseEntity.ok("2");
            }
        }
        questionnaire.setVote(questionnaire.getVote() - 1);
        QuestionCollectionInfo questionCollectionInfo = new QuestionCollectionInfo(userSessions.getUserId(), 
                                                                                   q_id, 
                                                                             true, 
                                                                          null,
                                                                                   EVote.DOWN_VOTE);
        questionCollectionInfoRepo.save(questionCollectionInfo);
        return ResponseEntity.ok("3");
    }
//--------------------------------------------------
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    protected class PostInfoResponse{
       private Long question_id;
       private Long community_id;
       private Long author_id;
       private byte[] community_image;
       private String community_name;
       private String author_name;
       private String question;
       private String description;
       private Integer vote;
       private Integer comment;
       private Integer ago_number;
       private String ago_string;
       private List<byte[]> image;
       private EVote vote_status;
    }
}
