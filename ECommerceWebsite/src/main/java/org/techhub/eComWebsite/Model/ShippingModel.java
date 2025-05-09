package org.techhub.eComWebsite.Model;


import java.sql.Date;

import lombok.Data;

@Data
public class ShippingModel {
	private int shippingId;
	private Date shippingDate;
	private Date esitamedDeliveryDate;
	private int orderId;
}	
