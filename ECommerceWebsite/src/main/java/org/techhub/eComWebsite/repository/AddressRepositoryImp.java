package org.techhub.eComWebsite.repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.techhub.eComWebsite.Model.AddressModel;
import org.techhub.eComWebsite.utility.AddressQuery;

@Repository("addressRepo")
public class AddressRepositoryImp implements AddressRepository{
    
	    @Autowired
	    JdbcTemplate jdbcTemplate;

	    @Override
	    public boolean addAddress(AddressModel model) {
	        return jdbcTemplate.update(AddressQuery.addAddress,
	            model.getName(),
	            model.getAddressLine1(),
	            model.getAddressLine2(),
	            model.getCity(),
	            model.getState(),
	            model.getPinCode(),
	            model.getCountry(),
	            model.getAddressType(),
	            model.getUserId()
	        ) > 0;
	    }

	    @Override
	    public boolean updateAddress(int addressId, AddressModel model) {
	         return jdbcTemplate.update(AddressQuery.updateAddress,
	            model.getName(),
	            model.getAddressLine1(),
	            model.getAddressLine2(),
	            model.getCity(),
	            model.getState(),
	            model.getPinCode(),
	            model.getCountry(),
	            model.getAddressType(),
	            addressId
	        ) > 0;
	    }

	    @Override
	    public boolean deleteAddress(int addressId) {
	        return jdbcTemplate.update(AddressQuery.deleteAddress, addressId) > 0;
	    }

	    @Override
	    public Optional<Map<String, Object>> getAddressById(int addressId) {
	        List<Map<String, Object>> results = jdbcTemplate.queryForList(AddressQuery.getAddressById, addressId);
	        return results.isEmpty() ? Optional.empty() : Optional.of(results.get(0));
	    }

	    @Override
	    public List<Map<String, Object>> getAllAddressesByUserId(long userId) {
	        return jdbcTemplate.queryForList(AddressQuery.getAddressByUserId, userId);
	    }

	}
