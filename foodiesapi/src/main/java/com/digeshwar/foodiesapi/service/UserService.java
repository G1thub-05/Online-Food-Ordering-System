package com.digeshwar.foodiesapi.service;

import com.digeshwar.foodiesapi.io.UserRequest;
import com.digeshwar.foodiesapi.io.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse registerUser(UserRequest request);
    boolean resetPassword(String email, String newPassword);
    void deleteUser(String userId);
    List<UserResponse> getAllUsers();
    String findByUserId();
    boolean checkEmailExists(String email);

}





