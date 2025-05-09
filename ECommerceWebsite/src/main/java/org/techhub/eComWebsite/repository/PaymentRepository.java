package org.techhub.eComWebsite.repository;

import java.util.*;

public interface PaymentRepository {
	 boolean createPayment(String paymentMethod, java.time.LocalDateTime paymentDate, double amount, int orderId);
	    Optional<Map<String, Object>> getPaymentByOrderId(int orderId);
	    boolean updatePaymentMethod(int paymentId, String newMethod);
	    boolean deletePayment(int paymentId);
	    Optional<List<Map<String, Object>>> getAllPayments();
}
