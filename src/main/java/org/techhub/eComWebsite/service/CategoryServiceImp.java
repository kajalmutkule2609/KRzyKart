package org.techhub.eComWebsite.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.techhub.eComWebsite.Model.CategoryModel;
import org.techhub.eComWebsite.repository.CategoryRepositoryImp;

@Service("categoryService")
public class CategoryServiceImp implements CategoryService{
	@Autowired
	CategoryRepositoryImp categoryRepo;

	@Override
	public boolean addCategory(CategoryModel model) {
		return categoryRepo.addCategory(model);
	}

	@Override
	public List<CategoryModel> viewAllCategories() {
		return categoryRepo.viewAllCategories();
	}

	@Override
	public CategoryModel searchCategoryByName(String name) {
		return categoryRepo.searchCategoryByName(name);
	}

	@Override
	public boolean deleteCategory(String name) {
		return categoryRepo.deleteCategory(name);
	}

	@Override
	public boolean updateCategoryByName(String name,CategoryModel model) {
		return categoryRepo.updateCategoryByName(name,model);
	}
}
