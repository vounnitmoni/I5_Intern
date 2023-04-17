package com.como.KHForum.controller.generalController;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.como.KHForum.entity.AppUser;
import com.como.KHForum.entity.Category;
import com.como.KHForum.payload.request.generalRequest.AddCategoryRequest;
import com.como.KHForum.payload.response.successResponse.SuccessMessageResponse;
import com.como.KHForum.repository.AppUserRepo;
import com.como.KHForum.repository.CategoryRepo;
import com.como.KHForum.webconfig.session.UserSessions;

@RestController
@RequestMapping("api/all/category")
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

    @PostMapping("/add")
    public ResponseEntity<?> addCategory(@RequestBody AddCategoryRequest request){
        Set<Category> categories = new HashSet<>();
        Set<String> category = request.getCategory_name();
        AppUser user = new AppUser();
        for(String i : category){
            if(categoryRepo.existsByName(i)){
                categories.add(categoryRepo.findCategoryByName(i));
            }
        }
        user.setUser_category(categories);
        appUserRepo.save(user);

        return ResponseEntity.ok(new SuccessMessageResponse("categories added!", true));
    }

}
