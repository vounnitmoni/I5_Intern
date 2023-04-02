package com.como.KHForum.controller.oratorController;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.como.KHForum.entity.Orator;
import com.como.KHForum.entity.User;
import com.como.KHForum.payload.response.successResponse.SuccessMessageResponse;
import com.como.KHForum.repository.CommunityRepo;
import com.como.KHForum.repository.OratorRepo;
import com.como.KHForum.repository.UserRepo;
import com.como.KHForum.webconfig.service.UserDetailsImpl;
import com.como.KHForum.webconfig.session.UserSessions;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(path = "/api/orator")
@PreAuthorize("hasRole('ORATOR')")
public class OratorProfileController {

    @Autowired UserRepo userRepo;
    @Autowired OratorRepo oratorRepo;
    @Autowired CommunityRepo communityRepo;
    @Autowired UserSessions userSessions;

// Predefined conditions and some reusable functions

//------------------------------------------------


//Progress Week 5, March 31, 2023
    @GetMapping("/profile")
    public ResponseEntity<?> profile(){
        Long id = userSessions.getCurrentUser().getId();
        Optional<User> user = userRepo.findById(id);
        return ResponseEntity.ok(user);
    }
    //Progress Week 5, March 31, 2023
    @GetMapping("/community")
    public ResponseEntity<?> community(){
        Long id = userSessions.getCurrentUser().getId();
        List<String> community = communityRepo.findNameByCreatorId(id);
        if(community == null){
            return ResponseEntity.ok(new SuccessMessageResponse("No community", false));
        }
        return ResponseEntity.ok(community);
    }

    
}
