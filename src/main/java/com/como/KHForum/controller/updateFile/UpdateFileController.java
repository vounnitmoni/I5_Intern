package com.como.KHForum.controller.updateFile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.como.KHForum.entity.File;
import com.como.KHForum.repository.FileRepo;

import lombok.Getter;
import lombok.Setter;

@RestController
@RequestMapping("api/all/update")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('ORATOR') or hasRole('USER')")
public class UpdateFileController {
    @Autowired FileRepo fileRepo;
//------------------------------------------------------------------------------------------------------
    @Getter
    @Setter
    protected class Request{
        private byte[] profile;
        private byte[] cover;
    }
//------------------------------------------------------------------------------------------------------

    @PutMapping("/file/community/{c_id}")
    public ResponseEntity<?> updateCommunityFile(@PathVariable Long c_id, @RequestBody Request request){
        File profile = fileRepo.communityProfilePic(c_id);
        File cover = fileRepo.communityCoverPic(c_id);
        profile.setPhoto(request.getProfile());
        cover.setPhoto(request.getCover());
        fileRepo.save(profile);
        fileRepo.save(cover);
        return null;    
    }
    
    @PutMapping("/file/user/{user_id}")
    public ResponseEntity<?> updateUserFile(@PathVariable Long user_id, @RequestBody Request request){
        File profile = fileRepo.userProfilePic(user_id);
        File cover = fileRepo.userCoverPic(user_id);
        profile.setPhoto(request.getProfile());
        cover.setPhoto(request.getCover());
        fileRepo.save(profile);
        fileRepo.save(cover);
        return null;
    }
}
