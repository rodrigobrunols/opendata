package br.com.opendata.domain.integration;
import java.io.Serializable;

/**
 * A Brand.
 */
public class OpenDataIntegrationMeta implements Serializable {

	private static final long serialVersionUID = 1L;

   private Integer totalRecords;

   private Integer totalPages;

   
	public Integer getTotalRecords() {
	return totalRecords;
}


public void setTotalRecords(Integer totalRecords) {
	this.totalRecords = totalRecords;
}


public Integer getTotalPages() {
	return totalPages;
}


public void setTotalPages(Integer totalPages) {
	this.totalPages = totalPages;
}


	public OpenDataIntegrationMeta() {
		super();
	}



}
