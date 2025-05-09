package org.techhub.eComWebsite.repository;

import java.util.List;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.techhub.eComWebsite.utility.CartQuery;
import org.techhub.eComWebsite.utility.WishlistQuery;

@Repository("wishListRepo")
public class WishListRepositoryImp implements WishListRepository{
	@Autowired
	JdbcTemplate jdbcTemplate;
	@Override
	public boolean addToWishlist(Long userId, int pid) {
	    // Check if the product exists in the product table
	    String checkProductQuery = "SELECT COUNT(*) FROM product WHERE prodId = ?";
	    Integer count = jdbcTemplate.queryForObject(checkProductQuery, Integer.class, pid);

	    if (count != null && count > 0) {
	        // Product exists, proceed with adding to wishlist
	        String checkWishlistQuery = "SELECT wishId FROM wishlist WHERE userId = ? AND pid = ?";
	        List<Map<String, Object>> rows = jdbcTemplate.queryForList(checkWishlistQuery, userId, pid);

	        if (rows.isEmpty()) {
	            String addToWishlistQuery = "INSERT INTO wishlist (addedDate, userId, pid) VALUES (?, ?, ?)";
	            return jdbcTemplate.update(addToWishlistQuery, new java.sql.Date(System.currentTimeMillis()), userId, pid) > 0;
	        }
	    }
	    // Product does not exist in the product table or already exists in the wishlist
	    return false;
	}


	@Override
	public Optional<List<Map<String, Object>>> viewWishlistByUserId(Long userId) {
		  List<Map<String, Object>> items = jdbcTemplate.queryForList(WishlistQuery.getMyWishlist, userId);

		return items.isEmpty() ? Optional.empty() : Optional.of(items);
	}

	@Override
	public Optional<List<Map<String, Object>>> viewAllWishlistItems() {
		List<Map<String, Object>> items = jdbcTemplate.queryForList(WishlistQuery.getAllWishlistedItems);
		
		return items.isEmpty() ? Optional.empty() : Optional.of(items);
	}

	@Override
	public boolean deleteWishlistItem(int wishId) {
		return jdbcTemplate.update(WishlistQuery.removeFromWishlist, wishId)>0;
	}
}
