package br.com.opendata.domain.integration;
import java.io.Serializable;

/**
 * A Brand.
 */
public class OpenDataIntegrationObject implements Serializable {

	private static final long serialVersionUID = 1L;

    private OpenDataIntegrationData data;
    private Object links;
    private OpenDataIntegrationMeta meta;

	public OpenDataIntegrationData getData() {
		return data;
	}

	public OpenDataIntegrationObject() {
		super();
	}

	public Object getLinks() {
		return links;
	}

	public void setLinks(Object links) {
		this.links = links;
	}

	public OpenDataIntegrationMeta getMeta() {
		return meta;
	}

	public void setMeta(OpenDataIntegrationMeta meta) {
		this.meta = meta;
	}

	public void setData(OpenDataIntegrationData data) {
		this.data = data;
	}


}
