package org.techhub.eComWebsite.Model;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductModel {
	private int prodId;
	private String prodName;
	private double price;
	private int quantity;
	private String description;
	private String imageUrl;
	private int cid;
	private long userId;
}
