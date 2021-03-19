package br.com.opendata.domain.integration;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Brand.
 */
public class OpenDataIntegrationBrand implements Serializable {

	private static final long serialVersionUID = 1L;

    private String name;

    private Set<OpenDataIntegrationCompany> companies = new HashSet<>();

    public Set<OpenDataIntegrationCompany> getCompanies() {
        return companies;
    }

    public void setCompanies(Set<OpenDataIntegrationCompany> companies) {
        this.companies = companies;
    }

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

    @Override
	public String toString() {
		return "OpenDataIntegrationBrand [name=" + getName() + ", companies=" + companies + "]";
	}
}
