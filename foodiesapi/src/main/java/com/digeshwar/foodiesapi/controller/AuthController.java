package com.digeshwar.foodiesapi.controller;

import com.digeshwar.foodiesapi.io.AuthenticationRequest;
import com.digeshwar.foodiesapi.io.AuthenticationResponse;
import com.digeshwar.foodiesapi.service.AppUserDetailsService;
import com.digeshwar.foodiesapi.service.UserService;
import com.digeshwar.foodiesapi.util.JwtUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import com.digeshwar.foodiesapi.service.EmailService;
import com.digeshwar.foodiesapi.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;




//@CrossOrigin(
//        origins = "http://localhost:5173",
//        allowCredentials = "true",
//        allowedHeaders = "*",
//        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS},
//        exposedHeaders = {"Authorization"}
//)
@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        final String jwtToken = jwtUtil.generateToken(userDetails);
        return new AuthenticationResponse(request.getEmail(), jwtToken);
    }

    @Autowired
    private EmailService emailService;
    private OtpService otpService;

    // 1️⃣ Send OTP to email
    @PostMapping("/send-otp")
    public String sendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = otpService.generateOtp(email);
        emailService.sendOtpEmail(email, otp);
        return "OTP sent to email.";
    }

    // 2️⃣ Verify OTP
    @PostMapping("/verify-otp")
    public ResponseEntity<Map<String, Object>> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");

        boolean isValid = otpService.verifyOtp(email, otp);
        Map<String, Object> response = new HashMap<>();
        response.put("verified", isValid);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = otpService.generateOtp(email);
        emailService.sendOtpReset(email, otp);
        return "OTP sent to email.";
    }

    @Autowired
    private UserService userService;

    @Data
    public static class PasswordResetRequest {
        private String email;
        private String password;
    }

    @PostMapping("/reset")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordResetRequest request) {
        boolean result = userService.resetPassword(request.getEmail(), request.getPassword());
        if (result) {
            return ResponseEntity.ok(Map.of("message", "Password updated successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "User not found"));
        }
    }
}












