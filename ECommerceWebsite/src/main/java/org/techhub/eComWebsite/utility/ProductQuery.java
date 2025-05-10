package org.techhub.eComWebsite.utility;

public class ProductQuery {
	public static String addProduct = "INSERT INTO Product (prodName, price, quantity, description, imageUrl, cid, userId) VALUES (?, ?, ?, ?, ?, ?, ?)";
	public static String getAllProducts = " select p.* from product p inner join category c on p.cid=c.cid order by p.cid asc";
	public static String getProductsBySellerId = "SELECT  p.prodName,   p.price,   p.quantity,  p.description,  p.imageUrl,   p.cid,   p.userId FROM product p "
													+ "INNER JOIN User u ON u.userId = p.userId "
													+ "INNER JOIN Category c ON c.cid = p.cid WHERE p.userId = ? ORDER BY p.cid ASC ";
	public static String searchProductByCategory = "Select * from Product p inner join Category c on p.cid=c.cid where c.name=?";
	public static String searchProductByName = "select * from Product where prodName=?";
	public static String updateProductByName = "UPDATE Product SET prodName = ?, price = ?, quantity = ?, description = ?,imageUrl=? WHERE prodName = ?";
	public static String deleteProductByName = "delete from Product Where prodName=?";
	public static String sortProductsByPriceInAsc = "select * from Product order By price asc";
	public static String sortProductsByPriceInDesc = "select * from Product order By price desc";
	public static String getProdIdByName="Select prodId from Product where prodName=? limit 1";
	public static String getProdNameById="Select ProdName from Product where prodId=?";
	public static String getProductByNamePattern = "SELECT * FROM Product WHERE prodName LIKE ?";
	
	public static String sortByPriceInAscWithCategory="select p.* from Product p Inner join Category c on p.cid=c.cid where c.name=?  order By p.price asc";
	public static String sortByPriceInDescWithCategory="select p.* from Product p Inner join Category c on p.cid=c.cid where c.name=?  order By p.price desc";

	public static String getProductsByPriceRange="SELECT p.* FROM Product p INNER JOIN Category c ON p.cid = c.cid WHERE p.price BETWEEN ? AND ? AND c.name = ?";

}
