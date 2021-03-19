package br.com.opendata.domain.integration;
import java.io.Serializable;

import br.com.opendata.domain.Address;

/**
 * A entidade Agencia.
 */
public class OpenDataIntegrationBranch implements Serializable {


	private static final long serialVersionUID = 1L;

    
    private OpenDataIntegrationIdentification identification;

    private Address postalAddress;

    private OpenDataIntegrationAvailability availability;

	public OpenDataIntegrationIdentification getIdentification() {
		return identification;
	}

	public void setIdentification(OpenDataIntegrationIdentification identification) {
		this.identification = identification;
	}

	public Address getPostalAddress() {
		return postalAddress;
	}

	public void setPostalAddress(Address postalAddress) {
		this.postalAddress = postalAddress;
	}

	public void setAvailability(OpenDataIntegrationAvailability availability) {
		this.availability = availability;
	}

	public OpenDataIntegrationAvailability getAvailability() {
		return availability;
	}

	public Object bosta() {
		return postalAddress;
	}


	public OpenDataIntegrationBranch() {
		super();
	}

    
    
}
