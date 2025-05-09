package org.techhub.eComWebsite.utility;

public class ShippingQuery {
	 public static String createShipping = "INSERT INTO shipping (shippingDate, estimatedDeliveryDate, orderId) VALUES (?, ?, ?)";
	    public static String getShippingByOrderId = "SELECT * FROM shipping WHERE orderId = ?";
	    public static String updateEstimatedDelivery = "UPDATE shipping SET estimatedDeliveryDate = ? WHERE shippingId = ?";
	    public static String deleteShippingById = "DELETE FROM shipping WHERE shippingId = ?";
	    public static String getAllShippings = "SELECT * FROM shipping";
}
