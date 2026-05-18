package com.digeshwar.foodiesapi.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@Primary
public class BrevoEmailProvider implements EmailProvider {

    @Value("${BREVO_API_KEY}")
private String brevoApiKey;
    private final String BREVO_URL = "https://api.brevo.com/v3/smtp/email";

    @Override
    public void sendEmail(String to, String subject, String body) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("api-key", brevoApiKey);
        Map<String, Object> requestBody = new HashMap<>();
        Map<String, String> sender = new HashMap<>();
        sender.put("name", "Digeshwar Foodies");
        sender.put("email", "mr.digeshwar05dev@gmail.com");
        requestBody.put("sender", sender);

        requestBody.put("to", new Object[]{Map.of("email", to)});
        requestBody.put("subject", subject);
        requestBody.put("htmlContent", body);
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
        try {

            ResponseEntity<String> response =
                    restTemplate.postForEntity(
                            BREVO_URL,
                            request,
                            String.class
                    );
            System.out.println("BREVO STATUS: " + response.getStatusCode());
            System.out.println("BREVO RESPONSE: " + response.getBody());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}