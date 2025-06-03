package org.techhub.eComWebsite.utility;

public class OrderQuery {
	public static String createOrder = "Insert into Orders (orderDate,userId,total,status) values(?,?,?,?)";
	public static String getOrderById = "Select * from Orders where OrderId=?";
	public static String getAllOrdersByUserId = "Select o.orderId,o.orderDate,o.total,o.status from Orders o inner join User u on o.userId=u.userId where o.userId=?";
	public static String updateOrderStatus = "Update Orders set Status=? where OrderId=?";
	public static String cancelOrder = "Delete From Orders where OrderId=?";
	public static String getAllOrders = "Select * from orders";
	
	public static String getOrderTotalByOrderId="Select total from Orders where orderId=?";
	//OrderItemsQuery
	public static String addOrderItems="Insert into OrderItems(price,quantity,orderId,pid) values(?,?,?,?)";
	public static String getOrderItemsByOrderId="Select oi.itemId,oi.price,oi.quantity,oi.pid from OrderItems oi inner join Orders o on o.orderId=oi.orderId  where oi.orderId=?";
	public static String updateItemQuantity="Update OrderItems set quantity=? where itemId=?";
	public static String removeItemFromOrder="Delete From OrderItems where itemId=?";
	public static String getItemsByProductId = "Select o.itemId,p.prodId,p.prodName,p.imageUrl,o.price,o.quantity from OrderItems o inner join Product p on o.pid=p.prodid where o.pid=?";
}
