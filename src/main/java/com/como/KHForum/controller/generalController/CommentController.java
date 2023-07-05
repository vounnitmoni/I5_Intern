package com.como.KHForum.controller.generalController;

import java.math.BigInteger;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.como.KHForum.entity.AppUser;
import com.como.KHForum.entity.Comment;
import com.como.KHForum.entity.File;
import com.como.KHForum.entity.User;
import com.como.KHForum.entity.enums.EFileStatus;
import com.como.KHForum.payload.request.generalRequest.CommentReqeust;
import com.como.KHForum.repository.AppUserRepo;
import com.como.KHForum.repository.CommentRepo;
import com.como.KHForum.repository.FileRepo;
import com.como.KHForum.repository.UserRepo;
import com.como.KHForum.service.ServiceUtils.Utility;
import com.como.KHForum.service.ServiceUtils.Utility.DateTimeObject;
import com.como.KHForum.webconfig.session.UserSessions;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@RestController
@RequestMapping("api/all/comment")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('ORATOR') or hasRole('USER')")
public class CommentController {
    @Autowired CommentRepo commentRepo;
    @Autowired UserSessions userSessions;
    @Autowired FileRepo fileRepo;
    @Autowired UserRepo userRepo;
    @Autowired AppUserRepo appUserRepo;
    @Autowired Utility servicUtility;

//-----------------------------------------------------------------------------------------------------
    
//-----------------------------------------------------------------------------------------------------
    @GetMapping
    public ResponseEntity<?> listAllComment(){
        return null;
    }

    @PostMapping("ofanswer/{answer_id}") 
    public ResponseEntity<?> listComments(@PathVariable Long answer_id, @RequestBody Set<Long> prev_id){
        Set<CommentListResponse> listResponses = new LinkedHashSet<>();
        if(prev_id.size() == 0){
            if(commentRepo.commentExist(answer_id) == BigInteger.ONE){
                commentRepo.commentsByAnswerId(answer_id).forEach(e ->{
                AppUser appUser = appUserRepo.appUserInfoByAuthId(e.getUser_id()); 
                User user = userRepo.userInfoById(e.getUser_id());
                DateTimeObject object = servicUtility.DateTimeConverter(e.getCreate_stamp());
                String name_shortcut = String.valueOf(appUser.getFirstname().charAt(0)) + String.valueOf(appUser.getLastname().charAt(0));
                if(commentRepo.commentParentExist(e.getParent_id()) == BigInteger.ZERO){
                    CommentListResponse res = new CommentListResponse(e.getId(), 
                                                                  e.getUser_id(), 
                                                                  e.getParent_id(), 
                                                                  null,
                                                                  appUser.getFirstname(), 
                                                                  appUser.getLastname(), 
                                                                  user.getUsername(), 
                                                                  name_shortcut,
                                                                  e.getComment(), 
                                                                  object.getAgo_status(), 
                                                                  object.getAgo(), 
                                                                  fileRepo.userProfilePic(e.getUser_id()).getPhoto(), 
                                                                  fileRepo.CommentPhoto(e.getId()).getPhoto());
                    listResponses.add(res);                                         
                }else{
                    CommentListResponse res = new CommentListResponse(e.getId(), 
                                                                  e.getUser_id(), 
                                                                  e.getParent_id(), 
                                                                  userRepo.userInfoById(commentRepo.commentInfoById(e.getParent_id()).getUser_id()).getUsername(),
                                                                  appUser.getFirstname(), 
                                                                  appUser.getLastname(), 
                                                                  user.getUsername(), 
                                                                  name_shortcut,
                                                                  e.getComment(), 
                                                                  object.getAgo_status(), 
                                                                  object.getAgo(), 
                                                                  fileRepo.userProfilePic(e.getUser_id()).getPhoto(), 
                                                                  fileRepo.CommentPhoto(e.getId()).getPhoto());
                    listResponses.add(res);
                }   
            });
            } 
            return ResponseEntity.ok(listResponses);
        }
        if(commentRepo.commentExist(answer_id) == BigInteger.ONE){
            commentRepo.commentsByAnswerIdWithNotPrev(answer_id, prev_id).forEach(e ->{
                AppUser appUser = appUserRepo.appUserInfoByAuthId(e.getUser_id()); 
                User user = userRepo.userInfoById(e.getUser_id());
                DateTimeObject object = servicUtility.DateTimeConverter(e.getCreate_stamp());
                String name_shortcut = String.valueOf(appUser.getFirstname().charAt(0)) + String.valueOf(appUser.getLastname().charAt(0));
                if(commentRepo.commentParentExist(e.getParent_id()) == BigInteger.ZERO){
                    CommentListResponse res = new CommentListResponse(e.getId(), 
                                                                  e.getUser_id(), 
                                                                  e.getParent_id(), 
                                                                  null,
                                                                  appUser.getFirstname(), 
                                                                  appUser.getLastname(), 
                                                                  user.getUsername(), 
                                                                  name_shortcut,
                                                                  e.getComment(), 
                                                                  object.getAgo_status(), 
                                                                  object.getAgo(), 
                                                                  fileRepo.userProfilePic(e.getUser_id()).getPhoto(), 
                                                                  fileRepo.CommentPhoto(e.getId()).getPhoto());
                listResponses.add(res);                                           
                }else{
                    CommentListResponse res = new CommentListResponse(e.getId(), 
                                                                  e.getUser_id(), 
                                                                  e.getParent_id(), 
                                                                  userRepo.userInfoById(commentRepo.commentInfoById(e.getParent_id()).getUser_id()).getUsername(),
                                                                  appUser.getFirstname(), 
                                                                  appUser.getLastname(), 
                                                                  user.getUsername(), 
                                                                  name_shortcut,
                                                                  e.getComment(), 
                                                                  object.getAgo_status(), 
                                                                  object.getAgo(), 
                                                                  fileRepo.userProfilePic(e.getUser_id()).getPhoto(), 
                                                                  fileRepo.CommentPhoto(e.getId()).getPhoto());
                    listResponses.add(res);
                }
            });
        }
        
        return ResponseEntity.ok(listResponses);
    }

    @PostMapping("{answer_id}")
    public ResponseEntity<?> commentAsnwer(@Valid @PathVariable Long answer_id, @RequestBody CommentReqeust request){
        Comment comment = new Comment(request.getComment(), 
                                      LocalDateTime.now(), 
                                      request.getParent_id(), 
                                      answer_id,
                                      userSessions.getUserId());
        commentRepo.saveAndFlush(comment);
        File file = new File(null, null, null, null, comment.getId(), EFileStatus.COMMENT, request.getPhoto());
        fileRepo.save(file);
        return ResponseEntity.ok(comment);
    }
//------------------------
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    protected class CommentListResponse{
        private Long comment_id;
        private Long author_id;
        private Long reply_to;
        private String reply_to_username;
        private String firstname;
        private String lastname;
        private String username;
        private String name_shortcut;
        private String comment;
        private String ago_string;
        private Integer ago_number;
        private byte[] author_photo;
        private byte[] comment_photo;
    }

}
