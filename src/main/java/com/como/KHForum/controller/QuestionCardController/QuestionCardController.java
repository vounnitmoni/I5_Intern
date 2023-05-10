package com.como.KHForum.controller.QuestionCardController;

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

import com.como.KHForum.service.PostCardService.QuestionCardService;

@RestController
@RequestMapping("api/all/post")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('ORATOR') or hasRole('USER')")
public class QuestionCardController {
    @Autowired QuestionCardService questionCardService;
    Integer number = 20;

    // @GetMapping
    // public ResponseEntity<?> post(){
    //     return ResponseEntity.ok(post_questionnaires);
    // }
    @GetMapping("")
    public ResponseEntity<?> post(){
        return ResponseEntity.ok().body(questionCardService.customQuestionCard());
    }
    @PostMapping("/community/{c_id}")
    public ResponseEntity<?> communityQPost(@RequestBody Integer flag, @PathVariable Integer c_id){
        return ResponseEntity.ok().body(questionCardService.communityPost(c_id.longValue(), flag));
    }
}

//My Note:
    //need community, userinfo, question(all),
    //questions can be from user(following algo) and recommend by community, category. 
    //only render 20 post each time scroll,
    //user following, ex: a follows 10 people and today those ten post 4 => 4 + posts by communities + category;    
 //Completed: 
    //completed random category questionnaires(5)
    //post by follow 7 more 
    //post by community 8 more
    //order by date desc is neccesserly bcuz seens is accurated enough
