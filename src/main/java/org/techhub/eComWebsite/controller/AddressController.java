package org.techhub.eComWebsite.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.techhub.eComWebsite.service.CategoryServiceImp;

@RestController
@RequestMapping("/ECommerceWebsite/Address")
@CrossOrigin("http://localhost:5173")
public class AddressController {
	
	@GetMapping("/check")
	public String checkMapping() {
		return "Mapped";
	}
}
