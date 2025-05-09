package org.techhub.eComWebsite.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.techhub.eComWebsite.utility.PaymentQuery;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository("paymentRepo")
public class PaymentRepositoryImp implements PaymentRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public boolean createPayment(String paymentMethod, LocalDateTime paymentDate, double amount, int orderId) {
        return jdbcTemplate.update(PaymentQuery.createPayment, paymentMethod, paymentDate, amount, orderId) > 0;
    }

    @Override
    public Optional<Map<String, Object>> getPaymentByOrderId(int orderId) {
        List<Map<String, Object>> list = jdbcTemplate.queryForList(PaymentQuery.getPaymentByOrderId, orderId);
        return list.isEmpty() ? Optional.empty() : Optional.of(list.get(0));
    }

    @Override
    public boolean updatePaymentMethod(int paymentId, String newMethod) {
        return jdbcTemplate.update(PaymentQuery.updatePaymentMethod, newMethod, paymentId) > 0;
    }

    @Override
    public boolean deletePayment(int paymentId) {
        return jdbcTemplate.update(PaymentQuery.deletePaymentById, paymentId) > 0;
    }

    @Override
    public Optional<List<Map<String, Object>>> getAllPayments() {
        List<Map<String, Object>> list = jdbcTemplate.queryForList(PaymentQuery.getAllPayments);
        return list.isEmpty() ? Optional.empty() : Optional.of(list);
    }
}
