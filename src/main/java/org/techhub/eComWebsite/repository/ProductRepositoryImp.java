package org.techhub.eComWebsite.repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.techhub.eComWebsite.Model.ProductModel;
import org.techhub.eComWebsite.Model.UserContext;

@Repository("prodRepo")
public class ProductRepositoryImp implements ProductRepository {
	@Autowired
	JdbcTemplate jdbcTemplate;
	List<ProductModel> list;

	@Override
	public boolean addNewProduct(ProductModel product) {
		int result=jdbcTemplate.update("Insert into Product Values('0',?,?,?,?,?,?,?)",
			    new PreparedStatementSetter() {
	        @Override
	        public void setValues(PreparedStatement ps) throws SQLException {
	            ps.setString(1, product.getProdName());
	            ps.setDouble(2, product.getPrice());
	            ps.setInt(3, product.getQuantity());
	            ps.setString(4, product.getDescription());
	            ps.setString(5, product.getImageUrl());
	            ps.setInt(6, UserContext.cid);
	            ps.setLong(7, UserContext.userId);
	        }
	    });
		return result>0;
	}

	@Override
	public List<ProductModel> getAllProducts() {
		list=jdbcTemplate.query("select * from Product",new RowMapper<ProductModel>() {

			@Override
			public ProductModel mapRow(ResultSet rs, int rowNum) throws SQLException {
				ProductModel model=new ProductModel();
				model.setProdId(rs.getInt(1));
				model.setProdName(rs.getString(2));
				model.setPrice(rs.getDouble(3));
				model.setQuantity(rs.getInt(4));
				model.setDescription(rs.getString(5));
				model.setImageUrl(rs.getString(6));
				model.setCid(rs.getInt(7));
				model.setUserId(rs.getLong(8));
				return model;
			}
			
		});
		return list;
	}

	@Override
	public List<ProductModel> searchProduct(String category) {
		list=jdbcTemplate.query("Select * from Product p "
				+ "inner join Category c on p.cid=c.cid "
				+ "where c.name=?",new Object[] {category},new RowMapper<ProductModel>() {

			@Override
			public ProductModel mapRow(ResultSet rs, int rowNum) throws SQLException {
				ProductModel model=new ProductModel();
				model.setProdId(rs.getInt(1));
				model.setProdName(rs.getString(2));
				model.setPrice(rs.getDouble(3));
				model.setQuantity(rs.getInt(4));
				model.setDescription(rs.getString(5));
				model.setImageUrl(rs.getString(6));
				model.setCid(rs.getInt(7));
				model.setUserId(rs.getLong(8));
				return model;
			}
			
		});
		return list;
	}

	@Override
	public boolean updateProduct(String prodName,ProductModel prod) {
		int	result=jdbcTemplate.update("UPDATE Product SET prodName = ?, price = ?, quantity = ?, description = ?,imageUrl=? WHERE prodName = ?"
				,prod.getProdName(),prod.getPrice(),prod.getQuantity(),prod.getDescription(),prod.getImageUrl(),prodName);
		return result>0;
	}

	@Override
	public boolean deleteProduct(String prodName) {
		int result=jdbcTemplate.update("delete from Product Where prodName=?",new Object[] {prodName});
		return result>0;
	}

	@Override
	public List<ProductModel> sortProductsByPriceLowToHigh() {
		list=jdbcTemplate.query("select * from Product order By price asc", new RowMapper<ProductModel>() {

			@Override
			public ProductModel mapRow(ResultSet rs, int rowNum) throws SQLException {
				ProductModel model=new ProductModel();
				model.setProdId(rs.getInt(1));
				model.setProdName(rs.getString(2));
				model.setPrice(rs.getDouble(3));
				model.setQuantity(rs.getInt(4));
				model.setDescription(rs.getString(5));
				model.setImageUrl(rs.getString(6));
				model.setCid(rs.getInt(7));
				model.setUserId(rs.getLong(8));
				return model;
			}
		});
		return list;
	}

	@Override
	public List<ProductModel> sortProductsByPriceHighToLow() {
		list=jdbcTemplate.query("select * from Product order By price desc", new RowMapper<ProductModel>() {

			@Override
			public ProductModel mapRow(ResultSet rs, int rowNum) throws SQLException {
				ProductModel model=new ProductModel();
				model.setProdId(rs.getInt(1));
				model.setProdName(rs.getString(2));
				model.setPrice(rs.getDouble(3));
				model.setQuantity(rs.getInt(4));
				model.setDescription(rs.getString(5));
				model.setImageUrl(rs.getString(6));
				model.setCid(rs.getInt(7));
				model.setUserId(rs.getLong(8));
				return model;
			}
		});
		return list;
	}

	@Override
	public List<ProductModel> searchProductByProductName(String prodName) {
		list=jdbcTemplate.query("select * from Product where prodName=?",new Object[] {prodName},new RowMapper<ProductModel>() {

			@Override
			public ProductModel mapRow(ResultSet rs, int rowNum) throws SQLException {
				ProductModel model=new ProductModel();
				model.setProdId(rs.getInt(1));
				model.setProdName(rs.getString(2));
				model.setPrice(rs.getDouble(3));
				model.setQuantity(rs.getInt(4));
				model.setDescription(rs.getString(5));
				model.setImageUrl(rs.getString(6));
				model.setCid(rs.getInt(7));
				model.setUserId(rs.getLong(8));
				return model;
			}
			
		});
		return list;
	}
}
