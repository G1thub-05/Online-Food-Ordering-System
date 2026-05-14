package com.digeshwar.foodiesapi.service;

import com.digeshwar.foodiesapi.io.UserRequest;
import com.digeshwar.foodiesapi.io.UserResponse;

public interface UserService {

    UserResponse registerUser(UserRequest request);
    boolean resetPassword(String email, String newPassword);

    String findByUserId();
}





