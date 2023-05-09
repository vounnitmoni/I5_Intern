package com.como.KHForum.controller.generalController;

import java.math.BigInteger;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.como.KHForum.entity.Community;
import com.como.KHForum.entity.CommunityCategory;
import com.como.KHForum.entity.UserCommunity;
import com.como.KHForum.entity.enums.EIsa;
import com.como.KHForum.payload.request.generalRequest.CommunityRequest;
import com.como.KHForum.payload.request.generalRequest.CreateCommunityRequest;
import com.como.KHForum.payload.response.CommunityResponse;
import com.como.KHForum.repository.CategoryRepo;
import com.como.KHForum.repository.CommunityCategoryRepo;
import com.como.KHForum.repository.CommunityRepo;
import com.como.KHForum.repository.UserCommunityRepo;
import com.como.KHForum.repository.UserRepo;
import com.como.KHForum.webconfig.session.UserSessions;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@RestController
@RequestMapping("api/all/community")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('ORATOR') or hasRole('USER')")
public class CommunityController {
    @Autowired UserRepo userRepo;
    @Autowired CommunityRepo communityRepo;
    @Autowired UserSessions userSessions;
    @Autowired CommunityCategoryRepo communityCategoryRepo;
    @Autowired CategoryRepo categoryRepo;
    @Autowired UserCommunityRepo userCommunityRepo;
//predefine------------------------------------------------------------------------------------------
    @Getter
    @Setter
    protected class IsJoin{
        private Boolean isJoin;
        IsJoin(){}
        IsJoin(Boolean isJoin){
            this.isJoin = isJoin;
        }
    }
    @Getter
    @Setter
    @NoArgsConstructor
    protected class CommunityData extends IsJoin{
        private UserCommunity userCommunity;
        CommunityData(Boolean isJoin, UserCommunity userCommunity){
            super(isJoin);
            this.userCommunity = userCommunity;
        }
    }
//---------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------
    @PostMapping("/create")
    public ResponseEntity<?> createCommunity(@RequestBody CreateCommunityRequest request){
        final Long id = userSessions.getUserId();
        Community community = new Community(request.getName(), 
                                            LocalDateTime.now(), 
                                            0, 
                                            userSessions.getUserId(), 
                                            false);       
        Thread asynOpt = new Thread(()->{
            try {
                for(String i : request.getCategory()){
                    CommunityCategory communityCategory = new CommunityCategory(community.getId(), categoryRepo.findCategoryIdByName(i));
                    communityCategoryRepo.save(communityCategory);
                }
                UserCommunity userCommunity = new UserCommunity(id, 
                                                                community.getId(), 
                                                                LocalTime.now(), 
                                                                LocalDate.now(), 
                                                                true, 
                                                                EIsa.ISA_ADMIN);
                userCommunityRepo.save(userCommunity);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
        if(communityRepo.existsByName(request.getName())){
            return ResponseEntity.badRequest().body("Community name was already exist!");
        }else{
            communityRepo.saveAndFlush(community);
            if(community != null){
                asynOpt.start();
            }
        }
        return ResponseEntity.ok(community);
    }
    //-------------------------------------------------------------------------------------------------------
    //user joins community
    @GetMapping("/{id}")
    public ResponseEntity<?> community(@PathVariable Long id){
        return ResponseEntity.ok(new CommunityData(null, null));
    }

    @PostMapping("/{id}/join")
    public ResponseEntity<?> joinCommunity(@PathVariable Long id){
        //need a boolean isJoined!
        UserCommunity userCommunity = new UserCommunity(userSessions.getUserId(), 
                                                        id, 
                                                        LocalTime.now(), 
                                                        LocalDate.now(), 
                                                        true, 
                                                        EIsa.ISA_MEMBER);
        if(userCommunityRepo.isExistsInCommunity(id, userSessions.getUserId()) == BigInteger.ZERO){
            userCommunityRepo.save(userCommunity);
        }else{
            return ResponseEntity.ok(new IsJoin(true));
        }
        return ResponseEntity.ok(userCommunity);
    }
    //User Community List
    @GetMapping("/communities")
    public ResponseEntity<?> userCommunity(){
        List<Community> userCommunities = communityRepo.findUserCommunityList(userSessions.getUserId());
        Set<CommunityResponse> user_commu = new HashSet<>();
        userCommunities.forEach(e ->{
            CommunityResponse cr = new CommunityResponse(e.getId(), e.getName());
            user_commu.add(cr);
        });
        return ResponseEntity.ok(user_commu);
    }
}
