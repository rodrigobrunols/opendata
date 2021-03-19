package br.com.opendata.domain.integration;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonInclude.Include;

import br.com.opendata.domain.Availability;

/**
 * Availability DTO.
 */
@JsonInclude(Include.NON_NULL)
public class OpenDataIntegrationAvailability implements Serializable {

	private static final long serialVersionUID = 1L;


    private Set<Availability> standards = new HashSet<>();

    public OpenDataIntegrationAvailability() {
		super();
	}

	public Set<Availability> getStandards() {
		return standards;
	}

	public void setStandards(Set<Availability> standards) {
		this.standards = standards;
	}

}
