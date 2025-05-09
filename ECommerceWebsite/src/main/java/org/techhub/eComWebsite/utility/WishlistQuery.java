package org.techhub.eComWebsite.utility;

public class WishlistQuery {
	public static String addToWishlist = "INSERT INTO Wishlist ( addedDate, userId, pid) VALUES (?, ?, ?)";
	public static String getWishlistDataByUserId = "SELECT w.wishId, p.prodName, p.imageUrl, p.price FROM wishlist w JOIN product p ON w.pid = p.prodId WHERE w.userId = ?";
	public static String checkWishlistItem = "SELECT wishId FROM wishlist WHERE userId = ? AND pid = ?";
    
	public static String getAllWishlistedItems="Select w.wishId, p.prodName, p.imageUrl, p.price, w.userId " +
            "FROM Wishlist w JOIN product p ON w.pid = p.prodId";

	
	public static String removeFromWishlist="Delete From wishlist Where wishId=?";
	
	public static String getMyWishlist="Select * from Wishlist w inner join Product p on w.pid=p.prodId where w.userId=?";
}
