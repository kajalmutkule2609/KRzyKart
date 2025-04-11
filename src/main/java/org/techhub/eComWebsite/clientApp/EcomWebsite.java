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
import org.techhub.eComWebsite.Model.UserModel;
import org.techhub.eComWebsite.dbConfiguration.OTPGenerator;
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
//	@EventListener(ApplicationReadyEvent.class)
//    public void sendMail() {
//        String otp = OTPGenerator.generateOTP(6);
//        emailSender.sendEmail("kajalm2659@gmail.com", "Email Verification", "Your OTP is: " + otp);
//    }

}
//int result=jdbcTemplate.update("insert into Registration values('0',?,?,?,?,?,?)",new PreparedStatementSetter() {
//
//	@Override
//	public void setValues(PreparedStatement ps) throws SQLException {
//		ps.setString(1, "abc");
//		ps.setString(2, "abc@gmail.com");
//		ps.setString(3, "8956862100");
//		ps.setString(4, "pune");
//		ps.setString(5, "ABC");
//		ps.setString(6, "ABC");
//	}
//});
/*
do {
System.out.println("\n---------------------------------------------------------------\n");
System.out.print("\n0:EXIT");
System.out.print("\n:1:MANAGE USER");
System.out.print("\n2:MANAGE PRODUCTS");
System.out.println("\n---------------------------------------------------------------\n");

System.out.print("\nEnter Choice:");
int choice=sc.nextInt();


switch(choice) {
case 0:
	System.out.println("Termination !!!");
	System.exit(0);
	
case 1:
	sc.nextLine();
	System.out.print("\nEnter Full Name:");
	name = sc.nextLine();
	System.out.print("\nEnter Email:");
	email = sc.nextLine();
	System.out.print("\nEnter Contact No:");
	contact = sc.nextLine();
	System.out.print("\nEnter AddressModel:");
	addr = sc.nextLine();
	System.out.print("\nEnter Password:");
	pass = sc.nextLine();
	System.out.print("\nConfirm Password:");
	conPass = sc.nextLine();
	UserModel model = new UserModel('0', name, email, contact, addr, pass, conPass);
	EcomWebsite ecomWebsite = context.getBean(EcomWebsite.class);
	ecomWebsite.registerUser(model);
	break;
default:
	System.out.println("Wrong Choice Entered !!!");

}

}while(true);
}

private void registerUser(UserModel model) {

	if (userService.registerNewUser(model)) {
		System.out.println("User Registered is Successfully...");
	} else {
		System.out.println("Registration Failed!!!");
	}
*/