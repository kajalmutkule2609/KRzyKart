package org.techhub.eComWebsite.service;

import java.util.*;
import java.util.Optional;

import org.techhub.eComWebsite.Model.OrderItemsModel;
import org.techhub.eComWebsite.Model.OrderModel;

public interface OrderService {
	    int createOrder(Long userId, double total, String status);
	    Optional<Map<String, Object>> getOrderById(int orderId);
	    Optional<List<Map<String, Object>>> getAllOrdersByUserId(Long userId);
	    boolean updateOrderStatus(int orderId, String status);
	    boolean deleteOrder(int orderId);
	    Optional<List<Map<String, Object>>> getAllOrders();
	    boolean addItemToOrder(int orderId, int pid, int quantity, double price);
	    Optional<List<Map<String, Object>>> getItemsByOrderId(int orderId);
	    boolean updateItemQuantity(int orderItemId, int quantity);
	    boolean removeItemFromOrder(int orderItemId);
	    Optional<List<Map<String, Object>>> getItemsByProductId(int pid);
	    public Double getOrderTotalByOrderId(int orderId);
	   
}
