package org.techhub.eComWebsite.utility;

public class CategoryQuery {
	public static String addCategory = "Insert into Category values('0',?,?)";
	public static String getAllCategories = "Select * from Category";
	public static String searchCategoryByName = "Select * from Category where name=?";
	public static String deleteCategoryByName = "delete from Category where name=?";
	public static String updateCategoryByName = "Update Category Set Name=?, Description=? where Name=?";
	public static String getCategoryIdByName = "select cid from Category where name=?";
}
