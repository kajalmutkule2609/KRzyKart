package org.techhub.eComWebsite.repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.techhub.eComWebsite.Model.CategoryModel;

@Repository("categoryRepo")
public class CategoryRepositoryImp implements CategoryRepository {
	@Autowired
	JdbcTemplate jdbcTemplate;
	
	List <CategoryModel>list;

	@Override
	public boolean addCategory(CategoryModel model) {
		int result=jdbcTemplate.update("Insert into Category values('0',?,?)",new PreparedStatementSetter() {

			@Override
			public void setValues(PreparedStatement ps) throws SQLException {
				ps.setString(1,model.getName());
				ps.setString(2, model.getDescription());
				
			}
			
		});
		return result>0;
	}

	@Override
	public List<CategoryModel> viewAllCategories() {
		list=jdbcTemplate.query("Select * from Category",new RowMapper<CategoryModel>() {

			@Override
			public CategoryModel mapRow(ResultSet rs, int rowNum) throws SQLException {
				CategoryModel model=new CategoryModel();
				model.setCid(rs.getInt(1));
				model.setName(rs.getString(2));
				model.setDescription(rs.getString(3));
				return model;
			}
			
		});
		return list;
	}

	@Override
	public CategoryModel searchCategoryByName(String name) {
		list=jdbcTemplate.query("Select * from Category where name=?",new Object[] {name},new RowMapper<CategoryModel>() {

			@Override
			public CategoryModel mapRow(ResultSet rs, int rowNum) throws SQLException {
				CategoryModel model=new CategoryModel();
				model.setCid(rs.getInt(1));
				model.setName(rs.getString(2));
				model.setDescription(rs.getString(3));
				return model;
			}
			
		});
		return list.size()>0?list.get(0):null;
	}

	@Override
	public boolean deleteCategory(String name) {
		int result=jdbcTemplate.update("Delete from Category where name=?",new Object[] {name});
		return result>0;
	}

	@Override
	public boolean updateCategoryByName(String name, CategoryModel model) {
	    int result = jdbcTemplate.update("Update Category Set Name=?, Description=? where Name=?",
	            new Object[]{model.getName(), model.getDescription(), name});
	    return result > 0;
	}


	@Override
	public int getCategoryIdByName(String name) {
	    return jdbcTemplate.queryForObject("select cid from Category where name=?", new Object[]{name}, Integer.class);
	}


}
