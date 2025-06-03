package org.techhub.eComWebsite.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.techhub.eComWebsite.Model.ProductModel;
import org.techhub.eComWebsite.service.ProductServiceImp;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/ECommerceWebsite/Product")
@CrossOrigin("http://localhost:5173")
public class ProductController {
	@Autowired
	ProductServiceImp prodService;
	
		
	@PostMapping("/addProduct")
	public ResponseEntity<String> addProduct(@ModelAttribute ProductModel product) {
	    boolean isAdded = prodService.addNewProduct(product);
	    if(isAdded) {
	    	log.info("Product Added");
	    	return ResponseEntity.ok("Product added successfully");
	    }
	    else {
	    	log.error("Failed to Add Product");
	    	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add product");
	    }
	}

	
	@GetMapping("/getAllProducts")
//	@RequestMapping("/User")
	public List<ProductModel> getAllProducts() {
		log.debug("Fetching Products..");
	    return prodService.getAllProducts();
	}
	@GetMapping("/getProductsBySellerId/{userId}")
	public List<ProductModel> getProductsBySellerId(@PathVariable ("userId") Long userId) {
		log.debug("Fetching Products By Seller Id..");
	    return prodService.getProductsBySellerId(userId);
	}
	@GetMapping("/getProductsByCategory/{category}")
	public List<ProductModel> searchProductByCategory(@PathVariable ("category") String category){
		log.debug("Fetching Products by category..");
		return prodService.searchProduct(category);	
	}
	@GetMapping("/getProductByPriceLowToHigh")
	public List<ProductModel> sortByPriceLowToHigh(){
		log.info("Sorting Products By Price Low to High");
		return prodService.sortProductsByPriceLowToHigh();
	}
	@GetMapping("/getProductByPriceHighToLow")
	public List<ProductModel> sortByPriceHightoLow(){
		log.info("Sorting Products By Price High to Low");
		return prodService.sortProductsByPriceHighToLow();
	}
	@GetMapping("/getProductsByProductName/{prodName}")
	public List<ProductModel> searchProductByName(@PathVariable ("prodName") String prodName){
		log.info("Fetching Products By Product Name");
		return prodService.searchProductByProductName(prodName);	
	}
	@DeleteMapping("/deleteProduct/{prodName}")
	public String deleteProductByName(@PathVariable ("prodName") String prodName) {
		boolean b=prodService.deleteProduct(prodName);
		if(b) {
			log.info("Product Deleted Sucessfully..");
			return "Product Deleted Successfully";
		}
		else {
			log.error("Product Not Deleted");
			return "Product Not Deleted";
		}
		
	}
	@PutMapping("/updateProduct/{prodName}")
	public String updateProduct(
	    @PathVariable("prodName") String prodName,
	    @RequestPart("product") ProductModel model,
	    @RequestPart(value = "image", required = false) MultipartFile image) {
	    
	    boolean b = prodService.updateProduct(prodName, model, image);
	    if(b) {
	    	log.info("Product Updated..");
	    	return "product updated successfully...";
	    }
	    else {
	    	log.error("Product Updation Failed!!");
	    	return "Product not updated";
	    }
	}


	
	@GetMapping("/getProdIdByName/{prodName}")
    public ResponseEntity<Integer> getProdIdByName(@PathVariable String prodName) {
        int prodId = prodService.getProdIdByName(prodName);
        if (prodId == -1) {
        	log.error("Product Not Found!!!");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        log.info("Product Found..");
        return new ResponseEntity<>(prodId, HttpStatus.OK);
    }

	@GetMapping("/getProdNameById/{prodId}")
    public ResponseEntity<String> getProdIdByName(@PathVariable int prodId) {
        String prodName=prodService.getProdNameById(prodId);
        if (prodName == null) {
        	log.error("Product Not Found!!!");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        log.info("Product Found..");
        return new ResponseEntity<>(prodName, HttpStatus.OK);
    }
	
	@GetMapping("/getProductsByProductNamePattern/{prodName}")
	public List<ProductModel> searchProductByNamePattern(@PathVariable ("prodName") String prodName){
		log.info("Fetching Products by product name pattern.");
		return prodService.searchProductByNamePattern(prodName);	
	}
	@GetMapping("/sortProductByPriceLowToHighByCategory/{name}")
	public List<ProductModel> sortByPriceLowToHighByCategory(@PathVariable ("name")String name){
		log.info("Sorting Products by price low to high with category");
		return prodService.sortProductsByPriceLowToHighByCategory(name);
	}
	@GetMapping("/sortProductByPriceHighToLowByCategory/{name}")
	public List<ProductModel> sortByPriceHighToLowByCategory(@PathVariable ("name")String name){
		log.info("Fetching Products by price high to low with category");
		return prodService.sortProductsByPriceHighToLowByCategory(name);
	}
	@GetMapping("/filterByPriceRange")
    public ResponseEntity<List<ProductModel>> getProductsByPriceRange(@RequestParam int min,@RequestParam int max,@RequestParam String category) {
        List<ProductModel> products = prodService.getProductsByPriceRange(min, max, category);
        log.info("Filtering Products By Price Range with category");
        return ResponseEntity.ok(products);
    }
	@GetMapping("/filterAllByPriceRange")
    public ResponseEntity<List<ProductModel>> getAllProductsByPriceRange(@RequestParam int min,@RequestParam int max) {
        List<ProductModel> products = prodService.getAllProductsByPriceRange(min, max);
        log.info("Filtering Products By Price Range");
        return ResponseEntity.ok(products);
    }
	@GetMapping("/getProductsByDescPattern/{description}")
	public List<ProductModel> searchProductByDescPattern(@PathVariable ("description") String description){
		log.info("fetching product data by description pattern");
		return prodService.searchProductByDescPattern(description);	
	}
}
