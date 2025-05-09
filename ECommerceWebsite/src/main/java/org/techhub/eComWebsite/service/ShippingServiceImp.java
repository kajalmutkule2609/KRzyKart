package org.techhub.eComWebsite.service;

import java.sql.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.techhub.eComWebsite.repository.ShippingRepositoryImp;

@Service("shippingService")
public class ShippingServiceImp implements ShippingService {
	@Autowired
	ShippingRepositoryImp shippingRepo;

	@Override
	public boolean createShipping(Date shippingDate, Date estimatedDeliveryDate, int orderId) {
		return shippingRepo.createShipping(shippingDate, estimatedDeliveryDate, orderId);
	}

	@Override
	public Optional<Map<String, Object>> getShippingByOrderId(int orderId) {
		return shippingRepo.getShippingByOrderId(orderId);
	}

	@Override
	public boolean updateEstimatedDeliveryDate(int shippingId, Date newDate) {
		return shippingRepo.updateEstimatedDeliveryDate(shippingId, newDate);
	}

	@Override
	public boolean deleteShipping(int shippingId) {
		return shippingRepo.deleteShipping(shippingId);
	}

	@Override
	public Optional<List<Map<String, Object>>> getAllShippings() {
		return shippingRepo.getAllShippings();
	}
}
