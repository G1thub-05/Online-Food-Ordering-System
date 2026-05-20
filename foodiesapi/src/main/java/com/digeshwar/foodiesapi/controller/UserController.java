package com.digeshwar.foodiesapi.controller;

import com.digeshwar.foodiesapi.io.UserRequest;
import com.digeshwar.foodiesapi.io.UserResponse;
import com.digeshwar.foodiesapi.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class UserController {

    private final UserService userService;


    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@RequestBody UserRequest request) {
        return userService.registerUser(request);
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable String userId) {

        userService.deleteUser(userId);

        return ResponseEntity.ok("User deleted successfully");
    }

    @GetMapping("/users")
    public List<UserResponse> getAllUsers() {

        return userService.getAllUsers();
    }

    @PostMapping("/check-email")
    public ResponseEntity<?> checkEmail(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        boolean exists = userService.checkEmailExists(email);
        return ResponseEntity.ok(Map.of("exists", exists));
    }
}
