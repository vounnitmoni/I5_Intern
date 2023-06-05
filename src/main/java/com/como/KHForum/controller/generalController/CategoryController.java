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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.como.KHForum.entity.UserCategory;
import com.como.KHForum.payload.request.generalRequest.ChooseCategoryRequest;
import com.como.KHForum.payload.response.successResponse.SuccessMessageResponse;
import com.como.KHForum.repository.AppUserRepo;
import com.como.KHForum.repository.CategoryRepo;
import com.como.KHForum.repository.UserCategoryRepo;
import com.como.KHForum.webconfig.session.UserSessions;

@RestController
@RequestMapping("api/all/category")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('ORATOR') or hasRole('USER')")
public class CategoryController {

    @Autowired AppUserRepo appUserRepo;
    @Autowired UserSessions userSessions;
    @Autowired CategoryRepo categoryRepo;
    @Autowired UserCategoryRepo userCategoryRepo;

    @GetMapping
    public ResponseEntity<?> userCategory(){
        final Long id = userSessions.getUserId();
        List<Long> categoryId = appUserRepo.findCategoryIdList(id);
        List<String> categoryName = categoryRepo.findCategoryNameList(categoryId);
        return ResponseEntity.ok(categoryName);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addCategory(@RequestBody ChooseCategoryRequest request){
        for(String i : request.getCategory_name()){
            UserCategory userCategory = new UserCategory(userSessions.getUserId(), categoryRepo.findCategoryIdByName(i));
            userCategoryRepo.save(userCategory);
        }
        return ResponseEntity.ok(new SuccessMessageResponse("categories added!", true));
    }

    //list all category
    @GetMapping("/list")
    public ResponseEntity<?> list20Category(@RequestParam Integer request_time, @RequestBody Set<Long> prev_id){
        if(request_time != 0){
            return ResponseEntity.ok(categoryRepo.categoriesWithNotIn(prev_id));
        }
        return ResponseEntity.ok(categoryRepo.categories());
    }
}
