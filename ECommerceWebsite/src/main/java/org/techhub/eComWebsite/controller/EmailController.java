package org.techhub.eComWebsite.controller;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.techhub.eComWebsite.service.EmailSenderService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/ECommerceWebsite/Email")
@CrossOrigin("http://localhost:5173")
public class EmailController {

    @Autowired
    private EmailSenderService emailSenderService;

    @PostMapping("/send")
    public String sendEmail(@RequestBody Map<String, String> payload) {
        String to = payload.get("to");
        String subject = payload.get("subject");
        String body = payload.get("body");

        emailSenderService.sendEmail(to, subject, body);
        log.info("Mail Sent Sucessfully...");
        return "Email sent successfully";
    }
}