package org.techhub.eComWebsite.Model;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentModel {
	 private int paymentId;
	    private String paymentMethod;
	    private LocalDateTime paymentDate;
	    private BigDecimal amount;
	    private int orderId;
}
