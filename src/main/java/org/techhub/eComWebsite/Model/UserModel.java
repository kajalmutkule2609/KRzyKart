package org.techhub.eComWebsite.Model;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserModel {
	private long userId;
	private String fullName;
	private String email;
	private String contactNo;
	private String role;
	 private String password;
}
