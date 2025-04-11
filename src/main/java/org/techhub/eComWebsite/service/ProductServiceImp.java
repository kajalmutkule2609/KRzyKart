package org.techhub.eComWebsite.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
	public boolean updateProduct(String prodName,ProductModel prod) {
		return prodRepo.updateProduct(prodName,prod);
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
}
