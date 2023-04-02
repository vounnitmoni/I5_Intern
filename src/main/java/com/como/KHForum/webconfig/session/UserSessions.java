package com.como.KHForum.webconfig.session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.como.KHForum.entity.User;
import com.como.KHForum.repository.UserRepo;
import com.como.KHForum.webconfig.service.UserDetailsImpl;

@Component
@Scope(scopeName = "session", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class UserSessions {
    @Autowired UserRepo userRepo;
    private User user;
    public User getCurrentUser(){
        if(user == null){
            user = userRepo.findUserByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        }
        return user;
    }
    public Long getUserId(){
        Long id = getCurrentUser().getId();
        return id;
    }
    public String getUsername(){
        String username = user.getUsername();
        return username;
    }
}
