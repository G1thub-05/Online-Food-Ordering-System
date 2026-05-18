package com.digeshwar.foodiesapi.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private EmailProvider emailProvider;

    public void sendOtpEmail(String toEmail, String otp) {

        String subject =
                "Verify Your Email 📧 - Digeshwar Foodies OTP Inside";
        String body =
                "<div style='margin:0;padding:20px 10px;"
                        + "background:linear-gradient(135deg,#1e1e2f,#2b2b45,#121212);"
                        + "font-family:Arial,sans-serif;'>"
                        + "<div style='max-width:600px;"
                        + "width:100%;"
                        + "margin:auto;"
                        + "padding:25px 18px;"
                        + "box-sizing:border-box;"
                        + "border-radius:22px;"
                        + "background:rgba(255,255,255,0.08);"
                        + "backdrop-filter:blur(18px);"
                        + "-webkit-backdrop-filter:blur(18px);"
                        + "border:1px solid rgba(255,255,255,0.18);"
                        + "box-shadow:0 8px 32px rgba(0,0,0,0.35);"
                        + "color:#ffffff;'>"
                        + "<h1 style='text-align:center;"
                        + "font-size:clamp(20px,4vw,30px);"
                        + "margin-bottom:22px;"
                        + "color:#ff9f43;"
                        + "letter-spacing:1px;'>"
                        + "🍔 DIGESHWAR FOODIES"
                        + "</h1>"

                        + "<p style='font-size:clamp(12px,3.5vw,15px);"
                        + "line-height:1.9;"
                        + "text-align:justify;"
                        + "color:#f1f1f1;"
                        + "margin:0;'>"
                        + "Hello Foodie Friend 👨‍🍳,<br><br>"
                        + "Thanks for signing up with "
                        + "<b style='color:#ffb347;'>Digeshwar Foodies</b>! 🍛 "
                        + "To keep your account secure and delicious, "
                        + "please verify your email address using the OTP below."
                        + "</p>"

                        + "<div style='margin:35px auto;"
                        + "width:100%;"
                        + "max-width:320px;"
                        + "padding:22px 12px;"
                        + "box-sizing:border-box;"
                        + "border-radius:20px;"
                        + "background:rgba(255,255,255,0.12);"
                        + "border:1px solid rgba(255,255,255,0.2);"
                        + "backdrop-filter:blur(10px);"
                        + "-webkit-backdrop-filter:blur(10px);"
                        + "text-align:center;"
                        + "box-shadow:0 4px 25px rgba(0,0,0,0.25);'>"
                        + "<div style='font-size:clamp(12px,3.5vw,16px);"
                        + "margin-bottom:10px;"
                        + "color:#ffb347;"
                        + "font-weight:bold;'>"

                        + "🔐 EMAIL VERIFICATION OTP"

                        + "</div>"

                        + "<div style='font-size:clamp(22px,7vw,36px);"
                        + "font-weight:bold;"
                        + "letter-spacing:clamp(3px,1vw,8px);"
                        + "color:#ffffff;'>"

                        + otp +

                        "</div>"

                        + "</div>"

                        + "<p style='font-size:clamp(11px,3.2vw,14px);"
                        + "line-height:1.9;"
                        + "text-align:justify;"
                        + "color:#e6e6e6;'>"

                        + "⚠️ This OTP is valid for "
                        + "<b style='color:#ffb347;'>10 minutes</b>. "
                        + "Please do not share this code with anyone for security reasons. "
                        + "If you didn’t try to create an account, "
                        + "you can safely ignore this email."

                        + "</p>"

                        + "<hr style='margin:30px 0;"
                        + "border:none;"
                        + "height:1px;"
                        + "background:rgba(255,255,255,0.15);'>"

                        + "<p style='text-align:center;"
                        + "font-size:clamp(12px,3.5vw,15px);"
                        + "line-height:1.8;"
                        + "color:#f5f5f5;"
                        + "margin:0;'>"

                        + "Stay hungry. Stay happy 😋<br>"

                        + "<span style='color:#ffb347;font-weight:bold;'>"
                        + "— Team Digeshwar Foodies"
                        + "</span>"

                        + "</p>"

                        + "</div>"

                        + "</div>";
        emailProvider.sendEmail(toEmail, subject, body);
    }
    public void sendOtpReset(String toEmail, String otp) {

        String subject =
                "Reset Your Password 🔐 - Digeshwar Foodies Support";

        String body =
                "<div style='margin:0;padding:20px 10px;"
                        + "background:linear-gradient(135deg,#1e1e2f,#2b2b45,#121212);"
                        + "font-family:Arial,sans-serif;'>"

                        + "<div style='max-width:600px;"
                        + "width:100%;"
                        + "margin:auto;"
                        + "padding:25px 18px;"
                        + "box-sizing:border-box;"
                        + "border-radius:22px;"
                        + "background:rgba(255,255,255,0.08);"
                        + "backdrop-filter:blur(18px);"
                        + "-webkit-backdrop-filter:blur(18px);"
                        + "border:1px solid rgba(255,255,255,0.18);"
                        + "box-shadow:0 8px 32px rgba(0,0,0,0.35);"
                        + "color:#ffffff;'>"

                        + "<h1 style='text-align:center;"
                        + "font-size:clamp(20px,4vw,30px);"
                        + "margin-bottom:22px;"
                        + "color:#ff9f43;"
                        + "letter-spacing:1px;"
                        + "word-break:break-word;'>"
                        + "🍔 DIGESHWAR FOODIES"
                        + "</h1>"

                        + "<p style='font-size:clamp(12px,3.5vw,15px);"
                        + "line-height:1.9;"
                        + "text-align:justify;"
                        + "color:#f1f1f1;"
                        + "margin:0;'>"

                        + "Hi Foodie Friend 👨‍🍳,<br><br>"

                        + "We received a request to reset your password for your "
                        + "<b style='color:#ffb347;'>Digeshwar Foodies</b> account. "
                        + "To continue securely, please use the OTP below to verify "
                        + "your identity and complete the password reset process safely."

                        + "</p>"

                        + "<div style='margin:35px auto;"
                        + "width:100%;"
                        + "max-width:320px;"
                        + "padding:22px 12px;"
                        + "box-sizing:border-box;"
                        + "border-radius:20px;"
                        + "background:rgba(255,255,255,0.12);"
                        + "border:1px solid rgba(255,255,255,0.2);"
                        + "backdrop-filter:blur(10px);"
                        + "-webkit-backdrop-filter:blur(10px);"
                        + "text-align:center;"
                        + "box-shadow:0 4px 25px rgba(0,0,0,0.25);'>"

                        + "<div style='font-size:clamp(12px,3.5vw,16px);"
                        + "margin-bottom:10px;"
                        + "color:#ffb347;"
                        + "font-weight:bold;'>"
                        + "🔐 PASSWORD RESET OTP"
                        + "</div>"

                        + "<div style='font-size:clamp(22px,7vw,36px);"
                        + "font-weight:bold;"
                        + "letter-spacing:clamp(3px,1vw,8px);"
                        + "color:#ffffff;"
                        + "word-break:break-word;'>"

                        + otp +

                         "</div>"

                        + "</div>"

                        + "<p style='font-size:clamp(11px,3.2vw,14px);"
                        + "line-height:1.9;"
                        + "text-align:justify;"
                        + "color:#e6e6e6;'>"

                        + "⏰ This OTP will expire in "
                        + "<b style='color:#ffb347;'>10 minutes</b>. "
                        + "For your security, please do not share this code with anyone. "
                        + "If you didn’t request a password reset, "
                        + "you can safely ignore this email and your account will remain secure."

                        + "</p>"

                        + "<hr style='margin:30px 0;"
                        + "border:none;"
                        + "height:1px;"
                        + "background:rgba(255,255,255,0.15);'>"

                        + "<p style='text-align:center;"
                        + "font-size:clamp(12px,3.5vw,15px);"
                        + "line-height:1.8;"
                        + "color:#f5f5f5;"
                        + "margin:0;'>"

                        + "Stay hungry. Stay happy 😋<br>"
                        + "<span style='color:#ffb347;font-weight:bold;'>"
                        + "— Team Digeshwar Foodies"
                        + "</span>"

                        + "</p>"

                        + "</div>"

                        + "</div>";
        emailProvider.sendEmail(toEmail, subject, body);
    }
}