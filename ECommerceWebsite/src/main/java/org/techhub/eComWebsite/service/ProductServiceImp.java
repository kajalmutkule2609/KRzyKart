package org.techhub.eComWebsite.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.techhub.eComWebsite.Model.ProductModel;
import org.techhub.eComWebsite.repository.ProductRepositoryImp;

@Service("prodService")
public class ProductServiceImp implements ProductService {
	@Autowired
	ProductRepositoryImp prodRepo;

	@Override
	public boolean addNewProduct(ProductModel product) {
		return prodRepo.addNewProduct(product);
	}

	@Override
	public List<ProductModel> getAllProducts() {
		return prodRepo.getAllProducts();
	}

	@Override
	public List<ProductModel> searchProduct(String category) {
		return prodRepo.searchProduct(category);
	}

	@Override
	public boolean updateProduct(String prodName, ProductModel prod, MultipartFile image) {
		return prodRepo.updateProduct(prodName,prod,image);
	}

	@Override
	public boolean deleteProduct(String prodName) {
		return prodRepo.deleteProduct(prodName);
	}

	@Override
	public List<ProductModel> sortProductsByPriceLowToHigh() {
		return prodRepo.sortProductsByPriceLowToHigh();
	}

	@Override
	public List<ProductModel> sortProductsByPriceHighToLow() {
		return prodRepo.sortProductsByPriceHighToLow();
	}

	@Override
	public List<ProductModel> searchProductByProductName(String prodName) {
		return prodRepo.searchProductByProductName(prodName);
	}

	@Override
	public List<ProductModel> getProductsBySellerId(Long userId) {
		return prodRepo.getProductsBySellerId(userId);
	}

	@Override
	public int getProdIdByName(String prodName) {
		return prodRepo.getProdIdByName(prodName);
	}

	@Override
	public String getProdNameById(int pid) {
		return prodRepo.getProdNameById(pid);
	}

	@Override
	public List<ProductModel> searchProductByNamePattern(String prodName) {
		return prodRepo.searchProductByNamePattern(prodName);
	}

	@Override
	public List<ProductModel> sortProductsByPriceLowToHighByCategory(String category) {
		return prodRepo.sortProductsByPriceLowToHighByCategory(category);
	}

	@Override
	public List<ProductModel> sortProductsByPriceHighToLowByCategory(String category) {
		return prodRepo.sortProductsByPriceHighToLowByCategory(category);
	}

	@Override
	public List<ProductModel> getProductsByPriceRange(int range1, int range2, String category) {
		return prodRepo.getProductsByPriceRange(range1, range2, category);
	}

	@Override
	public List<ProductModel> getAllProductsByPriceRange(int range1, int range2) {
		return prodRepo.getAllProductsByPriceRange(range1, range2);
	}

	@Override
	public List<ProductModel> searchProductByDescPattern(String desc) {
		return prodRepo.searchProductByDescPattern(desc);
	}
}
