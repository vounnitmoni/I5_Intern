package com.como.KHForum.controller.generalController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.como.KHForum.payload.JoinCommunityRequest;
import com.como.KHForum.repository.CommunityRepo;
import com.como.KHForum.repository.UserRepo;
import com.como.KHForum.webconfig.service.UserDetailsImpl;

@RestController("/community")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('ORATOR') or hasRole('USER')")
public class CommunityController {
    @Autowired UserRepo userRepo;
    @Autowired CommunityRepo communityRepo;

    @PostMapping("/join/{communityId}")
    public ResponseEntity<?> joinCommunity(@RequestParam Long communityId, @RequestBody JoinCommunityRequest request){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl user = (UserDetailsImpl) auth.getPrincipal();
        final Long id = user.getId();

        return ResponseEntity.ok(null);
    }
}
