package br.com.opendata.web.rest.integration;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.opendata.domain.integration.OpenDataIntegrationObject;
import br.com.opendata.service.OpenDataIntegrationService;

@RestController
@RequestMapping("/api/integration")
public class OpenDataIntegrationController  {

	@Autowired
	private OpenDataIntegrationService service;

	/**
	 * @param host
	 * @return
	 */
	@GetMapping("/branches")
	@ResponseBody
	public OpenDataIntegrationObject get(
		  @RequestParam(name = "page", required = false, defaultValue = "1") Integer page, 
		  
		  @RequestParam(name = "page-size", required = false, defaultValue = "25") Integer pageSize) {

		try {
			return service.getBranches(page, pageSize);
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}

}
