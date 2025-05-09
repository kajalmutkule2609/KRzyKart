package org.techhub.eComWebsite.repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.techhub.eComWebsite.Model.CartModel;
import org.techhub.eComWebsite.utility.CartQuery;

@Repository("cartRepo")
public class CartRepositoryImp implements CartRepository{
	@Autowired
	JdbcTemplate jdbcTemplate;
	
	public boolean addToCart(Long userId, int pid, int quantity) {
       
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(CartQuery.getCartDetailsByUserIdAndPid, userId, pid);

        if (!rows.isEmpty()) {
            int existingCartId = (int) rows.get(0).get("cartId");
            int existingQuantity = (int) rows.get(0).get("quantity");

            int newQuantity = existingQuantity + quantity;

            return jdbcTemplate.update(CartQuery.updateQtyBycartId, newQuantity, existingCartId)>0;
        } else {
            
            return jdbcTemplate.update(CartQuery.addToCart, quantity, new java.sql.Date(System.currentTimeMillis()), userId, pid)>0;
        }
    }
	public Optional<List<Map<String, Object>>> viewCartItemsByUserId(Long userId) {
	   
	    List<Map<String, Object>> items = jdbcTemplate.queryForList(CartQuery.getCartDataByUserId, userId);

	    return items.isEmpty() ? Optional.empty() : Optional.of(items);
	}
	public Optional<List<Map<String, Object>>> viewAllCartItems() {
	    List<Map<String, Object>> items = jdbcTemplate.queryForList(CartQuery.getAllCartsData);

	    return items.isEmpty() ? Optional.empty() : Optional.of(items);
	}
	@Override
	public boolean incrementQuantity(int cartId) {
		
		    Integer currentQuantity = jdbcTemplate.queryForObject(CartQuery.getQuantityBycartId, Integer.class, cartId);
		    
		    if (currentQuantity != null) {
		        int newQuantity = currentQuantity + 1;
		        
		        return jdbcTemplate.update(CartQuery.updateQtyBycartId, newQuantity, cartId) > 0;
		    }
		    return false;
	}
	@Override
	public boolean decrementQuantity(int cartId) {
		Integer currentQuantity = jdbcTemplate.queryForObject(CartQuery.getQuantityBycartId, Integer.class, cartId);
	    
	    if (currentQuantity != null && currentQuantity>0) {
	        int newQuantity = currentQuantity - 1;
	        
	        return jdbcTemplate.update(CartQuery.updateQtyBycartId, newQuantity, cartId) > 0;
	    }
	    return false;
	}
	@Override
	public boolean deleteCartItem(int cartId) {
		return jdbcTemplate.update(CartQuery.removeFromCart, cartId)>0;
	}
	@Override
	public boolean deleteCartItemByPid(int pId) {
		return jdbcTemplate.update(CartQuery.removeFromCartByprodId, pId)>0;
	}


}
