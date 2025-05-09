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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.techhub.eComWebsite.Model.WishListModel;
import org.techhub.eComWebsite.service.WishListServiceImp;

@RequestMapping("/ECommerceWebsite/Wishlist")
@CrossOrigin("http://localhost:5173")
@RestController
public class WishListController {
	@Autowired
	WishListServiceImp wishListService;
	

	@PostMapping("/addToWishlist")
	public String addToWishlist(@RequestBody WishListModel model) {
		//System.out.println("UserId:"+model.getUserId()+"ProductId:"+model.getPId());
		if(wishListService.addToWishlist(model.getUserId(),model.getPId())) {
			//System.out.println("UserId:"+model.getUserId()+"ProductId:"+model.getPId());
			return "Product Added to Wishlist";
		}
		else {
			return "Product not added to Wishlist";
		}
	}
	@GetMapping("/getMyWishlistData/{userId}")
	public ResponseEntity<List<Map<String, Object>>> getMyWishlistData(@PathVariable Long userId) {
	    Optional<List<Map<String, Object>>> itemsOpt = wishListService.viewWishlistByUserId(userId);    
	    return itemsOpt
	        .map(ResponseEntity::ok)  
	        .orElseGet(() -> ResponseEntity.noContent().build());  
	}
	@GetMapping("/viewAllWishlistData")
	public ResponseEntity<List<Map<String, Object>>> viewAllWishlistData() {
	    Optional<List<Map<String, Object>>> itemsOpt = wishListService.viewAllWishlistItems();

	    return itemsOpt
	        .map(ResponseEntity::ok)  
	        .orElseGet(() -> ResponseEntity.noContent().build());  
	}
	@DeleteMapping("/removeFromWishlist/{WishlistId}")
	public String removeItem(@PathVariable int WishlistId) {
		if(wishListService.deleteWishlistItem(WishlistId)) {
			return "Item Removed";
		}
		else {
			return "Item not Removed";
		}
	}
}
