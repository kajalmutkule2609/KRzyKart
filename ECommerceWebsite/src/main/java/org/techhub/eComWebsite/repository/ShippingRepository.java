package org.techhub.eComWebsite.repository;

import java.util.*;

public interface ShippingRepository {
	 boolean createShipping(java.sql.Date shippingDate, java.sql.Date estimatedDeliveryDate, int orderId);
	    Optional<Map<String, Object>> getShippingByOrderId(int orderId);
	    boolean updateEstimatedDeliveryDate(int shippingId, java.sql.Date newDate);
	    boolean deleteShipping(int shippingId);
	    Optional<List<Map<String, Object>>> getAllShippings();
}
