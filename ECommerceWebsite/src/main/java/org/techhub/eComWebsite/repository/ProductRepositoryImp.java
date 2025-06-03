package org.techhub.eComWebsite.repository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.techhub.eComWebsite.Model.ProductModel;
import org.techhub.eComWebsite.utility.ProductQuery;

@Repository("prodRepo")
public class ProductRepositoryImp implements ProductRepository {
	@Autowired
	JdbcTemplate jdbcTemplate;
	List<ProductModel> list;

	private static final String path="C://Users//15s-eq0024au//git//EComWebsite//ECommerceWebsite//src//main//resources//static//Images";
	@Override
	public boolean addNewProduct(ProductModel product) {
	    File folder = new File(path);
	    MultipartFile image = product.getProdImage();

	    if (image == null || image.isEmpty()) {
	    	
	        System.out.println("No Image Uploaded");
	        return false;
	    }

	    // Create directory if not exists
	    if (!folder.exists()) {
	        folder.mkdirs();
	    }

	    try {
	        // Save image to static folder
	        File destFile = new File(folder, image.getOriginalFilename());
	        image.transferTo(destFile);

	        // Save filename to DB
	        product.setImageUrl(image.getOriginalFilename());

	        int result = jdbcTemplate.update(ProductQuery.addProduct, ps -> {
	            ps.setString(1, product.getProdName());
	            ps.setDouble(2, product.getPrice());
	            ps.setInt(3, product.getQuantity());
	            ps.setString(4, product.getDescription());
	            ps.setString(5, product.getImageUrl());  
	            ps.setInt(6, product.getCid());
	            ps.setLong(7, product.getUserId());
	        });

	        System.out.println("Image saved at: " + destFile.getAbsolutePath());
	        return result > 0;

	    } catch (Exception e) {
	        e.printStackTrace();
	        return false;
	    }
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
				String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
				model.setImageUrl(baseUrl + "/Images/" + rs.getString(6));
				model.setCid(rs.getInt(7));
				model.setUserId(rs.getLong(8));
				
			//System.out.println("product data==========="+model.toString());
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
				String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
				model.setImageUrl(baseUrl + "/Images/" + rs.getString(6));
				model.setCid(rs.getInt(7));
				model.setUserId(rs.getLong(8));
				return model;
			}
			
		});
		return list;
	}
	@Override
	public boolean updateProduct(String prodName, ProductModel prod, MultipartFile image) {
	    File folder = new File(path);

	    if (image != null && !image.isEmpty()) {
	        if (!folder.exists()) {
	            folder.mkdirs();
	        }

	        try {
	            String fileName = Paths.get(image.getOriginalFilename()).getFileName().toString();
	            File destFile = new File(folder, fileName);
	            image.transferTo(destFile);

	            
	            prod.setImageUrl(fileName);
	        } catch (IOException e) {
	            e.printStackTrace();
	            return false;
	        }
	    } else {
	        // ✅ If no image uploaded, remove any fakepath prefix from imageUrl
	        String current = prod.getImageUrl();
	        if (current != null && current.contains("\\")) {
	            String cleanFileName = Paths.get(current).getFileName().toString();
	            prod.setImageUrl(cleanFileName);
	        }
	    }


	    // Update product details in DB
	    int result = jdbcTemplate.update(ProductQuery.updateProductByName,
	            prod.getProdName(),
	            prod.getPrice(),
	            prod.getQuantity(),
	            prod.getDescription(),
	            prod.getImageUrl(),  
	            prodName);

	    return result > 0;
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
				String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
				model.setImageUrl(baseUrl + "/Images/" + rs.getString(6));
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
				String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
				model.setImageUrl(baseUrl + "/Images/" + rs.getString(6));
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
				String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
				model.setImageUrl(baseUrl + "/Images/" + rs.getString(6));
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
				String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
				model.setImageUrl(baseUrl + "/Images/" + rs.getString(5));
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

	@Override
	public List<ProductModel> searchProductByNamePattern(String prodName) {
	    String likePattern = "%" + prodName + "%";

	    List<ProductModel> list = jdbcTemplate.query(
	        ProductQuery.getProductByNamePattern,
	        new Object[] { likePattern },
	        new RowMapper<ProductModel>() {
	            @Override
	            public ProductModel mapRow(ResultSet rs, int rowNum) throws SQLException {
	                ProductModel model = new ProductModel();
	                model.setProdId(rs.getInt(1));
	                model.setProdName(rs.getString(2));
	                model.setPrice(rs.getDouble(3));
	                model.setQuantity(rs.getInt(4));
	                model.setDescription(rs.getString(5));
	                String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
					model.setImageUrl(baseUrl + "/Images/" + rs.getString(6));
	                model.setCid(rs.getInt(7));
	                model.setUserId(rs.getLong(8));
	                return model;
	            }
	        }
	    );

	    return list;
	}

	@Override
	public List<ProductModel> sortProductsByPriceLowToHighByCategory(String category) {
		 return jdbcTemplate.query(
			        ProductQuery.sortByPriceInAscWithCategory,
			        new Object[] { category }, 
			        new RowMapper<ProductModel>() {
			            @Override
			            public ProductModel mapRow(ResultSet rs, int rowNum) throws SQLException {
			                ProductModel model = new ProductModel();
			                model.setProdId(rs.getInt(1));
			                model.setProdName(rs.getString(2));
			                model.setPrice(rs.getDouble(3));
			                model.setQuantity(rs.getInt(4));
			                model.setDescription(rs.getString(5));
			                String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
							model.setImageUrl(baseUrl + "/Images/" + rs.getString(6));
			                model.setCid(rs.getInt(7));
			                model.setUserId(rs.getLong(8));
			                return model;
			            }
			        }
			    );
	}

	@Override
	public List<ProductModel> sortProductsByPriceHighToLowByCategory(String category) {
		 return jdbcTemplate.query(
			        ProductQuery.sortByPriceInDescWithCategory,
			        new Object[] { category }, 
			        new RowMapper<ProductModel>() {
			            @Override
			            public ProductModel mapRow(ResultSet rs, int rowNum) throws SQLException {
			                ProductModel model = new ProductModel();
			                model.setProdId(rs.getInt(1));
			                model.setProdName(rs.getString(2));
			                model.setPrice(rs.getDouble(3));
			                model.setQuantity(rs.getInt(4));
			                model.setDescription(rs.getString(5));
			                String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
							model.setImageUrl(baseUrl + "/Images/" + rs.getString(6));
			                model.setCid(rs.getInt(7));
			                model.setUserId(rs.getLong(8));
			                return model;
			            }
			        }
			    );
	}

	@Override
	public List<ProductModel> getProductsByPriceRange(int range1, int range2, String category) {
		return jdbcTemplate.query(
		        ProductQuery.getProductsByPriceRange,
		        new Object[] { range1,range2,category }, 
		        new RowMapper<ProductModel>() {
		            @Override
		            public ProductModel mapRow(ResultSet rs, int rowNum) throws SQLException {
		                ProductModel model = new ProductModel();
		                model.setProdId(rs.getInt(1));
		                model.setProdName(rs.getString(2));
		                model.setPrice(rs.getDouble(3));
		                model.setQuantity(rs.getInt(4));
		                model.setDescription(rs.getString(5));
		                String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
						model.setImageUrl(baseUrl + "/Images/" + rs.getString(6));
		                model.setCid(rs.getInt(7));
		                model.setUserId(rs.getLong(8));
		                return model;
		            }
		        }
		    );
	}

	@Override
	public List<ProductModel> getAllProductsByPriceRange(int range1, int range2) {
		return jdbcTemplate.query(
		        ProductQuery.getAllProductsByPriceRange,
		        new Object[] { range1,range2}, 
		        new RowMapper<ProductModel>() {
		            @Override
		            public ProductModel mapRow(ResultSet rs, int rowNum) throws SQLException {
		                ProductModel model = new ProductModel();
		                model.setProdId(rs.getInt(1));
		                model.setProdName(rs.getString(2));
		                model.setPrice(rs.getDouble(3));
		                model.setQuantity(rs.getInt(4));
		                model.setDescription(rs.getString(5));
		                String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
						model.setImageUrl(baseUrl + "/Images/" + rs.getString(6));
		                model.setCid(rs.getInt(7));
		                model.setUserId(rs.getLong(8));
		                return model;
		            }
		        }
		    );
	}

	@Override
	public List<ProductModel> searchProductByDescPattern(String desc) {
		 String likePattern = "%" + desc + "%";

		    List<ProductModel> list = jdbcTemplate.query(
		        ProductQuery.getProductByDescPattern,
		        new Object[] { likePattern },
		        new RowMapper<ProductModel>() {
		            @Override
		            public ProductModel mapRow(ResultSet rs, int rowNum) throws SQLException {
		                ProductModel model = new ProductModel();
		                model.setProdId(rs.getInt(1));
		                model.setProdName(rs.getString(2));
		                model.setPrice(rs.getDouble(3));
		                model.setQuantity(rs.getInt(4));
		                model.setDescription(rs.getString(5));
		                String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
						model.setImageUrl(baseUrl + "/Images/" + rs.getString(6));
		                model.setCid(rs.getInt(7));
		                model.setUserId(rs.getLong(8));
		                return model;
		            }
		        }
		    );

		    return list;
	}



}
