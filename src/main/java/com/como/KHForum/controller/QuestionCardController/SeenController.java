package com.como.KHForum.controller.QuestionCardController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.como.KHForum.entity.Seen;
import com.como.KHForum.payload.request.generalRequest.QuestionnaireIdRequest;
import com.como.KHForum.repository.SeenRepo;
import com.como.KHForum.service.PostCardService.SeenService;
import com.como.KHForum.webconfig.session.UserSessions;


@RestController
@RequestMapping("api/all/seen")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('ORATOR') or hasRole('USER')")
public class SeenController {
    @Autowired SeenService seenService;
    @Autowired UserSessions userSessions;
    @Autowired SeenRepo seenRepo;

    @PostMapping
    public ResponseEntity<?> seen(@RequestBody QuestionnaireIdRequest request){
        request.getQuestionnaire_id().forEach(e ->{
            Seen seen = new Seen(userSessions.getUserId(), e, true);
            seenRepo.save(seen);
        });
        return ResponseEntity.ok().build();
    }
}
