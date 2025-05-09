package org.techhub.eComWebsite.service;

import java.util.*;

import org.techhub.eComWebsite.Model.AddressModel;

public interface AddressService {
	boolean addAddress(AddressModel model);
    boolean updateAddress(int addressId, AddressModel model);
    boolean deleteAddress(int addressId);
    Optional<Map<String, Object>> getAddressById(int addressId);
    List<Map<String, Object>> getAllAddressesByUserId(long userId);
}
