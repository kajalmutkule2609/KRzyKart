package org.techhub.eComWebsite.clientApp;

import java.sql.PreparedStatement;

import java.sql.SQLException;
import java.util.Scanner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.event.EventListener;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.techhub.eComWebsite.Configuration.OTPGenerator;
import org.techhub.eComWebsite.Model.UserModel;
import org.techhub.eComWebsite.service.EmailSenderService;
import org.techhub.eComWebsite.service.UserService;
import org.techhub.eComWebsite.service.UserServiceImp;

@SpringBootApplication
@ComponentScan(basePackages = "org.techhub.eComWebsite")
public class EcomWebsite {

	@Autowired
	private EmailSenderService emailSender;
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		ApplicationContext context = SpringApplication.run(EcomWebsite.class, args);
		JdbcTemplate jdbcTemplate = (JdbcTemplate) context.getBean("jdbcTemplate");
		if(jdbcTemplate!=null) {
			System.out.println("Db Connected...");
		}
		else {
			System.out.println("Db not connected.");
		}
				
	}


}











//@EventListener(ApplicationReadyEvent.class)
//public void sendMail() {
//  String otp = OTPGenerator.generateOTP(6);
//  emailSender.sendEmail("kajalm2659@gmail.com", "Email Verification", "Your OTP is: " + otp);
//}