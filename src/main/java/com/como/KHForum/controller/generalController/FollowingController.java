package com.como.KHForum.controller.generalController;

import java.math.BigInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.como.KHForum.entity.Follower;
import com.como.KHForum.repository.FollowerRepo;
import com.como.KHForum.webconfig.session.UserSessions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@RestController
@RequestMapping("api/all/follow")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('ORATOR') or hasRole('USER')")
public class FollowingController {
    @Autowired FollowerRepo followerRepo;
    @Autowired UserSessions userSessions;
//-----------------------------------------------
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    protected class IsFollowed{
        private Boolean isFollowed;
    }
    protected Boolean isFollowed;
//-----------------------------------------------
    @PostMapping
    public ResponseEntity<?> followUser(@RequestBody Long followee_id){
        Follower follower = new Follower(userSessions.getUserId(), followee_id);
        followerRepo.save(follower);
        return ResponseEntity.ok(null);
    }

    @DeleteMapping
    public ResponseEntity<?> unFollow(@RequestBody Long followee_id){
        if(followerRepo.isFollowed(userSessions.getUserId(), followee_id) == BigInteger.ONE){
            followerRepo.deleteById(followerRepo.follower(userSessions.getUserId(), followee_id).getId());
        }else{
            return ResponseEntity.ok("not exist");
        }
        return ResponseEntity.ok("success");
    }

    @PostMapping("/isfollowed")
    public ResponseEntity<IsFollowed> isFollowed(@RequestBody Integer followee_id){
        Long i = followee_id.longValue();
        IsFollowed followed = new IsFollowed(isFollowed);
        if(followerRepo.isFollowed(userSessions.getUserId(), i) == BigInteger.ZERO){
            isFollowed = true;
            
        }else{
            isFollowed = false;
        }
        return ResponseEntity.ok(followed);
    }
}
