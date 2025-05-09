package org.techhub.eComWebsite.repository;

import java.sql.PreparedStatement;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.techhub.eComWebsite.Model.OrderItemsModel;
import org.techhub.eComWebsite.Model.OrderModel;
import org.techhub.eComWebsite.utility.CartQuery;
import org.techhub.eComWebsite.utility.OrderQuery;

@Repository("OrderRepo")
public class OrderRepositoryImp implements OrderRepository{
	@Autowired
	JdbcTemplate jdbcTemplate;

	@Override
//	public boolean createOrder(Long userId, double total, String status) {
//		return jdbcTemplate.update(OrderQuery.createOrder,new java.sql.Date(System.currentTimeMillis()),userId,total,status)>0;
//	}	
	public int createOrder(Long userId, double total, String status) {
	    String insertQuery = OrderQuery.createOrder;

	    KeyHolder keyHolder = new GeneratedKeyHolder();

	    jdbcTemplate.update(connection -> {
	        PreparedStatement ps = connection.prepareStatement(insertQuery, new String[]{"orderId"});
	        ps.setDate(1, new java.sql.Date(System.currentTimeMillis())); 
	        ps.setLong(2, userId); 
	        ps.setDouble(3, total); 
	        ps.setString(4, status);
	        return ps;
	    }, keyHolder);

	
	    return keyHolder.getKey() != null ? keyHolder.getKey().intValue() : 0;
	}

	@Override
	public Optional<Map<String, Object>> getOrderById(int orderId) {
	    List<Map<String, Object>> items = jdbcTemplate.queryForList(OrderQuery.getOrderById, orderId);
	    return items.isEmpty() ? Optional.empty() : Optional.of(items.get(0));
	}


	@Override
	public Optional<List<Map<String, Object>>> getAllOrdersByUserId(Long userId) {
		   List<Map<String, Object>> items = jdbcTemplate.queryForList(OrderQuery.getAllOrdersByUserId, userId);
		    return items.isEmpty() ? Optional.empty() : Optional.of(items);	}

	@Override
	public boolean updateOrderStatus(int orderId, String status) {
		return jdbcTemplate.update(OrderQuery.updateOrderStatus, status, orderId) > 0;
	}

	@Override
	public boolean deleteOrder(int orderId) {
		return jdbcTemplate.update(OrderQuery.cancelOrder,orderId)>0;
	}

	@Override
	public Optional<List<Map<String, Object>>> getAllOrders() {
		List<Map<String, Object>> items = jdbcTemplate.queryForList(OrderQuery.getAllOrders);
	    return items.isEmpty() ? Optional.empty() : Optional.of(items);	
	}

	@Override
	public boolean addItemToOrder(int orderId, int pid, int quantity, double price) {
		return jdbcTemplate.update(OrderQuery.addOrderItems,price,quantity,orderId,pid)>0;
	}

	@Override
	public Optional<List<Map<String, Object>>> getItemsByOrderId(int orderId) {
		List<Map<String, Object>> items = jdbcTemplate.queryForList(OrderQuery.getOrderItemsByOrderId, orderId);
	    return items.isEmpty() ? Optional.empty() : Optional.of(items);
	}

	@Override
	public boolean updateItemQuantity(int orderItemId, int quantity) {
		return jdbcTemplate.update(OrderQuery.updateItemQuantity,orderItemId,quantity)>0;
	}

	@Override
	public boolean removeItemFromOrder(int orderItemId) {
		return jdbcTemplate.update(OrderQuery.removeItemFromOrder,orderItemId)>0;
	}

	@Override
	public Optional<List<Map<String, Object>>> getItemsByProductId(int pid) {
		List<Map<String, Object>> items = jdbcTemplate.queryForList(OrderQuery.getItemsByProductId, pid);
	    return items.isEmpty() ? Optional.empty() : Optional.of(items);
	}

	@Override
	public Double getOrderTotalByOrderId(int orderId) {
		return jdbcTemplate.queryForObject(OrderQuery.getOrderTotalByOrderId,new Object[]{orderId},Double.class);
	}

	
	

}
