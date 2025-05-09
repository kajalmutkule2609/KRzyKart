package org.techhub.eComWebsite.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.techhub.eComWebsite.utility.ShippingQuery;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository("shippingRepo")
public class ShippingRepositoryImp implements ShippingRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public boolean createShipping(java.sql.Date shippingDate, java.sql.Date estimatedDeliveryDate, int orderId) {
        return jdbcTemplate.update(ShippingQuery.createShipping, shippingDate, estimatedDeliveryDate, orderId) > 0;
    }

    @Override
    public Optional<Map<String, Object>> getShippingByOrderId(int orderId) {
        List<Map<String, Object>> list = jdbcTemplate.queryForList(ShippingQuery.getShippingByOrderId, orderId);
        return list.isEmpty() ? Optional.empty() : Optional.of(list.get(0));
    }

    @Override
    public boolean updateEstimatedDeliveryDate(int shippingId, java.sql.Date newDate) {
        return jdbcTemplate.update(ShippingQuery.updateEstimatedDelivery, newDate, shippingId) > 0;
    }

    @Override
    public boolean deleteShipping(int shippingId) {
        return jdbcTemplate.update(ShippingQuery.deleteShippingById, shippingId) > 0;
    }

    @Override
    public Optional<List<Map<String, Object>>> getAllShippings() {
        List<Map<String, Object>> list = jdbcTemplate.queryForList(ShippingQuery.getAllShippings);
        return list.isEmpty() ? Optional.empty() : Optional.of(list);
    }
}
