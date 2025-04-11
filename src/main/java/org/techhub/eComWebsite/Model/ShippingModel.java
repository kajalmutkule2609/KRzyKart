package org.techhub.eComWebsite.Model;
import lombok.Data;

@Data
public class ShippingModel {
	private int shippingId;
	private String shippingDate;
	private String esitamedDeliveryDate;
	private int orderId;
}	
