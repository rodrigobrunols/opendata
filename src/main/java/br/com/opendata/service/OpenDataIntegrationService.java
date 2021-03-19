package br.com.opendata.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import br.com.opendata.domain.Branch;
import br.com.opendata.domain.integration.OpenDataIntegrationObject;
import br.com.opendata.repository.BranchRepository;
import br.com.opendata.service.mapper.BranchMapper;

/**
 * REST Client para api datapoa
 * 
 * @author rodrigo
 * @since 1.0.0
 * @version 1.0.0
 *
 */
@Service
public class OpenDataIntegrationService {

	@Autowired
	private RestTemplate restTemplate;

	@Value("${opendatabranchesurl}")
	private String branchesEnpointUrl;

	@Autowired
	private BranchRepository branchRepository;

	@Autowired
	private BranchMapper mapper;

	public OpenDataIntegrationObject getBranches(Integer page, Integer pageSize) throws IOException {

		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(branchesEnpointUrl).queryParam("page", page)
				.queryParam("pageSize", pageSize);

		OpenDataIntegrationObject branchesOpenData = restTemplate.getForObject(builder.buildAndExpand().toUri(),
				OpenDataIntegrationObject.class);

		List<Branch> branches = mapper.branchDTOsToBranch(branchesOpenData.getData().getBrand());
		
		branchRepository.saveAll(branches);

		return branchesOpenData;

	}

}
