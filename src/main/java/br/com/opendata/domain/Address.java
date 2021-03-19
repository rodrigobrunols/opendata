package br.com.opendata.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonInclude.Include;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Address.
 */
@Entity
@Table(name = "address")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@JsonInclude(Include.NON_NULL)
public class Address implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "address")
    private String address;

    @Column(name = "district_name")
    private String districtName;

    @Column(name = "town_name")
    private String townName;

    @Column(name = "country_sub_division")
    private String countrySubDivision;

    @Column(name = "post_code")
    private Long postCode;

    @Column(name = "additional_info")
    private String additionalInfo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public Address address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDistrictName() {
        return districtName;
    }

    public Address districtName(String districtName) {
        this.districtName = districtName;
        return this;
    }

    public void setDistrictName(String districtName) {
        this.districtName = districtName;
    }

    public String getTownName() {
        return townName;
    }

    public Address townName(String townName) {
        this.townName = townName;
        return this;
    }

    public void setTownName(String townName) {
        this.townName = townName;
    }

    public String getCountrySubDivision() {
        return countrySubDivision;
    }

    public Address countrySubDivision(String countrySubDivision) {
        this.countrySubDivision = countrySubDivision;
        return this;
    }

    public void setCountrySubDivision(String countrySubDivision) {
        this.countrySubDivision = countrySubDivision;
    }

    public Long getPostCode() {
        return postCode;
    }

    public Address postCode(Long postCode) {
        this.postCode = postCode;
        return this;
    }

    public void setPostCode(Long postCode) {
        this.postCode = postCode;
    }

    public String getAdditionalInfo() {
        return additionalInfo;
    }

    public Address additionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
        return this;
    }

    public void setAdditionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Address)) {
            return false;
        }
        return id != null && id.equals(((Address) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Address{" +
            "id=" + getId() +
            ", address='" + getAddress() + "'" +
            ", districtName='" + getDistrictName() + "'" +
            ", townName='" + getTownName() + "'" +
            ", countrySubDivision='" + getCountrySubDivision() + "'" +
            ", postCode=" + getPostCode() +
            ", additionalInfo='" + getAdditionalInfo() + "'" +
            "}";
    }
}
