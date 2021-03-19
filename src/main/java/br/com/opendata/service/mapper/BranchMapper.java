package br.com.opendata.service.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import br.com.opendata.domain.Branch;
import br.com.opendata.domain.Brand;
import br.com.opendata.domain.Company;
import br.com.opendata.domain.integration.OpenDataIntegrationBranch;
import br.com.opendata.domain.integration.OpenDataIntegrationBrand;

/**
 * Mapper for the entity {@link Branch} and its DTO called
 * {@link OpenDataIntegrationBranche}.
 *
 * Normal mappers are generated using MapStruct, this one is hand-coded as
 * MapStruct support is still in beta, and requires a manual step with an IDE.
 */
@Service
public class BranchMapper {


	public List<Branch> branchDTOsToBranch(OpenDataIntegrationBrand integrationBrand) {
		
		List<Branch> result = new  ArrayList<Branch>() ;
		
		integrationBrand.getCompanies().forEach(cDto -> {
			
			result.addAll(cDto.getBranches().stream().map(bDto -> {
				
				Branch b = toBranch.apply(bDto);

				Brand brd = new Brand(integrationBrand.getName());
				
				b.setCompany(new Company(cDto.getName(), cDto.getCnpjNumber(), brd));
				
				return b;
				
			}).collect(Collectors.toList()));
		});
		
		return result;
	
	}

	/**
	 * Converte dto para entidade
	 */
	Function<OpenDataIntegrationBranch, Branch> toBranch = branchDto -> {
		
		Branch branch = new Branch();
		branch.setName(branchDto.getIdentification().getName());
		branch.setCode(branchDto.getIdentification().getCode());
		branch.setType(branchDto.getIdentification().getType());
		branch.setAddress(branchDto.getPostalAddress());
		branch.setAvailabilities(branchDto.getAvailability().getStandards().stream().filter(Objects::nonNull)
				.collect(Collectors.toSet()));
		return branch;
		
	};


}
