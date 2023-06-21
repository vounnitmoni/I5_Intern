package com.como.KHForum.controller.generalController;

import java.time.LocalDate;
import java.time.LocalDateTime;

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

import com.como.KHForum.entity.Comment;
import com.como.KHForum.entity.File;
import com.como.KHForum.entity.enums.EFileStatus;
import com.como.KHForum.payload.request.generalRequest.CommentReqeust;
import com.como.KHForum.repository.CommentRepo;
import com.como.KHForum.repository.FileRepo;
import com.como.KHForum.webconfig.session.UserSessions;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/all/comment")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('ORATOR') or hasRole('USER')")
public class CommentController {
    @Autowired CommentRepo commentRepo;
    @Autowired UserSessions userSessions;
    @Autowired FileRepo fileRepo;
//-----------------------------------------------------------------------------------------------------
    
//-----------------------------------------------------------------------------------------------------
    @GetMapping
    public ResponseEntity<?> listAllComment(){
        return null;
    }

    @GetMapping("{answer_id}") 
    public ResponseEntity<?> listEachComment(@PathVariable Long answer_id, @RequestParam(required = true) Boolean hasChild ){
        return null;
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

}
