package com.como.KHForum.service.ServiceUtils;

import java.math.BigInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.como.KHForum.entity.enums.EVote;
import com.como.KHForum.repository.AnswerCollectionInfoRepo;
import com.como.KHForum.repository.QuestionCollectionInfoRepo;
import com.como.KHForum.webconfig.session.UserSessions;

@Service
public class VoteStatusService {
    @Autowired UserSessions userSessions;
    @Autowired AnswerCollectionInfoRepo answerCollectionInfoRepo;
    @Autowired QuestionCollectionInfoRepo questionCollectionInfoRepo;
    
    public EVote questionVoteStatus(Long q_id){
        EVote vote_status = EVote.NOT_VOTE;
        if(questionCollectionInfoRepo.existsUserInRecord(userSessions.getUserId(), q_id) == BigInteger.ONE){
            vote_status = questionCollectionInfoRepo.findUserVoteStatus(userSessions.getUserId(), q_id);
        }
        return vote_status;
    }

    public EVote answerVoteStatus(Long a_id){
        EVote vote_status = EVote.NOT_VOTE;
        return vote_status;
    }
}
