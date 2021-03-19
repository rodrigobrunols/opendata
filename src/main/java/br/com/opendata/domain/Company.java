package br.com.opendata.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A entidade Empresa.
 */
@ApiModel(description = "A entidade Empresa.")
@Entity
@Table(name = "company")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Company implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * O nome da empresa.
     */
    @ApiModelProperty(value = "O nome da empresa.")
    @Column(name = "name")
    private String name;

    @Column(name = "cnpj_number")
    private Long cnpjNumber;

    @OneToMany(mappedBy = "company")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Branch> branches = new HashSet<>();

    public Company(String name, Long cnpjNumber, Brand brand) {
		super();
		this.name = name;
		this.cnpjNumber = cnpjNumber;
		this.brand = brand;
	}

	@ManyToOne
    @JsonIgnoreProperties("companies")
    private Brand brand;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Company name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getCnpjNumber() {
        return cnpjNumber;
    }

    public Company cnpjNumber(Long cnpjNumber) {
        this.cnpjNumber = cnpjNumber;
        return this;
    }

    public void setCnpjNumber(Long cnpjNumber) {
        this.cnpjNumber = cnpjNumber;
    }

    public Set<Branch> getBranches() {
        return branches;
    }

    public Company branches(Set<Branch> branches) {
        this.branches = branches;
        return this;
    }

    public Company addBranch(Branch branch) {
        this.branches.add(branch);
        branch.setCompany(this);
        return this;
    }

    public Company removeBranch(Branch branch) {
        this.branches.remove(branch);
        branch.setCompany(null);
        return this;
    }

    public void setBranches(Set<Branch> branches) {
        this.branches = branches;
    }

    public Brand getBrand() {
        return brand;
    }

    public Company brand(Brand brand) {
        this.brand = brand;
        return this;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Company)) {
            return false;
        }
        return id != null && id.equals(((Company) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Company{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", cnpjNumber=" + getCnpjNumber() +
            "}";
    }
}
