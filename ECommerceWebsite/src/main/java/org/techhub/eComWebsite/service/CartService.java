package org.techhub.eComWebsite.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface CartService {
	public boolean addToCart(Long userId, int pid, int quantity) ;
	public Optional<List<Map<String, Object>>> viewCartItemsByUserId(Long userId);
	public Optional<List<Map<String, Object>>> viewAllCartItems();
	public boolean incrementQuantity(int cartId);
	public boolean decrementQuantity(int cartId);
	public boolean deleteCartItem(int cartId);
	public boolean deleteCartItemByPid(int pId);
}
