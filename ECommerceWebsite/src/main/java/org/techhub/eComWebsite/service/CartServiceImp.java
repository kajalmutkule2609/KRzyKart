package org.techhub.eComWebsite.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.techhub.eComWebsite.repository.CartRepositoryImp;

@Service("cartService")
public class CartServiceImp implements CartService{
	@Autowired
	CartRepositoryImp cartRepo;

	@Override
	public boolean addToCart(Long userId, int pid, int quantity) {
		return cartRepo.addToCart(userId, pid, quantity);
	}

	@Override
	public Optional<List<Map<String, Object>>> viewCartItemsByUserId(Long userId) {
		return cartRepo.viewCartItemsByUserId(userId);
	}

	@Override
	public Optional<List<Map<String, Object>>> viewAllCartItems() {
		return cartRepo.viewAllCartItems();
	}

	@Override
	public boolean incrementQuantity(int cartId) {
		return cartRepo.incrementQuantity(cartId);
	}

	@Override
	public boolean decrementQuantity(int cartId) {
		return cartRepo.decrementQuantity(cartId);
	}

	@Override
	public boolean deleteCartItem(int cartId) {
		return cartRepo.deleteCartItem(cartId);
	}

	@Override
	public boolean deleteCartItemByPid(int pId) {
		return cartRepo.deleteCartItemByPid(pId);
	}

	@Override
	public boolean deleteCartItemByUserId(Long userId) {
		return cartRepo.deleteCartItemByUserId(userId);
	}
}
