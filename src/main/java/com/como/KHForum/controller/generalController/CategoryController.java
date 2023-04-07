package com.como.KHForum.controller.generalController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.como.KHForum.repository.AppUserRepo;
import com.como.KHForum.repository.CategoryRepo;
import com.como.KHForum.webconfig.session.UserSessions;

@RestController
@RequestMapping("/category")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('ORATOR') or hasRole('USER')")
public class CategoryController {

    @Autowired AppUserRepo appUserRepo;
    @Autowired UserSessions userSessions;
    @Autowired CategoryRepo categoryRepo;

    @GetMapping
    public ResponseEntity<?> userCategory(){
        final Long id = userSessions.getUserId();
        List<Long> categoryId = appUserRepo.findCategoryIdList(id);
        List<String> categoryName = categoryRepo.findCategoryNameList(categoryId);
        return ResponseEntity.ok(categoryName);
    }

}
