package br.com.opendata.domain.integration;
import java.io.Serializable;

/**
 * A Brand.
 */
public class OpenDataIntegrationData implements Serializable {

	private static final long serialVersionUID = 1L;

    private OpenDataIntegrationBrand brand;

	public OpenDataIntegrationData() {
		super();
	}

	public OpenDataIntegrationBrand getBrand() {
		return brand;
	}

	public void setBrand(OpenDataIntegrationBrand brand) {
		this.brand = brand;
	}


}
