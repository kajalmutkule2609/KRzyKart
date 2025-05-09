package org.techhub.eComWebsite.utility;

public class PaymentQuery {
	public static String createPayment = "INSERT INTO payment (paymentMethod, paymentDate, amount, orderId) VALUES (?, ?, ?, ?)";
    public static String getPaymentByOrderId = "SELECT * FROM payment WHERE orderId = ?";
    public static String updatePaymentMethod = "UPDATE payment SET paymentMethod = ? WHERE paymentId = ?";
    public static String deletePaymentById = "DELETE FROM payment WHERE paymentId = ?";
    public static String getAllPayments = "SELECT * FROM payment";
}
