package org.techhub.eComWebsite.Model;
import lombok.Data;

@Data
public class WishListModel {
	private int wishId;
	private String addedDate;
	private long userId;
	private int pId;
}
