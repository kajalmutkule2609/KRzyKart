package org.techhub.eComWebsite.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.techhub.eComWebsite.Model.UserModel;
import org.techhub.eComWebsite.repository.UserRepository;
import org.techhub.eComWebsite.repository.UserRepositoryImp;

@Service("userService")
public class UserServiceImp implements UserService{
	@Autowired
	private UserRepositoryImp userRepo;

	@Override
	public boolean registerNewUser(UserModel model) {
		return userRepo.registerNewUser(model);
	}

	@Override
	public List<UserModel> getAllUser() {
		return userRepo.getAllUser();
	}

	@Override
	public UserModel searchUserByEmailId(String email) {
		return userRepo.searchUserByEmailId(email);
	}

	@Override
	public boolean deleteUserByEmail(String email) {
		return userRepo.deleteUserByEmail(email);
	}

	@Override
	public boolean updateUserByEmail(String email,UserModel model) {
		return userRepo.updateUserByEmail(email,model);
	}

	@Override
	public UserModel userLogin(String email, String password) {
		return userRepo.userLogin(email, password);
	}

	@Override
	public boolean changePassword(String email,UserModel model){
		return userRepo.changePassword(email,model);
	}
}
