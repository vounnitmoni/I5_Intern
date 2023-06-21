package com.como.KHForum.controller.generalController;

import java.math.BigInteger;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.como.KHForum.entity.Community;
import com.como.KHForum.entity.CommunityCategory;
import com.como.KHForum.entity.File;
import com.como.KHForum.entity.UserCommunity;
import com.como.KHForum.entity.enums.EFileStatus;
import com.como.KHForum.entity.enums.EIsa;
import com.como.KHForum.payload.request.generalRequest.CreateCommunityRequest;
import com.como.KHForum.payload.response.CommunityResponse;
import com.como.KHForum.payload.response.generalResponse.RecommedCommunityResponse;
import com.como.KHForum.payload.response.successResponse.SuccessMessageResponse;
import com.como.KHForum.repository.CategoryRepo;
import com.como.KHForum.repository.CommunityCategoryRepo;
import com.como.KHForum.repository.CommunityRepo;
import com.como.KHForum.repository.FileRepo;
import com.como.KHForum.repository.UserCommunityRepo;
import com.como.KHForum.repository.UserRepo;
import com.como.KHForum.webconfig.session.UserSessions;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.annotation.Nullable;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
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
    @Autowired FileRepo fileRepo;
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

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    protected class CommunityInfoResponse{
        private Long id;
        private String name;
        private Integer members;
        private String bio;
        private byte[] profile_pic;
        private byte[] cover_pic;
        private Boolean is_joined;
        private Boolean is_notified;
        private EIsa isa;
    }
//---------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------
    @PostMapping("/create")
    public ResponseEntity<?> createCommunity(@RequestBody CreateCommunityRequest request){
        final Long id = userSessions.getUserId();
        Community community = new Community(request.getName(),
                                            request.getBio(), 
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
                                                                false, 
                                                                EIsa.ISA_ADMIN);
                File profile = new File(null, community.getId(), null, null, null,EFileStatus.PROFILE, request.getProfile());
                File cover = new File(null, community.getId(), null, null, null, EFileStatus.COVER, request.getCover());
                fileRepo.save(profile);
                fileRepo.save(cover);
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
        return ResponseEntity.ok(community.getId());
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
                                                        false, 
                                                        EIsa.ISA_MEMBER);
        if(userCommunityRepo.isExistsInCommunity(id, userSessions.getUserId()) == BigInteger.ZERO){
            userCommunityRepo.save(userCommunity);
        }else{
            return ResponseEntity.ok(new IsJoin(true));
        }
        return ResponseEntity.ok(userCommunity);
    }

    @Transactional
    @DeleteMapping("/{id}/not_join")
    public ResponseEntity<?> noJoinCommunity(@PathVariable Long id){
        userCommunityRepo.deleteUserJoinCommunity(id, userSessions.getUserId());
        return ResponseEntity.ok("success");
    }
    //User Community List
    @GetMapping("/communities")
    public ResponseEntity<?> userCommunity(){
        List<Community> userCommunities = communityRepo.findUserCommunityList(userSessions.getUserId());
        Set<CommunityResponse> user_commu = new HashSet<>();
        userCommunities.forEach(e ->{
            CommunityResponse cr = new CommunityResponse(e.getId(), e.getName(), fileRepo.communityProfilePic(e.getId()).getPhoto());
            user_commu.add(cr);
        });
        return ResponseEntity.ok(user_commu);
    }

    @PostMapping("/communities/recommend")
    public ResponseEntity<?> recommendCommunity(@RequestBody @Nullable List<Long> id){
        if(id.size() != 0){
            List<RecommedCommunityResponse> list = new ArrayList<>();
            communityRepo.recommendUserCommunityListLimit20WithNotInPrev(userSessions.getUserId(), id).forEach(e ->{
                RecommedCommunityResponse response = new RecommedCommunityResponse(e.getId(), 
                                                                                   e.getName(), 
                                                                                   fileRepo.communityProfilePic(e.getId()).getPhoto(), 
                                                                                   userCommunityRepo.communityMembers(e.getId()));
                                                                                
                list.add(response);
            });
            return ResponseEntity.ok(list);
        }
        List<RecommedCommunityResponse> list = new ArrayList<>();
        communityRepo.recommendUserCommunityLimit20(userSessions.getUserId()).forEach(e ->{
            RecommedCommunityResponse response = new RecommedCommunityResponse(e.getId(), 
                                                                               e.getName(), 
                                                                               fileRepo.communityProfilePic(e.getId()).getPhoto(), 
                                                                               userCommunityRepo.communityMembers(e.getId()));
                                                                            
            list.add(response);
        });
        return ResponseEntity.ok(list);
    }

    @PostMapping("/communities/recommend/join")
    public ResponseEntity<?> joinRecommendCommunity(@RequestBody @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY) List<Long> id){
        id.forEach(e -> {
            UserCommunity userCommunity = new UserCommunity(userSessions.getUserId(), 
                                                            e, 
                                                            LocalTime.now(), 
                                                            LocalDate.now(), 
                                                            true,
                                                            false, 
                                                            EIsa.ISA_MEMBER);
            userCommunityRepo.save(userCommunity);
        });
        return ResponseEntity.ok(new SuccessMessageResponse("You have successfully joined!", true));
    }
//-------------------------------
    //usercommunity-> is_joined, is_notified
//-------------------------------
    //each community info
    @GetMapping("/info/{id}")
    public ResponseEntity<?> eachCommunityInfo(@PathVariable Long id){
        if(userCommunityRepo.isExistsInCommunity(id, userSessions.getUserId()) == BigInteger.ZERO){
            CommunityInfoResponse response = new CommunityInfoResponse(id, 
                                                                       communityRepo.communityById(id).getName(), 
                                                                       userCommunityRepo.communityMembers(id), 
                                                                       communityRepo.communityById(id).getBio(), 
                                                                       fileRepo.communityProfilePic(id).getPhoto(), 
                                                                       fileRepo.communityCoverPic(id).getPhoto(), 
                                                                       false, 
                                                                       false, 
                                                                       EIsa.ISA_VISITOR);
            return ResponseEntity.ok(response);
        }
        if(userCommunityRepo.findUserCommunityInfo(id, userSessions.getUserId()).getIsA() == EIsa.ISA_ADMIN){
            CommunityInfoResponse response = new CommunityInfoResponse(id, 
                                                                    communityRepo.communityById(id).getName(), 
                                                                    userCommunityRepo.communityMembers(id), 
                                                                    communityRepo.communityById(id).getBio(), 
                                                                    fileRepo.communityProfilePic(id).getPhoto(), 
                                                                    fileRepo.communityCoverPic(id).getPhoto(), 
                                                                    true, 
                                                                    true, 
                                                                    EIsa.ISA_ADMIN);
            return ResponseEntity.ok(response);
        }else if(userCommunityRepo.findUserCommunityInfo(id, userSessions.getUserId()).getIsA() == EIsa.ISA_MODERATOR){
            CommunityInfoResponse response = new CommunityInfoResponse(id, 
                                                                    communityRepo.communityById(id).getName(), 
                                                                    userCommunityRepo.communityMembers(id), 
                                                                    communityRepo.communityById(id).getBio(), 
                                                                    fileRepo.communityProfilePic(id).getPhoto(), 
                                                                    fileRepo.communityCoverPic(id).getPhoto(), 
                                                                    true, 
                                                                    userCommunityRepo.findUserCommunityInfo(id, userSessions.getUserId()).getIsNotified(), 
                                                                    EIsa.ISA_MODERATOR);
            return ResponseEntity.ok(response);                                                       
        }
        CommunityInfoResponse response = new CommunityInfoResponse(id, 
                                                                communityRepo.communityById(id).getName(), 
                                                                userCommunityRepo.communityMembers(id), 
                                                                communityRepo.communityById(id).getBio(), 
                                                                fileRepo.communityProfilePic(id).getPhoto(), 
                                                                fileRepo.communityCoverPic(id).getPhoto(), 
                                                                true, 
                                                                userCommunityRepo.findUserCommunityInfo(id, userSessions.getUserId()).getIsNotified(), 
                                                                EIsa.ISA_MEMBER);
        return ResponseEntity.ok(response);
    }
}
