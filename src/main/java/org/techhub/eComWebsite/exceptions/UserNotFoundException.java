package org.techhub.eComWebsite.exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;


//public class UserNotFoundException extends Exception {
//	String message;
//	public UserNotFoundException(String message){
//		this.message=message;
//	}
//	public String userException(String message) {
//		return message;
//	}
//
//}
@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }

    public UserNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}


