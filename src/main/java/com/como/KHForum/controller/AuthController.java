package com.como.KHForum.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.como.KHForum.repository.RoleRepo;
import com.como.KHForum.repository.UserRepo;
import com.como.KHForum.webconfig.jwt.Utils;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    
  @Autowired AuthenticationManager authenticationManager;

  @Autowired UserRepo userRepository;

  @Autowired RoleRepo roleRepository;

  @Autowired PasswordEncoder encoder;

  @Autowired Utils jwtUtils;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

    String accessToken = jwtUtils.generateAccessToken(userDetails);
    List<String> roles = userDetails.getAuthorities().stream()
        .map(item -> item.getAuthority())
        .collect(Collectors.toList());

    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
        .body(new UserInfoResponse(userDetails.getId(),
                                   userDetails.getUsername(),
                                   userDetails.getEmail(),
                                   accessToken,
                                   roles));
  }
  @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new SuccessWithMessageResponse("Error: Username is already taken!", false));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new SuccessWithMessageResponse("Error: Email is already in use!", true));
        }

        User user = new User(signUpRequest.getUsername(),
                            signUpRequest.getEmail(),
                            encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();
        
        strRoles.forEach(role -> {
            switch (role) {
            case "Orator":
            Role oratorRole = roleRepository.findByName(ERole.ROLE_ORATOR)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(oratorRole);
            case "User": 
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(()-> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
            }    
        });
        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new SuccessWithMessageResponse("User has successfully registered! ", true));
  }

  @PostMapping("/signout")
  public ResponseEntity<?> logoutUser() {
    ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
        .body(new SuccessWithMessageResponse("You have succesfully signed out!", true));
  }
}
}
