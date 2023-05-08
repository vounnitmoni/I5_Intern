package com.como.KHForum.service.PostCardService;

import java.math.BigInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.como.KHForum.entity.Seen;
import com.como.KHForum.repository.SeenRepo;
import com.como.KHForum.webconfig.session.UserSessions;

@Service
public class SeenService {

    @Autowired UserSessions userSessions;
    @Autowired SeenRepo seenRepo;

    public String inPutSeen(Long q_id){
        Seen seen = new Seen(userSessions.getUserId(), q_id, true);
        seenRepo.save(seen);
        return "success";
    }

    public Boolean isSean(Long q_id){
        Boolean isSean = seenRepo.findSeen(userSessions.getUserId(), q_id);
        return isSean;
    }

    public Boolean isNull(Long q_id){
        if(seenRepo.ifSeenExists(userSessions.getUserId(), q_id) == BigInteger.ZERO){
            return false;
        }
        return true;
    }
}
