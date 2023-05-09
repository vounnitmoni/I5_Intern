package com.como.KHForum.service.PostCardService;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.como.KHForum.entity.Questionnaire;
import com.como.KHForum.payload.response.generalResponse.QuestionCardResponse;
import com.como.KHForum.repository.AnswerRepo;
import com.como.KHForum.repository.CommentRepo;
import com.como.KHForum.repository.CommunityRepo;
import com.como.KHForum.repository.FollowerRepo;
import com.como.KHForum.repository.QuestionnaireRepo;
import com.como.KHForum.repository.UserCategoryRepo;
import com.como.KHForum.repository.UserCommunityRepo;
import com.como.KHForum.webconfig.session.UserSessions;

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

    public Set<Questionnaire> questionCards(){
        Set<Long> community_id = userCommunityRepo.randomCommunityId(userSessions.getUserId());
        Set<Long> followee_id = followerRepo.randomFollowee_id(userSessions.getUserId());
        Set<Long> category_id = userCategoryRepo.randomCategories(userSessions.getUserId());

        Set<Questionnaire> randomCommunityQuestions = questionnaireRepo.randQuestionnairesByCommunity(community_id);
        Set<Questionnaire> randomFolloweeQuestions = questionnaireRepo.randQuestionnairesByFollowee(followee_id);
        Set<Questionnaire> randomCategoryQuestions = questionnaireRepo.randomQuestionnairesByCategories(category_id);

        Set<Questionnaire> post_questionnaires = new HashSet<>();
        Stream.of(randomCommunityQuestions,randomCategoryQuestions, randomFolloweeQuestions).forEach(post_questionnaires::addAll);

        return post_questionnaires;
    }

    public Set<QuestionCardResponse> customQuestionCard(){
        Set<QuestionCardResponse> responses = new HashSet<>();
        questionCards().forEach(e ->{
            Integer count_answer = answerRepo.countAnswerByQ_Id(e.getId()) + commentRepo.countCommentsByAnswer_Id(answerRepo.listAnswerIdByQ_Id(e.getId()));
            QuestionCardResponse questionCardResponse = new QuestionCardResponse(e.getQuestion(), e.getBody(), e.getCreate_stmp().toString(), communityRepo.findCommunityNameById(e.getCommunity_id()), count_answer, e.getVote());
            responses.add(questionCardResponse);
        });
        return responses;
    }

    public Set<QuestionCardResponse> communityPost(){
        Set<QuestionCardResponse> responses = new HashSet<>();
        //flag!
        QuestionCardResponse qCardResponse = new QuestionCardResponse(null, null, null, null, null, null);
        responses.add(qCardResponse);
        return responses;
    }
}
