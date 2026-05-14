package com.digeshwar.foodiesapi.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Verify Your Email 📧 - Digeshwar Foodies OTP Inside");
        message.setText(
                "Hello Foodie Friend 👨‍🍳,\n\n" +
                        "Thanks for signing up with *Digeshwar Foodies*! 🍛\n\n" +
                        "To keep your account secure and delicious, please use the OTP below to verify your email:\n\n" +
                        "🔒 Your One-Time Password (OTP): " + otp + "\n\n" +
                        "⚠️ This code is valid for only 10 minutes, so be quick!\n\n" +
                        "If you didn’t try to register, no worries — just ignore this email.\n\n" +
                        "Stay hungry, stay happy! 😄\n\n" +
                        "---The Digeshwar Foodies Team"
        );
        mailSender.send(message);
    }

    public void sendOtpReset(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Reset Your Password 🔐 - Digeshwar Foodies Support");
        message.setText(
                "Hello Foodie Friend 👨‍🍳,\n\n" +
                        "We received a request to reset your password for your *Digeshwar Foodies* account. 🔁\n\n" +
                        "To reset your password securely, please use the OTP below:\n\n" +
                        "🔐 Your Password Reset OTP: " + otp + "\n\n" +
                        "⚠️ This OTP is valid for only 10 minutes. Make sure to reset your password before it expires.\n\n" +
                        "If you did not request a password reset, please ignore this email. Your account is safe. 🔒\n\n" +
                        "Happy ordering and stay delicious! 😋\n" +
                        "---The Digeshwar Foodies Team"
        );

        mailSender.send(message);
    }
}
