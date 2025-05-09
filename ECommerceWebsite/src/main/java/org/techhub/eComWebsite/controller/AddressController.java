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

@RestController
@RequestMapping("/ECommerceWebsite/Address")
@CrossOrigin("http://localhost:5173")
public class AddressController {

    @Autowired
    AddressService addressService;

    @PostMapping("/add")
    public String addAddress(@RequestBody AddressModel model) {
        return addressService.addAddress(model) ? "Address Added" : "Failed to add address";
    }

    @PutMapping("/update/{addressId}")
    public String updateAddress(@PathVariable int addressId, @RequestBody AddressModel model) {
        return addressService.updateAddress(addressId, model) ? "Address Updated" : "Update Failed";
    }

    @DeleteMapping("/delete/{addressId}")
    public String deleteAddress(@PathVariable int addressId) {
        return addressService.deleteAddress(addressId) ? "Address Deleted" : "Delete Failed";
    }

    @GetMapping("/getById/{addressId}")
    public ResponseEntity<Map<String, Object>> getAddressById(@PathVariable int addressId) {
        Optional<Map<String, Object>> result = addressService.getAddressById(addressId);
        return result.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.noContent().build());
    }

    @GetMapping("/getAllByUserId/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getAllByUserId(@PathVariable long userId) {
        List<Map<String, Object>> results = addressService.getAllAddressesByUserId(userId);
        return ResponseEntity.ok(results); // always return 200 OK with list (even if empty)
    }

}

