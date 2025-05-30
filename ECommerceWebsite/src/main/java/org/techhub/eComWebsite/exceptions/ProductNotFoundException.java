package org.techhub.eComWebsite.exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ProductNotFoundException extends RuntimeException {
	
	public ProductNotFoundException(String message) {
		super(message);
	}
	public ProductNotFoundException(String message,Throwable cause) {
		super(message,cause);
	}
}
