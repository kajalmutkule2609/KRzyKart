package org.techhub.eComWebsite.service;

import java.util.*;

public interface ShippingService {
	 boolean createShipping(java.sql.Date shippingDate, java.sql.Date estimatedDeliveryDate, int orderId);
	    Optional<Map<String, Object>> getShippingByOrderId(int orderId);
	    boolean updateEstimatedDeliveryDate(int shippingId, java.sql.Date newDate);
	    boolean deleteShipping(int shippingId);
	    Optional<List<Map<String, Object>>> getAllShippings();
}
