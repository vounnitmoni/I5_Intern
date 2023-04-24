package com.como.KHForum.controller.generalController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.como.KHForum.entity.Follower;
import com.como.KHForum.repository.FollowerRepo;
import com.como.KHForum.webconfig.session.UserSessions;

@RestController
@RequestMapping("api/all/follow")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('ORATOR') or hasRole('USER')")
public class FollowingController {
    @Autowired FollowerRepo followerRepo;
    @Autowired UserSessions userSessions;

    @PostMapping
    public ResponseEntity<?> followUser(@RequestBody Long followee_id){
        Follower follower = new Follower(userSessions.getUserId(), followee_id);
        followerRepo.save(follower);
        return ResponseEntity.ok(null);
    }

}
