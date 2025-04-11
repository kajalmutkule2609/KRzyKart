package org.techhub.eComWebsite.Model;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class AddressModel {
	private int addressId;
	private String name;
	private String addressLine1;
	private String addressLine2;
	private String city;
	private String state;
	private int pincode;
	private String country;
	private String addressType;
	private long userId;
}

