package com.como.KHForum.controller.generalController;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.como.KHForum.entity.Questionnaire;
import com.como.KHForum.entity.enums.EVote;
import com.como.KHForum.payload.response.generalResponse.RandomQuestionResponse;
import com.como.KHForum.repository.AnswerCollectionInfoRepo;
import com.como.KHForum.repository.AnswerRepo;
import com.como.KHForum.repository.CommentRepo;
import com.como.KHForum.repository.CommunityRepo;
import com.como.KHForum.repository.FileRepo;
import com.como.KHForum.repository.FollowerRepo;
import com.como.KHForum.repository.QuestionCollectionInfoRepo;
import com.como.KHForum.repository.QuestionnaireRepo;
import com.como.KHForum.repository.UserCategoryRepo;
import com.como.KHForum.repository.UserCommunityRepo;
import com.como.KHForum.repository.UserRepo;
import com.como.KHForum.service.ServiceUtils.Utility;
import com.como.KHForum.service.ServiceUtils.VoteStatusService;
import com.como.KHForum.service.ServiceUtils.Utility.DateTimeObject;
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
    @Autowired FileRepo fileRepo;
    @Autowired CommunityRepo communityRepo;
    @Autowired Utility serviceUtils;
    @Autowired UserRepo userRepo;
    @Autowired UserCommunityRepo userCommunityRepo;
    @Autowired UserCategoryRepo userCategoryRepo;
    @Autowired FollowerRepo followerRepo;
    @Autowired AnswerCollectionInfoRepo answerCollectionInfoRepo;
    @Autowired VoteStatusService voteStatusService;
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
        private Integer vote;
        private Integer comment;
        private LocalDateTime postStmp;
        private Integer ago;
        private List<byte[]> image;
        private byte[] profile;
        private EVote vote_status;
    }

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
//--------------------------------------------------------------------------------------------------
    
    @PostMapping("/user/{user_id}")
    public ResponseEntity<?> userAllPost(@PathVariable Long user_id, @RequestBody Set<Long> prev_QId){
        Set<PostInfoResponse> response_set = new LinkedHashSet<>();
        if(prev_QId.size() == 0){
            questionnaireRepo.userQuestionSet(user_id).forEach(e -> {
                Integer count_answer = answerRepo.countAnswerByQ_Id(e.getId()) + commentRepo.countCommentsByAnswer_Id(answerRepo.listAnswerIdByQ_Id(e.getId()));
                DateTimeObject object = serviceUtils.DateTimeConverter(questionnaireRepo.castQStmpToDateTime(e.getId()));

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
                response_set.add(response);
            });
            return ResponseEntity.ok(response_set);
        }
        questionnaireRepo.userQuestionSetNotInPrev(user_id, prev_QId).forEach(e -> {
            Integer count_answer = answerRepo.countAnswerByQ_Id(e.getId()) + commentRepo.countCommentsByAnswer_Id(answerRepo.listAnswerIdByQ_Id(e.getId()));
            DateTimeObject object = serviceUtils.DateTimeConverter(questionnaireRepo.castQStmpToDateTime(e.getId()));
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
            response_set.add(response);
        });
        return ResponseEntity.ok(response_set);       
    }   

    @PostMapping("/com/{id}")
    public ResponseEntity<?> communityAllPost(@PathVariable Long id, @RequestBody Set<Long> prev_QId){
        Set<PostInfoResponse> response_set = new LinkedHashSet<>();
        if(prev_QId.size() == 0){
            questionnaireRepo.communityQuestionSet(id).forEach(e -> {
                Integer count_answer = answerRepo.countAnswerByQ_Id(e.getId()) + commentRepo.countCommentsByAnswer_Id(answerRepo.listAnswerIdByQ_Id(e.getId()));
                DateTimeObject object = serviceUtils.DateTimeConverter(questionnaireRepo.castQStmpToDateTime(e.getId()));
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
                response_set.add(response);
            });
            return ResponseEntity.ok(response_set);
        }
        questionnaireRepo.communityQuestionSetNotInPrev(id, prev_QId).forEach(e -> {
            Integer count_answer = answerRepo.countAnswerByQ_Id(e.getId()) + commentRepo.countCommentsByAnswer_Id(answerRepo.listAnswerIdByQ_Id(e.getId()));
            DateTimeObject object = serviceUtils.DateTimeConverter(questionnaireRepo.castQStmpToDateTime(e.getId()));
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
            response_set.add(response);
        });
        return ResponseEntity.ok(response_set);       
    } 
    // @PostMapping("/user/{user_id}")
    // public ResponseEntity<?> userPost(@RequestBody FlagRequest request, @PathVariable Long user_id){
    //     Set<UserInfoResponse> userInfoResponses = new HashSet<>();
    //     Integer q;
    //     Long last_id;
    //     if(request.getFlag() == 0){
    //         q= 0;
    //         last_id = q.longValue();
    //     }else{
    //         q = 20*request.getFlag();
    //         last_id = questionnaireRepo.findLastIdOfLastTwentyByUserId(user_id, q);
    //     }
    //     return ResponseEntity.ok().body(userInfoResponses);
    // }
    @PostMapping("/feed")
    public ResponseEntity<?> feedPost(@RequestBody Set<Long> prevQ_id){
        Set<PostInfoResponse> response_set = new HashSet<>();
        if(prevQ_id.size() == 0){
            Set<Questionnaire> randomCommunityQuestions = questionnaireRepo.randQuestionnairesByCommunity(userCommunityRepo.randomCommunityId(userSessions.getUserId()));
            Set<Questionnaire> randomFolloweeQuestions = questionnaireRepo.randQuestionnairesByFollowee(followerRepo.randomFollowee_id(userSessions.getUserId()));
            Set<Questionnaire> randomCategoryQuestions = questionnaireRepo.randomQuestionnairesByCategories(userCategoryRepo.randomCategories(userSessions.getUserId()));
            Set<Questionnaire> post_questionnaires = new HashSet<>();
            Stream.of(randomCommunityQuestions,
                      randomCategoryQuestions, 
                      randomFolloweeQuestions)
                      .forEach(post_questionnaires::addAll);
            post_questionnaires.forEach(e ->{
                Integer count_answer = answerRepo.countAnswerByQ_Id(e.getId()) + commentRepo.countCommentsByAnswer_Id(answerRepo.listAnswerIdByQ_Id(e.getId()));
                DateTimeObject object = serviceUtils.DateTimeConverter(questionnaireRepo.castQStmpToDateTime(e.getId()));
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
                response_set.add(response);
            });
        }
        Set<Questionnaire> randomCommunityQuestions = questionnaireRepo.randQuestionnairesByCommunity(userCommunityRepo.randomCommunityId(userSessions.getUserId()));
        Set<Questionnaire> randomFolloweeQuestions = questionnaireRepo.randQuestionnairesByFollowee(followerRepo.randomFollowee_id(userSessions.getUserId()));
        Set<Questionnaire> randomCategoryQuestions = questionnaireRepo.randomQuestionnairesByCategories(userCategoryRepo.randomCategories(userSessions.getUserId()));
        Set<Questionnaire> post_questionnaires = new HashSet<>();
        Stream.of(randomCommunityQuestions,
                  randomCategoryQuestions, 
                  randomFolloweeQuestions)
                    .forEach(post_questionnaires::addAll);
        post_questionnaires.forEach(e ->{
            Integer count_answer = answerRepo.countAnswerByQ_Id(e.getId()) + commentRepo.countCommentsByAnswer_Id(answerRepo.listAnswerIdByQ_Id(e.getId()));
            DateTimeObject object = serviceUtils.DateTimeConverter(questionnaireRepo.castQStmpToDateTime(e.getId()));
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
            response_set.add(response);
        });
        return ResponseEntity.ok(response_set);
    }
}
