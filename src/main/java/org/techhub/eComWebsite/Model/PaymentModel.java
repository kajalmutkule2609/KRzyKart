package org.techhub.eComWebsite.Model;
import lombok.Data;

@Data
public class PaymentModel {
	private int paymentId;
	private String paymentMethod;
	private String paymentDate;
	private double amount;
	private int orderId;
}
