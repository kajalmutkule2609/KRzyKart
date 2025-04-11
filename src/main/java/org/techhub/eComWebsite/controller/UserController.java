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
import org.techhub.eComWebsite.Model.OTPRequest;
import org.techhub.eComWebsite.Model.OtpCache;
import org.techhub.eComWebsite.Model.UserContext;
import org.techhub.eComWebsite.Model.UserModel;
import org.techhub.eComWebsite.dbConfiguration.OTPGenerator;
import org.techhub.eComWebsite.exceptions.UserNotFoundException;
import org.techhub.eComWebsite.service.EmailSenderService;
import org.techhub.eComWebsite.service.UserServiceImp;

@RestController
@RequestMapping("/ECommerceWebsite/User")
@CrossOrigin("http://localhost:5173")
public class UserController {
	@Autowired
	private UserServiceImp userService;
	
	@Autowired
	private EmailSenderService emailSender;
	
	@GetMapping("/check")
	public String check() {
		return "Okay";
	}
	
	@PostMapping("/createUser")
	public String createUser(@RequestBody UserModel model) {
		boolean b=userService.registerNewUser(model);
		if(b) {
			return "User Registered Successfully....";
		}
		else {
			return "User not Registered !!!";
		}
	}
	@GetMapping("/getUser")
	public List<UserModel> getUser() throws UserNotFoundException {
		List<UserModel> list=userService.getAllUser();
		if(list.size()!=0) {
			return list;
		}
		else {
			throw new UserNotFoundException("There is No Registered User !!");
		}
	}
	@GetMapping("/SearchUserByEmail/{email}")
	public UserModel searchUserByEmailId(@PathVariable("email") String email) throws UserNotFoundException {
		UserModel model=userService.searchUserByEmailId(email);
		if(model!=null) {
			return model;
		}
		else {
			throw new UserNotFoundException("User not found");
		}
		
	}
	@DeleteMapping("/deleteUser/{email}")
	public String deleteUserByEmail(@PathVariable("email") String email) {
		boolean b=userService.deleteUserByEmail(email);
		if(b) {
			return "Account Deleted Successfully";
		}
		else {
			return "Account Not Deleted";
		}
		
	}
	@PutMapping("/updateUser/{email}")
	public String updateUserByEmail(@PathVariable("email") String email, @RequestBody UserModel model) {
	    boolean updated = userService.updateUserByEmail(email, model);
	    if (updated) {
	        return "User updated successfully";
	    } else {
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
    public String userLogin(@PathVariable("email") String email, @PathVariable("password") String password) {
	    UserModel user = userService.userLogin(email, password);
	    if(user != null) {
	        UserContext.userId = user.getUserId(); // or UserContext.getInstance().setUserId(user.getId());
	        return "Logged in Successfully. Your User ID is: " + user.getUserId();
	    } else {
	        return "Login Failed !!";
	    }
	}



	@PutMapping("/changePassword/{email}")
	public String changePassword(@PathVariable ("email") String email,@RequestBody UserModel model) {
		if(userService.changePassword(email, model)) {
			return "Password Changed Successfully...";
		}
		else {
			return "Password not Changed !!! Please Try Again Later";
		}
	}
	private Map<String, String> otpCache = new HashMap<>();


	 @PostMapping("/generate-otp/{email}")
	    public String generateOtp(@PathVariable ("email") String email) {
	        String otp = OTPGenerator.generateOTP(6);
	        OtpCache.storeOtp(email, otp);
	        emailSender.sendEmail(email, "OTP for Verification", "Your OTP is: " + otp);
	        return "OTP sent to your email";
	    }



	@PostMapping("/verify-otp")
	public String verifyOtp(@RequestBody OTPRequest otpRequest) {
	    String storedOtp = OtpCache.getOtp(otpRequest.getEmail());
	    if (storedOtp != null && storedOtp.equals(otpRequest.getOtp())) {
	        return "OTP verified successfully";
	    } else {
	        return "Invalid OTP";
	    }
	}




	

}
