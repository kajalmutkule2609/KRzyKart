package org.techhub.eComWebsite.service;

import java.util.List;

import org.techhub.eComWebsite.Model.CategoryModel;

public interface CategoryService {
	public boolean addCategory(CategoryModel model);
	public List<CategoryModel> viewAllCategories();
	public CategoryModel searchCategoryByName(String name);
	public boolean deleteCategory(String name);
	public boolean updateCategoryByName(String name,CategoryModel model);
}
