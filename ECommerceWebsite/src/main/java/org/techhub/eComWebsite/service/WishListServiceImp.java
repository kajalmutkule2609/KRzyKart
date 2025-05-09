package org.techhub.eComWebsite.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.techhub.eComWebsite.repository.WishListRepositoryImp;

@Service("wishListService")
public class WishListServiceImp implements WishListService{
	@Autowired
	WishListRepositoryImp wishListRepo;

	@Override
	public boolean addToWishlist(Long userId, int pid) {
		return wishListRepo.addToWishlist(userId, pid);
	}

	@Override
	public Optional<List<Map<String, Object>>> viewWishlistByUserId(Long userId) {
		return wishListRepo.viewWishlistByUserId(userId);
	}

	@Override
	public Optional<List<Map<String, Object>>> viewAllWishlistItems() {
		return wishListRepo.viewAllWishlistItems();
	}

	@Override
	public boolean deleteWishlistItem(int wishId) {
		return wishListRepo.deleteWishlistItem(wishId);
	}
}
