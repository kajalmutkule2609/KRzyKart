package org.techhub.eComWebsite.Model;

import lombok.Data;

@Data
public class OTPRequest {
	private String email;
	private String otp;
}
