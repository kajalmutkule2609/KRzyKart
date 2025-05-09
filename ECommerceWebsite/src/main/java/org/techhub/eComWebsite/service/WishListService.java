package org.techhub.eComWebsite.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface WishListService {
	public boolean addToWishlist(Long userId, int pid) ;
	public Optional<List<Map<String, Object>>> viewWishlistByUserId(Long userId);
	public Optional<List<Map<String, Object>>> viewAllWishlistItems() ;
	public boolean deleteWishlistItem(int wishId);
}
