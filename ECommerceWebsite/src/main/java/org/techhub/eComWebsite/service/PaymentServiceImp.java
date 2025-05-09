package org.techhub.eComWebsite.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.techhub.eComWebsite.repository.PaymentRepositoryImp;

@Service("paymentService")
public class PaymentServiceImp implements PaymentService{
	@Autowired
	PaymentRepositoryImp paymentRepo;

	@Override
	public boolean createPayment(String paymentMethod, LocalDateTime paymentDate, double amount, int orderId) {
		return paymentRepo.createPayment(paymentMethod, paymentDate, amount, orderId);
	}

	@Override
	public Optional<Map<String, Object>> getPaymentByOrderId(int orderId) {
		return paymentRepo.getPaymentByOrderId(orderId);
	}

	@Override
	public boolean updatePaymentMethod(int paymentId, String newMethod) {
		return paymentRepo.updatePaymentMethod(paymentId, newMethod);
	}

	@Override
	public boolean deletePayment(int paymentId) {
		return paymentRepo.deletePayment(paymentId);
	}

	@Override
	public Optional<List<Map<String, Object>>> getAllPayments() {
		return paymentRepo.getAllPayments();
	}
	
}
