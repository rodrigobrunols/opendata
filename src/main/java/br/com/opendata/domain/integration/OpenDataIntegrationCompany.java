package br.com.opendata.domain.integration;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
 * A entidade Empresa.
 */
@ApiModel(description = "A entidade Empresa.")
public class OpenDataIntegrationCompany implements Serializable {

	private static final long serialVersionUID = 1L;

	public OpenDataIntegrationCompany() {
		super();
	}

	/**
	 * O nome da empresa.
	 */
	@ApiModelProperty(value = "O nome da empresa.")
	private String name;
	
	private Long cnpjNumber;
	
	private Set<OpenDataIntegrationBranch> branches = new HashSet<>();

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getCnpjNumber() {
		return cnpjNumber;
	}

	public void setCnpjNumber(Long cnpjNumber) {
		this.cnpjNumber = cnpjNumber;
	}

	public Set<OpenDataIntegrationBranch> getBranches() {
		return branches;
	}

	public void setBranches(Set<OpenDataIntegrationBranch> branches) {
		this.branches = branches;
	}
}
