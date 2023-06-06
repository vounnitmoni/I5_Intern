package com.como.KHForum.controller.generalController;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.como.KHForum.entity.AppUser;
import com.como.KHForum.entity.File;
import com.como.KHForum.entity.User;
import com.como.KHForum.entity.enums.EFileStatus;
import com.como.KHForum.payload.request.generalRequest.EditProfileRequest;
import com.como.KHForum.payload.request.generalRequest.UpdateProfileRequest;
import com.como.KHForum.payload.response.successResponse.SuccessMessageResponse;
import com.como.KHForum.repository.AppUserRepo;
import com.como.KHForum.repository.FileRepo;
import com.como.KHForum.repository.UserRepo;
import com.como.KHForum.service.FollowService.FollowService;
import com.como.KHForum.webconfig.session.UserSessions;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@RestController
@RequestMapping("api/all/profile")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('ORATOR') or hasRole('USER')")
public class ProfileController {

    @Autowired UserRepo userRepo;
    @Autowired AppUserRepo appUserRepo;
    @Autowired UserSessions userSessions;
    @Autowired FileRepo fileRepo;
    @Autowired FollowService followService;

    @GetMapping
    public ResponseEntity<?> profile(){
        System.out.println("++++++++++++++++" + userSessions.getUserId());
        Optional<AppUser> appUserInfo = appUserRepo.findAppUserByAuthId(userSessions.getUserId());
        return ResponseEntity.ok(appUserInfo);
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editProfile(@Valid @RequestBody EditProfileRequest request){
        Optional<AppUser> appUserInfo = appUserRepo.findAppUserByAuthId(userSessions.getUserId());
        appUserInfo.map((user)->{
            try {
                if(request.getFirstname() == user.getFirstname() || request.getFirstname() == "" || request.getFirstname() == null){}else{user.setFirstname(request.getFirstname());}
                if(request.getLastname() == user.getLastname() || request.getLastname() == "" || request.getLastname() == null){}else{user.setLastname(request.getLastname());}
                if(request.getDob() == user.getDob() || request.getDob() == null){}else{user.setDob(request.getDob());}
                if(request.getNumber() == user.getArea_number() || user.getArea_number() == null){}else{user.setArea_number(request.getNumber());}
            } catch (Exception e) {}
            return appUserRepo.save(user);
        });
        return ResponseEntity.ok(new SuccessMessageResponse("Your information was successfully updated!", true));
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateProfile(@Valid @RequestBody UpdateProfileRequest request){
        AppUser user = new AppUser(request.getFirstname(), 
                                   request.getLastname(),
                                   request.getBio(), 
                                   request.getGender(), 
                                   request.getDob(), 
                                   request.getCountry_code(), 
                                   request.getArea_number(), 
                                   userSessions.getUserId());
        File profile = new File(userSessions.getUserId(), null, null, EFileStatus.PROFILE, request.getProfile());
        File cover = new File(userSessions.getUserId(), null, null, EFileStatus.COVER, request.getCover());
        appUserRepo.save(user);
        fileRepo.save(profile);
        fileRepo.save(cover);
        return ResponseEntity.ok().body(new SuccessMessageResponse("Your informations is updated!", true));
    }

    @GetMapping("/info")
    public ResponseEntity<?> drawerInfo(){
        Long id = userSessions.getUserId();
        AppUser appUser = appUserRepo.appUserInfoByAuthId(id);
        User user = userRepo.userInfoById(id);
        String name_shortcut = String.valueOf(appUser.getFirstname().charAt(0)) + String.valueOf(appUser.getLastname().charAt(0));
        ShortInfoResponse response = new ShortInfoResponse(appUser.getFirstname(), 
                                                           appUser.getLastname(),
                                                           user.getUsername(),
                                                           user.getEmail(),
                                                           appUser.getArea_number(),
                                                           appUser.getBio(),
                                                           name_shortcut, 
                                                           followService.FollowerAmount(id), 
                                                           followService.FollowingAmount(id), 
                                                           fileRepo.userProfilePic(id).getPhoto(),
                                                           fileRepo.userCoverPic(id).getPhoto());
        return ResponseEntity.ok().body(response);
    }

    //----------------------------------------------------------------------------
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    protected class ShortInfoResponse{
        private String firstname;
        private String lastname;
        private String username;
        private String email;
        private String phone_number;
        private String bio;
        private String name_shortcut;
        private Integer follower;
        private Integer followee;
        private byte[] profile_pic;
        private byte[] cover_pic;
    }
    //----------------------------------------------------------------------------
}
