package com.como.KHForum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.como.KHForum.repository.AppUserRepo;
import com.como.KHForum.webconfig.session.UserSessions;

@Service
public class AppUserService {
    @Autowired AppUserRepo appUserRepo;
    @Autowired UserSessions userSessions;

    public Long appUserID(){
        final Long id = appUserRepo.appUserID(userSessions.getUserId());
        return id;
    }
}
