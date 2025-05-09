package org.techhub.eComWebsite.utility;

public class UserQuery {
	public static String addUser="Insert into User (fullName,email,contactNo,Role,password,address) values(?,?,?,?,?,?)";
	public static String viewUser="Select * from User";
	public static String searchByEmail="Select * from User where email=?";
	public static String deleteByEmail="delete from User where email=?";
	public static String updateByEmail="UPDATE User SET fullName = ?, contactNo = ?,Address=? WHERE email = ?";
	public static String getPasswordByEmail="SELECT Password FROM User WHERE email = ?";
	public static String updatePasswordByEmail="Update User Set Password=? where email=?";
	public static String getUserIdByEmail="SELECT userId FROM User WHERE email = ?";
}
