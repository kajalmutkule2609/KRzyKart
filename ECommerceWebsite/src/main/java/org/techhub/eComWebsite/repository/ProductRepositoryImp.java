package org.techhub.eComWebsite.repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.techhub.eComWebsite.Model.ProductModel;
import org.techhub.eComWebsite.Model.UserContext;
import org.techhub.eComWebsite.utility.ProductQuery;

@Repository("prodRepo")
public class ProductRepositoryImp implements ProductRepository {
	@Autowired
	JdbcTemplate jdbcTemplate;
	List<ProductModel> list;

	@Override
	public boolean addNewProduct(ProductModel product) {
		int result=jdbcTemplate.update(ProductQuery.addProduct,  new PreparedStatementSetter() {
	        @Override
	        public void setValues(PreparedStatement ps) throws SQLException {
	            ps.setString(1, product.getProdName());
	            ps.setDouble(2, product.getPrice());
	            ps.setInt(3, product.getQuantity());
	            ps.setString(4, product.getDescription());
	            ps.setString(5, product.getImageUrl());
	            ps.setInt(6, product.getCid());
	            ps.setLong(7, product.getUserId());
	        }
	    });
		return result>0;
	}

	@Override
	public List<ProductModel> getAllProducts() {
		list=jdbcTemplate.query(ProductQuery.getAllProducts,new RowMapper<ProductModel>() {

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
		list=jdbcTemplate.query(ProductQuery.searchProductByCategory,new Object[] {category},new RowMapper<ProductModel>() {

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
		int	result=jdbcTemplate.update(ProductQuery.updateProductByName,prod.getProdName(),prod.getPrice(),prod.getQuantity(),prod.getDescription(),prod.getImageUrl(),prodName);
		return result>0;
	}

	@Override
	public boolean deleteProduct(String prodName) {
		int result=jdbcTemplate.update(ProductQuery.deleteProductByName,new Object[] {prodName});
		return result>0;
	}

	@Override
	public List<ProductModel> sortProductsByPriceLowToHigh() {
		list=jdbcTemplate.query(ProductQuery.sortProductsByPriceInAsc, new RowMapper<ProductModel>() {

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
		list=jdbcTemplate.query(ProductQuery.sortProductsByPriceInDesc, new RowMapper<ProductModel>() {

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
		list=jdbcTemplate.query(ProductQuery.searchProductByName,new Object[] {prodName},new RowMapper<ProductModel>() {

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
	public List<ProductModel> getProductsBySellerId(Long userId) {
		list=jdbcTemplate.query(ProductQuery.getProductsBySellerId,new Object[] {userId},new RowMapper<ProductModel>() {

			@Override
			public ProductModel mapRow(ResultSet rs, int rowNum) throws SQLException {
				ProductModel model=new ProductModel();
				model.setProdName(rs.getString(1));
				model.setPrice(rs.getDouble(2));
				model.setQuantity(rs.getInt(3));
				model.setDescription(rs.getString(4));
				model.setImageUrl(rs.getString(5));
				model.setCid(rs.getInt(6));
				model.setUserId(rs.getLong(7));
				return model;
			}
			
		});
		return list;
	}

	@Override
	public int getProdIdByName(String prodName) {
	    try {
	        List<Integer> ids = jdbcTemplate.query(
	            ProductQuery.getProdIdByName,
	            new Object[]{prodName},
	            (rs, rowNum) -> rs.getInt("prodId")
	        );

	        if (ids.isEmpty()) {
	            System.out.println("Product not found for name: " + prodName);
	            return -1;
	        }

	        return ids.get(0); 
	    } catch (Exception e) {
	        e.printStackTrace();
	        return -1;
	    }
	}

	@Override
	public String getProdNameById(int pid) {
		try {
			List<String> names=jdbcTemplate.query(ProductQuery.getProdNameById,new Object[] {pid},(rs,rowNum)->rs.getString("prodName"));
			if(names.isEmpty()) {
				System.out.println("Product Name not Found for Id:"+pid);
				return null;
			}
			return names.get(0);
		}
		catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}


}
