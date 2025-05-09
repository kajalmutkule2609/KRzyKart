package org.techhub.eComWebsite.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.techhub.eComWebsite.Model.OrderItemsModel;
import org.techhub.eComWebsite.Model.OrderModel;
import org.techhub.eComWebsite.service.OrderService;
import org.techhub.eComWebsite.service.OrderServiceImp;

@RequestMapping("/ECommerceWebsite/Order")
@CrossOrigin("http://localhost:5173")
@RestController
public class OrderController {
	@Autowired
	OrderServiceImp orderService;
	
	@PostMapping("/createOrder")
	public ResponseEntity<Map<String, Object>> createOrder(@RequestBody OrderModel model) {
	    int orderId = orderService.createOrder(model.getUserId(), model.getTotal(), model.getStatus());

	    Map<String, Object> response = new HashMap<>();
	    response.put("orderId", orderId);
	    response.put("message", "Order Created");

	    return ResponseEntity.ok(response);
	}

	@GetMapping("/getOrderById/{orderId}")
	public ResponseEntity<Map<String, Object>> getOrderById(@PathVariable int orderId) {
	    Optional<Map<String, Object>> itemOpt = orderService.getOrderById(orderId);
	    return itemOpt
	        .map(ResponseEntity::ok)
	        .orElseGet(() -> ResponseEntity.noContent().build());
	}
	@GetMapping("/getAllOrdersByUserId/{userId}")
	public ResponseEntity<List<Map<String, Object>>> viewAllOrdersByUserId(@PathVariable Long userId) {
	    Optional<List<Map<String, Object>>> itemsOpt = orderService.getAllOrdersByUserId(userId);
	    return itemsOpt
	        .map(ResponseEntity::ok)  
	        .orElseGet(() -> ResponseEntity.noContent().build());  
	}

	@PutMapping("/updateOrderStatus/{orderId}")
	public String updateOrderStatus(@PathVariable("orderId") int orderId, @RequestBody Map<String, String> body) {
	    String status = body.get("status");
	    if (orderService.updateOrderStatus(orderId, status)) {
	        return "Status Updated to " + status;
	    } else {
	        return "Order Status Not Updated";
	    }
	}
	
	@DeleteMapping("cancelOrder/{orderId}")
	public String cancelOrder(@PathVariable int orderId) {
		if(orderService.deleteOrder(orderId)) {
			return "Order Cancelled Sucessfully..";
		}
		else {
			return "Order not cancelled";
		}
	}
	
	@GetMapping("/getAllOrders")
	public ResponseEntity<List<Map<String, Object>>> getAllOrders(){
	    Optional<List<Map<String, Object>>> itemsOpt = orderService.getAllOrders();
	    return itemsOpt
	        .map(ResponseEntity::ok)  
	        .orElseGet(() -> ResponseEntity.noContent().build());  
	}
	@PostMapping("/addOrderItems")
	public ResponseEntity<Map<String, Object>> addOrderItems(@RequestBody OrderItemsModel model) {
	    boolean added = orderService.addItemToOrder(model.getOrderId(), model.getPid(), model.getQuantity(), model.getPrice());

	    Map<String, Object> response = new HashMap<>();
	    if (added) {
	        response.put("success", true);
	        response.put("message", "Order item added successfully.");
	        return ResponseEntity.ok(response);
	    } else {
	        response.put("success", false);
	        response.put("message", "Failed to add order item.");
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	    }
	}

	@GetMapping("/getItemsByOrderId/{orderId}")
	public ResponseEntity<List<Map<String, Object>>> getItemsByOrderId(@PathVariable int orderId) {
	    Optional<List<Map<String, Object>>> itemsOpt = orderService.getItemsByOrderId(orderId);
	    return itemsOpt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.noContent().build());
	}

	@PutMapping("/updateItemQuantity/{itemId}")
	public String updateItemQuantity(@PathVariable int itemId, @RequestBody Map<String, Integer> body) {
	    int quantity = body.get("quantity");
	    if (orderService.updateItemQuantity(itemId, quantity)) {
	        return "Quantity updated";
	    } else {
	        return "Update failed";
	    }
	}

	@DeleteMapping("/removeItemFromOrder/{itemId}")
	public String removeItemFromOrder(@PathVariable int itemId) {
	    if (orderService.removeItemFromOrder(itemId)) {
	        return "Item removed";
	    } else {
	        return "Item not removed";
	    }
	}
	
	@GetMapping("/order-total/{orderId}")
	public ResponseEntity<Double> getOrderTotalByOrderId(@PathVariable int orderId) {
	    Double total = orderService.getOrderTotalByOrderId(orderId); 
	    return ResponseEntity.ok(total);
	}


}
