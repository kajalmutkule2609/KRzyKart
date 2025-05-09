package org.techhub.eComWebsite.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.techhub.eComWebsite.Model.PaymentModel;
import org.techhub.eComWebsite.repository.PaymentRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/ECommerceWebsite/Payment")
@CrossOrigin("http://localhost:5173")
public class PaymentController {

    @Autowired
    PaymentRepository paymentRepo;

    @PostMapping("/create")
    public String createPayment(@RequestBody PaymentModel model) {
        boolean b = paymentRepo.createPayment(model.getPaymentMethod(), model.getPaymentDate(), model.getAmount().doubleValue(), model.getOrderId());
        return b ? "Payment created" : "Payment failed";
    }

    @GetMapping("/getByOrderId/{orderId}")
    public ResponseEntity<Map<String, Object>> getByOrderId(@PathVariable int orderId) {
        Optional<Map<String, Object>> data = paymentRepo.getPaymentByOrderId(orderId);
        return data.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.noContent().build());
    }

    @PutMapping("/updateMethod/{paymentId}")
    public String updatePaymentMethod(@PathVariable int paymentId, @RequestBody String newMethod) {
        return paymentRepo.updatePaymentMethod(paymentId, newMethod) ? "Payment method updated" : "Update failed";
    }

    @DeleteMapping("/delete/{paymentId}")
    public String deletePayment(@PathVariable int paymentId) {
        return paymentRepo.deletePayment(paymentId) ? "Payment deleted" : "Deletion failed";
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Map<String, Object>>> getAllPayments() {
        Optional<List<Map<String, Object>>> data = paymentRepo.getAllPayments();
        return data.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.noContent().build());
    }
}
