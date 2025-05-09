package org.techhub.eComWebsite.Model;
import lombok.Data;

@Data
public class OrderItemsModel {
	private int itemId;
	private double price;
	private int quantity;
	private int orderId;
	private int pid;
}
