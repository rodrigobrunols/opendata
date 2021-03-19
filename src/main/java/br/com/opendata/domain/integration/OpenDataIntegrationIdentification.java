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
public class OpenDataIntegrationIdentification implements Serializable {

	private static final long serialVersionUID = 1L;

	public OpenDataIntegrationIdentification() {
		super();
	}

	/**
	 * O nome da empresa.
	 */
	private String name;
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Long getCode() {
		return code;
	}

	public void setCode(Long code) {
		this.code = code;
	}

	private String type;
	
	
	private Long code;
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
