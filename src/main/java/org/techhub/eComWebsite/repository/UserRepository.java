package org.techhub.eComWebsite.repository;

import java.util.List;

import org.techhub.eComWebsite.Model.*;

public interface UserRepository {
	public boolean registerNewUser(UserModel model);
	public List<UserModel> getAllUser();
	public UserModel searchUserByEmailId(String email);
	public boolean deleteUserByEmail(String email);
	public boolean updateUserByEmail(String email,UserModel model);
	public UserModel userLogin(String email,String password);
	public boolean changePassword(String email,UserModel model);
}
