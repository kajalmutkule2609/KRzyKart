package org.techhub.eComWebsite.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.techhub.eComWebsite.Configuration.OTPGenerator;
import org.techhub.eComWebsite.Model.OTPRequest;
import org.techhub.eComWebsite.Model.OtpCache;
import org.techhub.eComWebsite.Model.UserContext;
import org.techhub.eComWebsite.Model.UserModel;
import org.techhub.eComWebsite.exceptions.UserNotFoundException;
import org.techhub.eComWebsite.service.EmailSenderService;
import org.techhub.eComWebsite.service.UserServiceImp;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/ECommerceWebsite/User")
@CrossOrigin("http://localhost:5173")
public class UserController {
	@Autowired
	private UserServiceImp userService;

	@Autowired
	private EmailSenderService emailSender;

	@PostMapping("/createUser")
	public ResponseEntity<Map<String, String>> createUser(@RequestBody UserModel model) {
		boolean b = userService.registerNewUser(model);
		Map<String, String> response = new HashMap<>();
		if (b) {
			response.put("message", "User Registered Successfully....");
			response.put("status", "success");
			log.info("User Registered Sucessfully..");
			return ResponseEntity.ok(response);
		} else {
			response.put("message", "User already exists with the given details.");
			response.put("status", "error");
			log.error("Registration failed !!!");
			return ResponseEntity.badRequest().body(response);
		}
	}

	@GetMapping("/getUser")
	public List<UserModel> getUser() throws UserNotFoundException {
		List<UserModel> list = userService.getAllUser();
		if (list.size() != 0) {
			log.info("User Data Fetched");
			return list;
		} else {
			log.error("No Data Found!!");
			throw new UserNotFoundException("There is No Registered User !!");
		}
	}

	@GetMapping("/SearchUserByEmail/{email}")
	public UserModel searchUserByEmailId(@PathVariable("email") String email) throws UserNotFoundException {
		UserModel model = userService.searchUserByEmailId(email);
		if (model != null) {
			log.info("User Found with email :"+email);
			return model;
		} else {
			log.error("User not found with email:"+email);
			throw new UserNotFoundException("User not found");
		}

	}
	
	@GetMapping("/gerUserIdByEmail/{email}")
	public Long getuseridbyEmail(@PathVariable("email") String email) {
		Long result=userService.getUserIdByEmail(email);
		if(result>0) {
			log.info("UserId Fetched Sucessfully...");
			return result; 
		}
		else {
			log.error("UserId not Found!! ");
			return null;
		}
		
	}
	@DeleteMapping("/deleteUser/{email}")
	public String deleteUserByEmail(@PathVariable("email") String email) {
		boolean b = userService.deleteUserByEmail(email);
		if (b) {
			log.info("User Account Deleted Sucessfully...");
			return "Account Deleted Successfully";
		} else {
			log.error("Account not deleted!!");
			return "Account Not Deleted";
		}

	}

	@PutMapping("/updateUser/{email}")
	public String updateUserByEmail(@PathVariable("email") String email, @RequestBody UserModel model) {
		boolean updated = userService.updateUserByEmail(email, model);
		if (updated) {
			log.info("User Updated with email:"+email);
			return "User updated successfully";
		} else {
			log.error("User not Updated!!");
			return "User not updated";
		}
	}

//	
//	@GetMapping("/userLogin/{email}/{password}")
//	public String userLogin(@PathVariable ("email") String email, @PathVariable ("password")String password) {
//		boolean b=userService.userLogin(email, password);
//		if(b) {
//			return "Logged in Sucessfully";
//		}
//		else {
//			return "Login Failed !!";
//		}
//	}
	@GetMapping("/userLogin/{email}/{password}")
	public ResponseEntity<UserModel> userLogin(@PathVariable("email") String email,
			@PathVariable("password") String password) {
		UserModel user = userService.userLogin(email, password);
		if (user != null) {
			UserContext.userId = user.getUserId();
			log.info("User Logged In Sucessfully..");
			return ResponseEntity.ok(user);
		} else {
			log.error("Login Failed!!");
			return ResponseEntity.badRequest().build();
		}
	}

	@PutMapping("/changePassword/{email}")
	public String changePassword(@PathVariable("email") String email, @RequestBody UserModel model) {
		String result=userService.changePassword(email, model);
		if(result!=null) {
			log.info("Password Changed..");
			return "Password Updated Sucessfully";
		}
		else {
			log.error("Password not updated !");
			return "Password not updated !!";
		}
	    
	}




	private Map<String, String> otpCache = new HashMap<>();

	@PostMapping("/generate-otp/{email}")
	public String generateOtp(@PathVariable("email") String email) {
		String otp = OTPGenerator.generateOTP(6);
		OtpCache.storeOtp(email, otp);
		emailSender.sendEmail(email, "OTP for Verification", "Your OTP is: " + otp);
		log.debug("OTP sent to Email:"+email);
		return "OTP sent to your email";
	}

	@PostMapping("/verify-otp")
	public String verifyOtp(@RequestBody OTPRequest otpRequest) {
		String storedOtp = OtpCache.getOtp(otpRequest.getEmail());
		if (storedOtp != null && storedOtp.equals(otpRequest.getOtp())) {
			log.info("Otp Verified");
			return "OTP verified successfully";
		} else {
			log.error("Invalid Otp Entered!!");
			return "Invalid OTP";
		}
	}

}
