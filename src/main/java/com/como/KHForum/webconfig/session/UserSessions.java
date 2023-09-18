package com.como.KHForum.webconfig.session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.como.KHForum.repository.AppUserRepo;
import com.como.KHForum.webconfig.service.UserDetailsImpl;

@Component
@Scope(scopeName = "prototype", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class UserSessions {
    
    @Autowired AppUserRepo appUserRepo;
    
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    UserDetailsImpl authUser = (UserDetailsImpl) auth.getPrincipal();

    public Long getUserId(){
        Long id = authUser.getId();
        return id;
    }
        
    public String getUsername(){
        String username = authUser.getUsername();
        return username;
    }

    public Long getAppUserId(){
        Long id = appUserRepo.appUserID(getUserId());
        return id;
    }
}
