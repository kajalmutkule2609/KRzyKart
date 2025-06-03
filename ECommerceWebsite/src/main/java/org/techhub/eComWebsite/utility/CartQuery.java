package org.techhub.eComWebsite.utility;

public class CartQuery {
	public static String addToCart = "INSERT INTO cart (quantity, addedDate, userId, pid) VALUES (?, ?, ?, ?)";
	public static String updateQtyBycartId = "UPDATE cart SET quantity = ? WHERE cartId = ?";
	public static String getCartDetailsByUserIdAndPid = "Select cartId, quantity FROM cart WHERE userId = ? AND pid = ?";
	public static String getCartDataByUserId = "Select c.cartId, p.prodName, p.imageUrl, p.price, c.quantity "
			+ "FROM cart c JOIN product p ON c.pid = p.prodId WHERE c.userId = ?";
	
	public static String getAllCartsData="Select c.cartId, p.prodName, p.imageUrl, p.price, c.quantity, c.userId " +
            "FROM cart c JOIN product p ON c.pid = p.prodId";
	
	public static String getQuantityBycartId="Select quantity FROM cart WHERE cartId = ?";
	
	public static String removeFromCart="Delete From Cart Where cartId=?";
	public static String removeFromCartByprodId="Delete from Cart where pid=?";
	
	public static String removeFromCartByUserId="Delete from cart where userId=?";
}


