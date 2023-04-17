package com.como.KHForum.controller.generalController;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.como.KHForum.entity.AppUser;
import com.como.KHForum.payload.request.generalRequest.EditProfileRequest;
import com.como.KHForum.payload.request.generalRequest.UpdateProfileRequest;
import com.como.KHForum.payload.response.successResponse.SuccessMessageResponse;
import com.como.KHForum.repository.AppUserRepo;
import com.como.KHForum.repository.UserRepo;
import com.como.KHForum.webconfig.session.UserSessions;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/all/profile")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('ORATOR') or hasRole('USER')")
public class ProfileController {

    @Autowired UserRepo userRepo;
    @Autowired AppUserRepo appUserRepo;
    @Autowired UserSessions userSessions;

    @GetMapping
    public ResponseEntity<?> profile(){
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
                                   request.getGender(), 
                                   request.getDob(), 
                                   request.getCountry_code(), 
                                   request.getArea_number(), 
                                   userSessions.getUserId());
        appUserRepo.save(user);
        return ResponseEntity.ok().body(new SuccessMessageResponse("Your informations is updated!", true));
    }
}
