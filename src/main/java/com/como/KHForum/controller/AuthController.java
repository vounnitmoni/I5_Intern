package com.como.KHForum.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.como.KHForum.entity.Role;
import com.como.KHForum.entity.User;
import com.como.KHForum.entity.enums.ERole;
import com.como.KHForum.payload.SignInRequest;
import com.como.KHForum.payload.SignUpRequest;
import com.como.KHForum.payload.response.authResponse.UserInfoResponse;
import com.como.KHForum.payload.response.successResponse.SignUpSuccessResponse;
import com.como.KHForum.payload.response.successResponse.SuccessMessageResponse;
import com.como.KHForum.repository.RoleRepo;
import com.como.KHForum.repository.UserRepo;
import com.como.KHForum.webconfig.jwt.Utils;
import com.como.KHForum.webconfig.service.UserDetailsImpl;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Null;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
  @Autowired AuthenticationManager authenticationManager;
  @Autowired UserRepo userRepository;
  @Autowired RoleRepo roleRepository;
  @Autowired PasswordEncoder encoder;
  @Autowired Utils jwtUtils;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody SignInRequest request) {

    Authentication authentication = authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
    SecurityContextHolder.getContext().setAuthentication(authentication);   
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);
    String accessToken = jwtUtils.generateAccessToken(userDetails);
    List<String> role = userDetails.getAuthorities().stream()
        .map(item -> item.getAuthority())
        .collect(Collectors.toList());

    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
        .body(new UserInfoResponse(userDetails.getId(),
                                   userDetails.getUsername(),
                                   userDetails.getEmail(),
                                   accessToken,
                                   role));
  }
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest().body(new SuccessMessageResponse("Error: Username is already taken!", false));
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body(new SuccessMessageResponse("Error: Email is already in use!", true));
        }

        User user = new User(request.getUsername(),
                            request.getEmail(),
                            encoder.encode(request.getPassword()));

        Set<String> strRoles = request.getRole();
        Set<Role> roles = new HashSet<>();
        strRoles.forEach(role -> {
            switch (role) {
            case "user": 
                Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(()-> new RuntimeException("Error: Role is not found."));
                roles.add(userRole);
            break;
            }
            
        });
        user.setRoles(roles);
        userRepository.saveAndFlush(user);
        SignUpSuccessResponse signUpSuccessResponse = new SignUpSuccessResponse();
        if(user != null){
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
                SecurityContextHolder.getContext().setAuthentication(authentication);
                UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
                String accessToken = jwtUtils.generateAccessToken(userDetails);
                signUpSuccessResponse.setAccessToken(accessToken);
        }
        return ResponseEntity.ok().body(new SignUpSuccessResponse("Sign up successed!", true, signUpSuccessResponse.getAccessToken()));
  }

  @PostMapping("/signout")
  public ResponseEntity<?> logoutUser() {
    ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
        .body(new SuccessMessageResponse("You have succesfully signed out!", true));
  }
}
