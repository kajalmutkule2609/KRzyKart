package org.techhub.eComWebsite.repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.batch.BatchProperties.Jdbc;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.techhub.eComWebsite.Model.UserModel;
import org.techhub.eComWebsite.utility.UserQuery;

@Repository("userRepo")
public class UserRepositoryImp implements UserRepository{

	List<UserModel> list;
	@Autowired
	private JdbcTemplate jdbcTemplate;
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Override
	public boolean registerNewUser(UserModel model) {
	    String hashedPassword = passwordEncoder.encode(model.getPassword());
	    model.setPassword(hashedPassword);
	    int result = jdbcTemplate.update(UserQuery.addUser,
	            new PreparedStatementSetter() {
	                @Override
	                public void setValues(PreparedStatement ps) throws SQLException {
	                    ps.setString(1, model.getFullName());
	                    ps.setString(2, model.getEmail());
	                    ps.setString(3, model.getContactNo());
	                    ps.setString(4, model.getRole());
	                    ps.setString(5, model.getPassword());
	                    ps.setString(6, model.getAddress());
	                }
	            });
	    return result > 0;
	}


	@Override
	public List<UserModel> getAllUser() {
		list=jdbcTemplate.query(UserQuery.viewUser,new RowMapper<UserModel>() {

			@Override
			public UserModel mapRow(ResultSet rs, int rowNum) throws SQLException {
				UserModel model=new UserModel();
				model.setUserId(rs.getInt(1));
				model.setFullName(rs.getString(2));
				model.setEmail(rs.getString(3));
				model.setContactNo(rs.getString(4));
				model.setRole(rs.getString(5));
				model.setPassword(rs.getString(6));
				model.setAddress(rs.getString(7));
				return model;
			}
			
		});
		return list;
	}
	
	@Override
	public UserModel searchUserByEmailId(String email) {
		list=jdbcTemplate.query(UserQuery.searchByEmail,new Object [] {email},new RowMapper<UserModel>() {

			@Override
			public UserModel mapRow(ResultSet rs, int rowNum) throws SQLException {
				UserModel model=new UserModel();
				model.setUserId(rs.getInt(1));
				model.setFullName(rs.getString(2));
				model.setEmail(rs.getString(3));
				model.setContactNo(rs.getString(4));
				model.setRole(rs.getString(5));
				model.setPassword(rs.getString(6));
				model.setAddress(rs.getString(7));
				return model;
			}
			
		});
		return list.size()>0?list.get(0):null;
	}
	@Override
	public boolean deleteUserByEmail(String email) {
		int result=jdbcTemplate.update(UserQuery.deleteByEmail,new Object [] {email});
		return result>0;
	}
	@Override
		public boolean updateUserByEmail(String email, UserModel model) {
		    try {
		        int result = jdbcTemplate.update(UserQuery.updateByEmail,
		                model.getFullName(), model.getContactNo(),model.getAddress(), email);
		        return result > 0;
		    } catch (DataAccessException e) {
		        return false;
		    }
		}
	@Override
	public UserModel userLogin(String email, String password) {
		
	    try {
	        UserModel user = jdbcTemplate.queryForObject(
	            UserQuery.searchByEmail, 
	            new Object[]{email}, 
	            new RowMapper<UserModel>() {
	                @Override
	                public UserModel mapRow(ResultSet rs, int rowNum) throws SQLException {
	                    UserModel user = new UserModel();
	                    user.setUserId(rs.getLong("userId"));
	                    user.setEmail(rs.getString("email"));
	                    user.setPassword(rs.getString("password"));
	                    return user;
	                }
	            }
	        );

	        System.out.println("Raw Password: " + password);
	        System.out.println("Hashed Password: " + user.getPassword());

	        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
	            System.out.println("Password matches");
	            return user;
	        } else {
	            System.out.println("Password does not match");
	            return null;
	        }
	    } catch (EmptyResultDataAccessException e) {
	        return null;
	    }
	}


	@Override
	public String changePassword(String email, UserModel model) {
	    String currentPasswordHash = jdbcTemplate.queryForObject(UserQuery.getPasswordByEmail, String.class, email);
	    if (passwordEncoder.matches(model.getPassword(), currentPasswordHash)) {
	        return "New password cannot be the same as the old password.";
	    }
	    String hashedPassword = passwordEncoder.encode(model.getPassword());
	    int result = jdbcTemplate.update(UserQuery.updatePasswordByEmail, new Object[] { hashedPassword, email });
	    if (result > 0) {
	        return "Password Changed Successfully...";
	    } else {
	        return "Password not Changed !!! Please Try Again Later";
	    }
	}


	@Override
	public Long getUserIdByEmail(String email) {
	    try {
	        return jdbcTemplate.queryForObject(UserQuery.getUserIdByEmail, Long.class, email);
	    } catch (EmptyResultDataAccessException e) {
	        return null; 
	    }
	}



}
