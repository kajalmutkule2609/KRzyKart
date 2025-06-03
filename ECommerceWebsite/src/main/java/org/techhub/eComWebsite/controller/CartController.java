package org.techhub.eComWebsite.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.techhub.eComWebsite.Model.CartModel;
import org.techhub.eComWebsite.service.CartServiceImp;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/ECommerceWebsite/Cart")
@CrossOrigin("http://localhost:5173")
@RestController
public class CartController {
	@Autowired
	CartServiceImp cartService;
	
	@PostMapping("/addToCart")
	public String addToCart(@RequestBody CartModel model) {
		if(cartService.addToCart(model.getUserId(),model.getPid(),model.getQuantity())) {
			log.info("Product Added To the cart");
			return "Product Added to Cart";
		}
		else {
			log.error("Failed to add product to cart");
			return "Product not added to cart";
		}
	}
	
	@GetMapping("/getMyCartData/{userId}")
	public ResponseEntity<List<Map<String, Object>>> getMyCartData(@PathVariable Long userId) {
	    Optional<List<Map<String, Object>>> itemsOpt = cartService.viewCartItemsByUserId(userId);    
	    log.info("Fetching Cart Data By UserId");
	    return itemsOpt
	        .map(ResponseEntity::ok)  
	        .orElseGet(() -> ResponseEntity.noContent().build());  
	}
	@GetMapping("/viewAllCartData")
	public ResponseEntity<List<Map<String, Object>>> viewAllCartData() {
	    Optional<List<Map<String, Object>>> itemsOpt = cartService.viewAllCartItems();
	    log.info("Fetching All Carts Data");
	    return itemsOpt
	        .map(ResponseEntity::ok)  
	        .orElseGet(() -> ResponseEntity.noContent().build());  
	}
	@PutMapping("/incrementQty/{cartId}")
	public String incrementQuantity(@PathVariable int cartId) {
		if(cartService.incrementQuantity(cartId)) {
			log.info("Quantity Incremented");
			return "Quantity Incremented";
		}
		else {
			log.error("Quantity Not Incremented");
			return "Quantity not Incremented";
		}
	}
	@PutMapping("/decrementQty/{cartId}")
	public String decrementQuantity(@PathVariable int cartId) {
		if(cartService.decrementQuantity(cartId)) {
			log.info("Quantity decremented");
			return "Quantity Decremented";
		}
		else {
			log.error("Quantity Not decremented");
			return "Quantity not Decremented";
		}
	}
	@DeleteMapping("/removeFromCart/{cartId}")
	public String removeItem(@PathVariable int cartId) {
		if(cartService.deleteCartItem(cartId)) {
			log.info("Removing Items From Cart By CartId");
			return "Item Removed";
		}
		else {
			log.error("Failed to Remove Item From Cart By CartId");
			return "Item not Removed";
		}
	}
	@DeleteMapping("/removeFromCartByPid/{pId}")
	public String removeCartItem(@PathVariable int pId) {
		if(cartService.deleteCartItemByPid(pId)) {
			log.info("Removing Items From Cart By pId");
			return "Item Removed";
		}
		else {
			log.error("Failed to Remove Item From Cart By pId");
			return "Item not Removed";
		}
	}
	@DeleteMapping("/removeFromCartByUserId/{userId}")
	public String removeCartItemByUserId(@PathVariable Long userId) {
		if(cartService.deleteCartItemByUserId(userId)) {
			log.info("Removing Items From Cart By userId");
			return "Item Removed";
		}
		else {
			log.error("Failed to Remove Item From Cart By CartId");
			return "Item not Removed";
		}
	}

}
