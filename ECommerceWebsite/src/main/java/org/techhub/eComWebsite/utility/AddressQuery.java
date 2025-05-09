package org.techhub.eComWebsite.utility;

public class AddressQuery {
	public static String addAddress="INSERT INTO address (name, addressLine1, addressLine2, city, state, pinCode, country, addressType, userId) VALUES (?,?,?,?,?,?,?,?,?)";
	public static String updateAddress="UPDATE address SET name=?, addressLine1=?, addressLine2=?, city=?, state=?, pinCode=?, country=?, addressType=? WHERE addressId=?";
	public static String deleteAddress= "DELETE FROM address WHERE addressId=?";
	public static String getAddressById="SELECT * FROM address WHERE addressId=?";
	public static String getAddressByUserId="SELECT * FROM address WHERE userId=?";
}
