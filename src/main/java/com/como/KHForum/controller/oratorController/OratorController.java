package com.como.KHForum.controller.oratorController;

import java.time.LocalDate;
import java.time.LocalDateTime;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.como.KHForum.entity.Community;
import com.como.KHForum.payload.request.oratorRequest.CreateCommunityRequest;
import com.como.KHForum.payload.response.successResponse.SuccessMessageResponse;
import com.como.KHForum.repository.CommunityRepo;
import com.como.KHForum.repository.UserRepo;
import com.como.KHForum.webconfig.service.UserDetailsImpl;
import com.como.KHForum.webconfig.session.UserSessions;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(path = "/api/orator")
@PreAuthorize("hasRole('ORATOR')")
public class OratorController {
    @Autowired CommunityRepo communityRepo;
    @Autowired UserRepo userRepo;
    @Autowired UserSessions userSessions;
    
// Predefined conditions and some reusable functions
    // private UserDetailsImpl currentAuthenticatedInfo (){
    //     Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    //     UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
    //     return userDetails;
    // }
    // private Boolean regexChecks (){
    //     return true;
    // }
    // String username = currentAuthenticatedInfo().getUsername();
//------------------------------------------------
    @PostMapping("community/create")
    public ResponseEntity<?> createCommunity (@Valid @RequestBody CreateCommunityRequest request){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl user = (UserDetailsImpl) auth.getPrincipal();
        final Long id = user.getId();
        Community community = new Community(request.getName(), LocalDateTime.now(), 0, id, false);
        communityRepo.save(community);
        return ResponseEntity.ok(new SuccessMessageResponse(request.getName() + " community has been created!", true));
    }
    
    @GetMapping("test1")
    public ResponseEntity<?> test(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl user = (UserDetailsImpl) auth.getPrincipal();
        return ResponseEntity.ok(user.getId());
    }
}
