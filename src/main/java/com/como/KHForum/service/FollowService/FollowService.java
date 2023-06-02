package com.como.KHForum.service.FollowService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.como.KHForum.repository.FollowerRepo;

@Service
public class FollowService {
    @Autowired FollowerRepo followerRepo;

    public Integer FollowingAmount(Long userId){
        final Integer amount = followerRepo.followingAmount(userId);
        return amount;
    }

    public Integer FollowerAmount(Long userId){
        final Integer amount = followerRepo.followerAmount(userId);
        return amount;
    } 
}
