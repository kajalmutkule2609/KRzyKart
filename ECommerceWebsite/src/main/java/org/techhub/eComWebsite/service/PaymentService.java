package org.techhub.eComWebsite.service;

import java.util.*;

public interface PaymentService {
	 boolean createPayment(String paymentMethod, java.time.LocalDateTime paymentDate, double amount, int orderId);
	    Optional<Map<String, Object>> getPaymentByOrderId(int orderId);
	    boolean updatePaymentMethod(int paymentId, String newMethod);
	    boolean deletePayment(int paymentId);
	    Optional<List<Map<String, Object>>> getAllPayments();
}
