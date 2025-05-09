package org.techhub.eComWebsite.Model;

import lombok.Data;

@Data
public class CartModel {
	private int cartId;
	private int quantity;
	private String addedDate;
	private long userId;
	private int pid;
	
}
