package org.techhub.eComWebsite.Model;
import lombok.Data;

@Data
public class OrderModel {
	private int orderId;
	private String orderDate;
	private double total;
	private String status;
	private long userId;
	
}
