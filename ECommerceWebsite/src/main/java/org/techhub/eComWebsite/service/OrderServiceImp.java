package org.techhub.eComWebsite.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.techhub.eComWebsite.Model.OrderItemsModel;
import org.techhub.eComWebsite.Model.OrderModel;
import org.techhub.eComWebsite.repository.OrderRepositoryImp;

@Service("orderService")
public class OrderServiceImp implements OrderService{
	@Autowired
	OrderRepositoryImp orderRepo;

	@Override
	public int createOrder(Long userId, double total, String status) {
		return orderRepo.createOrder(userId, total, status);
	}

	@Override
	public Optional<Map<String, Object>> getOrderById(int orderId) {
		return orderRepo.getOrderById(orderId);
	}

	@Override
	public Optional<List<Map<String, Object>>> getAllOrdersByUserId(Long userId) {
		return orderRepo.getAllOrdersByUserId(userId);
	}

	@Override
	public boolean updateOrderStatus(int orderId, String status) {
		return orderRepo.updateOrderStatus(orderId, status);
	}

	@Override
	public boolean deleteOrder(int orderId) {
		return orderRepo.deleteOrder(orderId);
	}

	@Override
	public Optional<List<Map<String, Object>>> getAllOrders() {
		return orderRepo.getAllOrders();
	}

	@Override
	public boolean addItemToOrder(int orderId, int pid, int quantity, double price) {
		return orderRepo.addItemToOrder(orderId, pid, quantity, price);
	}

	@Override
	public Optional<List<Map<String, Object>>> getItemsByOrderId(int orderId) {
		return orderRepo.getItemsByOrderId(orderId);
	}

	@Override
	public boolean updateItemQuantity(int orderItemId, int quantity) {
		return orderRepo.updateItemQuantity(orderItemId, quantity);
	}

	@Override
	public boolean removeItemFromOrder(int orderItemId) {
		return orderRepo.removeItemFromOrder(orderItemId);
	}

	@Override
	public Optional<List<Map<String, Object>>> getItemsByProductId(int pid) {
		return orderRepo.getItemsByProductId(pid);
	}

	@Override
	public Double getOrderTotalByOrderId(int orderId) {
		return orderRepo.getOrderTotalByOrderId(orderId);
	}

	
}
