package org.techhub.eComWebsite.repository;

import java.util.List;

import org.techhub.eComWebsite.Model.ProductModel;

public interface ProductRepository {
	public boolean addNewProduct(ProductModel product);
	public List<ProductModel> getAllProducts();
	public List<ProductModel> getProductsBySellerId(Long userId);
	public List<ProductModel> searchProductByProductName(String productName);
	public List<ProductModel> searchProduct(String category);
	public boolean updateProduct(String prodName,ProductModel prod);
	public boolean deleteProduct(String prodName);
	public List<ProductModel> sortProductsByPriceLowToHigh();
	public List<ProductModel> sortProductsByPriceHighToLow();
	public int getProdIdByName(String prodName);
	public String getProdNameById(int pid);
	public List<ProductModel> searchProductByNamePattern(String prodName);
	public List<ProductModel> sortProductsByPriceLowToHighByCategory(String category);
	public List<ProductModel> sortProductsByPriceHighToLowByCategory(String category);
	public List<ProductModel> getProductsByPriceRange(int range1,int range2,String category);
}
