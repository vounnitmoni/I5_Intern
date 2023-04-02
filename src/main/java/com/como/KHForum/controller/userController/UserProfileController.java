package com.como.KHForum.controller.userController;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.como.KHForum.entity.User;
import com.como.KHForum.repository.AppUserRepo;
import com.como.KHForum.repository.CommunityRepo;
import com.como.KHForum.repository.UserRepo;
import com.como.KHForum.webconfig.jwt.Utils;
import com.como.KHForum.webconfig.session.UserSessions;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(path = "/api/user"     )
@PreAuthorize("hasRole('USER')")
public class UserProfileController {

    @Autowired UserRepo userRepo;
    @Autowired AppUserRepo appUserRepo;
    @Autowired CommunityRepo communityRepo;
    @Autowired Utils utils;
    @Autowired UserSessions userSessions;

// Predefined conditions and some reusable functions
//     private Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//     private String name = utils.getUserNameFromJwtToken(null)
//     private Long user_id;
//     String username;

//     public void set(String username, Long user_id){
//         if(auth != null){
//             username = currentAuthenticatedInfo().getUsername();
//             user_id = currentAuthenticatedInfo().getId();
//         }
//         this.user_id = user_id;
//         this.username = username;
//     }

//     private UserDetailsImpl currentAuthenticatedInfo (){
//         if(auth != null){
//             UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
//             return userDetails;
//         }
//         return null;
//     }
// //     Object sc = request.getSession().getAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY);
// // if (!(sc instanceof SecurityContext)) {
// //     // Something strange is happening
// // }
// // Authentication authentication = ((SecurityContext) sc).getAuthentication();
//     // Object sc = 
//     private Boolean regexChecks (){
//         return true;
//     }
    
//------------------------------------------------
    //Progress Week 5, March 31, 2023
    @GetMapping("/profile")
    public ResponseEntity<?> profile(){
        Long id = userSessions.getUserId();
        Optional<User> user = userRepo.findById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/profile/info")
    public ResponseEntity<?> addProfileInfo(){
        Long id = userSessions.getUserId();
        return ResponseEntity.ok(null);
    }

    @GetMapping("/community")
    public ResponseEntity<?> community(){
        return ResponseEntity.ok(null);
    }
}
