package org.techhub.eComWebsite.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.techhub.eComWebsite.Model.AddressModel;
import org.techhub.eComWebsite.service.AddressService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/ECommerceWebsite/Address")
@CrossOrigin("http://localhost:5173")
public class AddressController {

    @Autowired
    AddressService addressService;

    @PostMapping("/add")
    public String addAddress(@RequestBody AddressModel model) {
        if(addressService.addAddress(model)) {
        	log.info("New Address Added");
        	return "Address Added" ;
        }
        else {
        	log.error("Failed to add new Address");
        	return "Failed to add address";
        }
    }

    @PutMapping("/update/{addressId}")
    public String updateAddress(@PathVariable int addressId, @RequestBody AddressModel model) {
        if(addressService.updateAddress(addressId, model)) {
        	return "Address Updated";
        }
        else {
        	return "Update Failed";
        }
    }

    @DeleteMapping("/delete/{addressId}")
    public String deleteAddress(@PathVariable int addressId) {
        if(addressService.deleteAddress(addressId)) {
        	log.info("Address deleted..");
        	return  "Address Deleted" ;
        }
        else {
        	log.error("Failed to delete address");
        	return "Delete Failed";
        }
    }

    @GetMapping("/getById/{addressId}")
    public ResponseEntity<Map<String, Object>> getAddressById(@PathVariable int addressId) {
        Optional<Map<String, Object>> result = addressService.getAddressById(addressId);
        log.info("Fetching Address by Address id");
        return result.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.noContent().build());
    }

    @GetMapping("/getAllByUserId/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getAllByUserId(@PathVariable long userId) {
        List<Map<String, Object>> results = addressService.getAllAddressesByUserId(userId);
        log.info("Fetch All Address By UserId");
        return ResponseEntity.ok(results); 
    }

}

