package org.techhub.eComWebsite.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.techhub.eComWebsite.Model.CategoryModel;
import org.techhub.eComWebsite.exceptions.CategoryNotFoundException;
import org.techhub.eComWebsite.service.CategoryServiceImp;

@RestController
@RequestMapping("/ECommerceWebsite/Category")
@CrossOrigin("http://localhost:5173")
public class CategoryController {

	@Autowired
	CategoryServiceImp categoryService;
	@GetMapping("/check")
	public String checkMapping() {
		return "Mapped";
	}
	
	@PostMapping("/addCategory")
	public String addCategory(@RequestBody CategoryModel model) {
		if(categoryService.addCategory(model)) {
			return "Category Added Successfully..";
		}
		else {
		return "Category not Added";
		}
	}
	@GetMapping("/viewAllCategories")
	public List<CategoryModel> viewAllCategories(){
		return categoryService.viewAllCategories();
	}
	
	@GetMapping("/searchCategoryByName/{name}")
	public CategoryModel searchCategoryByName(@PathVariable ("name") String name) {
		CategoryModel model=categoryService.searchCategoryByName(name);
		if(model!=null) {
			return model;
		}
		else {
			throw new CategoryNotFoundException("Category not found!");
		}
		
	}
	
	@DeleteMapping("/deleteCategory/{name}")
	public String deleteCategoryByName(@PathVariable ("name") String name) {
		if( categoryService.deleteCategory(name)) {
			return "Category Deleted Successfully...";
		}
		else {
			return "Category not deleted !!";
		}
	}
	@PutMapping("/updateCategory/{name}")
	public String UpdateCategoryByName(@PathVariable ("name") String name,@RequestBody CategoryModel model) {
		if(categoryService.updateCategoryByName(name, model)) {
			return "Category Updated Successfully";
		}
		else {
			return "Category not  Updated!!";
		}
	}
}
