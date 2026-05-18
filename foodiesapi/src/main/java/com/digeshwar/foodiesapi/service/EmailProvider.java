package com.digeshwar.foodiesapi.service;

public interface EmailProvider {

    void sendEmail(String to, String subject, String body);

}
