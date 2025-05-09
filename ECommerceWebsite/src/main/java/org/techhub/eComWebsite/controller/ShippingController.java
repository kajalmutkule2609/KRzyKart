package org.techhub.eComWebsite.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.techhub.eComWebsite.Model.ShippingModel;
import org.techhub.eComWebsite.repository.ShippingRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/ECommerceWebsite/Shipping")
@CrossOrigin("http://localhost:5173")
public class ShippingController {

    @Autowired
    ShippingRepository shippingRepo;

    @PostMapping("/create")
    public String createShipping(@RequestBody ShippingModel model) {
        boolean b = shippingRepo.createShipping(model.getShippingDate(), model.getEsitamedDeliveryDate(), model.getOrderId());
        return b ? "Shipping created" : "Failed to create shipping";
    }

    @GetMapping("/getByOrderId/{orderId}")
    public ResponseEntity<Map<String, Object>> getShippingByOrderId(@PathVariable int orderId) {
        Optional<Map<String, Object>> data = shippingRepo.getShippingByOrderId(orderId);
        return data.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.noContent().build());
    }

    @PutMapping("/updateEstimatedDate/{shippingId}")
    public String updateEstimatedDelivery(@PathVariable int shippingId, @RequestBody java.sql.Date newDate) {
        boolean updated = shippingRepo.updateEstimatedDeliveryDate(shippingId, newDate);
        return updated ? "Estimated Delivery Date Updated" : "Update Failed";
    }

    @DeleteMapping("/delete/{shippingId}")
    public String deleteShipping(@PathVariable int shippingId) {
        return shippingRepo.deleteShipping(shippingId) ? "Shipping deleted" : "Delete failed";
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Map<String, Object>>> getAllShippings() {
        Optional<List<Map<String, Object>>> data = shippingRepo.getAllShippings();
        return data.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.noContent().build());
    }
}
