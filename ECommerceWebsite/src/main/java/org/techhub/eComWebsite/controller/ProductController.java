package org.techhub.eComWebsite.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import org.techhub.eComWebsite.Model.ProductModel;
import org.techhub.eComWebsite.service.ProductServiceImp;

@RestController
@RequestMapping("/ECommerceWebsite/Product")
@CrossOrigin("http://localhost:5173")
public class ProductController {
	@Autowired
	ProductServiceImp prodService;
	
	@GetMapping("/checkData")
	public String checkData() {
		return "success";
	}
	
	
	@PostMapping("/addProduct")
	public String addNewProduct(@RequestBody ProductModel model) {
		boolean b=prodService.addNewProduct(model);
		if(b) {
			return "Product Added Successfully";
		}
		else {
			return "product not added";
		}
	}
	
	@GetMapping("/getAllProducts")
	public List<ProductModel> getAllProducts() {
	    return prodService.getAllProducts();
	}
	@GetMapping("/getProductsBySellerId/{userId}")
	public List<ProductModel> getProductsBySellerId(@PathVariable ("userId") Long userId) {
	    return prodService.getProductsBySellerId(userId);
	}
	@GetMapping("/getProductsByCategory/{category}")
	public List<ProductModel> searchProductByCategory(@PathVariable ("category") String category){
		return prodService.searchProduct(category);	
	}
	@GetMapping("/getProductByPriceLowToHigh")
	public List<ProductModel> sortByPriceLowToHigh(){
		return prodService.sortProductsByPriceLowToHigh();
	}
	@GetMapping("/getProductByPriceHighToLow")
	public List<ProductModel> sortByPriceHightoLow(){
		return prodService.sortProductsByPriceHighToLow();
	}
	@GetMapping("/getProductsByProductName/{prodName}")
	public List<ProductModel> searchProductByName(@PathVariable ("prodName") String prodName){
		return prodService.searchProductByProductName(prodName);	
	}
	@DeleteMapping("/deleteProduct/{prodName}")
	public String deleteProductByName(@PathVariable ("prodName") String prodName) {
		boolean b=prodService.deleteProduct(prodName);
		if(b) {
			return "Product Deleted Successfully";
		}
		else {
			return "Product Not Deleted";
		}
		
	}
	@PutMapping("/updateProduct/{prodName}")
	public String updateProduct(@PathVariable ("prodName") String prodName,@RequestBody ProductModel model) {
		boolean b=prodService.updateProduct(prodName, model);
		if(b) {
			return "product updated sucessfully...";
		}
		else {
			return "Product not updated";
		}
	}
	
	@GetMapping("/getProdIdByName/{prodName}")
    public ResponseEntity<Integer> getProdIdByName(@PathVariable String prodName) {
        int prodId = prodService.getProdIdByName(prodName);
        if (prodId == -1) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(prodId, HttpStatus.OK);
    }

	@GetMapping("/getProdNameById/{prodId}")
    public ResponseEntity<String> getProdIdByName(@PathVariable int prodId) {
        String prodName=prodService.getProdNameById(prodId);
        if (prodName == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(prodName, HttpStatus.OK);
    }
	
}
