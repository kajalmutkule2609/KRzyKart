package org.techhub.eComWebsite.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.techhub.eComWebsite.Model.AddressModel;
import org.techhub.eComWebsite.repository.AddressRepositoryImp;

@Service("addressService")
public class AddressServiceImp implements AddressService{

	@Autowired
	AddressRepositoryImp addressRepo;
	@Override
	public boolean addAddress(AddressModel model) {
		return addressRepo.addAddress(model);
	}

	@Override
	public boolean updateAddress(int addressId, AddressModel model) {
		return addressRepo.updateAddress(addressId, model);
	}

	@Override
	public boolean deleteAddress(int addressId) {
		return addressRepo.deleteAddress(addressId);
	}

	@Override
	public Optional<Map<String, Object>> getAddressById(int addressId) {
		return addressRepo.getAddressById(addressId);
	}

	@Override
	public List<Map<String, Object>> getAllAddressesByUserId(long userId) {
		return addressRepo.getAllAddressesByUserId(userId);
	}

}
