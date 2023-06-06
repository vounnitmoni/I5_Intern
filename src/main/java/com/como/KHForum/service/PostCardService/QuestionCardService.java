package com.como.KHForum.service.PostCardService;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.como.KHForum.entity.Questionnaire;
import com.como.KHForum.payload.response.generalResponse.QuestionCardResponse;
import com.como.KHForum.payload.response.generalResponse.RandomQuestionResponse;
import com.como.KHForum.repository.AnswerRepo;
import com.como.KHForum.repository.AppUserRepo;
import com.como.KHForum.repository.CommentRepo;
import com.como.KHForum.repository.CommunityRepo;
import com.como.KHForum.repository.FileRepo;
import com.como.KHForum.repository.FollowerRepo;
import com.como.KHForum.repository.QuestionnaireRepo;
import com.como.KHForum.repository.UserCategoryRepo;
import com.como.KHForum.repository.UserCommunityRepo;
import com.como.KHForum.service.ServiceUtils.Utility;
import com.como.KHForum.webconfig.session.UserSessions;

import jakarta.validation.Valid;

@Service
public class QuestionCardService {
    @Autowired UserSessions userSessions;
    @Autowired QuestionnaireRepo questionnaireRepo;
    @Autowired AnswerRepo answerRepo;
    @Autowired FollowerRepo followerRepo;
    @Autowired UserCommunityRepo userCommunityRepo;
    @Autowired UserCategoryRepo userCategoryRepo;
    @Autowired CommunityRepo communityRepo;
    @Autowired CommentRepo commentRepo;
    @Autowired AppUserRepo appUserRepo;
    @Autowired FileRepo fileRepo;
    @Autowired Utility utility;

    public Set<Questionnaire> questionCards(){

        Set<Questionnaire> randomCommunityQuestions = questionnaireRepo.randQuestionnairesByCommunity(userCommunityRepo.randomCommunityId(userSessions.getUserId()));
        Set<Questionnaire> randomFolloweeQuestions = questionnaireRepo.randQuestionnairesByFollowee(followerRepo.randomFollowee_id(userSessions.getUserId()));
        Set<Questionnaire> randomCategoryQuestions = questionnaireRepo.randomQuestionnairesByCategories(userCategoryRepo.randomCategories(userSessions.getUserId()));

        Set<Questionnaire> post_questionnaires = new HashSet<>();
        Stream.of(randomCommunityQuestions,
                  randomCategoryQuestions, 
                  randomFolloweeQuestions)
                  .forEach(post_questionnaires::addAll);

        return post_questionnaires;
    }

    public @Valid Set<RandomQuestionResponse> customQuestionCard(){
        Set<RandomQuestionResponse> responses = new HashSet<>();
        questionCards().forEach(e ->{
            Integer count_answer = answerRepo.countAnswerByQ_Id(e.getId()) + commentRepo.countCommentsByAnswer_Id(answerRepo.listAnswerIdByQ_Id(e.getId()));
            RandomQuestionResponse questionResponse = new RandomQuestionResponse(e.getAuthor_id(), 
                                                                                 e.getId(), 
                                                                                 e.getCommunity_id(), 
                                                                                 appUserRepo.userNameByAccId(e.getAuthor_id()), 
                                                                                 e.getQuestion(), 
                                                                                 e.getBody(), 
                                                                                 communityRepo.findCommunityNameById(e.getCommunity_id()), 
                                                                                 e.getVote(), 
                                                                                 count_answer, 
                                                                                 questionnaireRepo.castQStmpToDateTime(e.getId()), 
                                                                                 utility.DateTimeConverter(questionnaireRepo.castQStmpToDateTime(e.getId())), 
                                                                                 fileRepo.fileByQ_id(e.getId()), 
                                                                                 null);
            responses.add(questionResponse);
        });
        return responses;
    }

    public Set<QuestionCardResponse> communityPost(Long community_id, Integer flag){
        Integer q;
        Long last_id;
        if(flag == 0){
            q= 0;
            last_id = q.longValue();
        }else{
            q = 20*flag;
            last_id = questionnaireRepo.findLastIdOfLastTwenty(community_id,q);
        }
        Set<QuestionCardResponse> responses = new HashSet<>();

        questionnaireRepo.findQuestion_IdByC_id(community_id, last_id).forEach(e ->{
            Integer count_answer = answerRepo.countAnswerByQ_Id(e.getId()) + commentRepo.countCommentsByAnswer_Id(answerRepo.listAnswerIdByQ_Id(e.getId()));
            QuestionCardResponse qCardResponse = new QuestionCardResponse(e.getId(), e.getQuestion(), e.getBody(), e.getCreate_stmp(), appUserRepo.userNameByAccId(e.getAuthor_id()), count_answer, e.getVote(), fileRepo.fileByQ_id(e.getId()));
            responses.add(qCardResponse);
        });   
        return responses;
    }
}
