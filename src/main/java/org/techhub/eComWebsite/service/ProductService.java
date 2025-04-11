package org.techhub.eComWebsite.service;

import java.util.List;

import org.techhub.eComWebsite.Model.ProductModel;

public interface ProductService {
	public boolean addNewProduct(ProductModel product);
	public List<ProductModel> getAllProducts();
	public List<ProductModel> searchProduct(String category);
	public boolean updateProduct(String prodName,ProductModel prod);
	public boolean deleteProduct(String prodName);
	public List<ProductModel> sortProductsByPriceLowToHigh();
	public List<ProductModel> sortProductsByPriceHighToLow();
	public List<ProductModel> searchProductByProductName(String prodName) ;
}
