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
 * A entidade Agencia.
 */
@ApiModel(description = "A entidade Agencia.")
@Entity
@Table(name = "branch")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Branch implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * O nome da agencia.
     */
    @ApiModelProperty(value = "O nome da agencia.")
    @Column(name = "name")
    private String name;

    @Column(name = "code")
    private Long code;

    @Column(name = "type")
    private String type;

    @Column(name = "latitude")
    private Long latitude;

    @Column(name = "longitude")
    private Long longitude;

    @Column(name = "additional_info")
    private String additionalInfo;

    @OneToOne
    @JoinColumn(unique = true)
    private Address address;

    @OneToMany(mappedBy = "branch")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Availability> availabilities = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("branches")
    private Company company;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Branch name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getCode() {
        return code;
    }

    public Branch code(Long code) {
        this.code = code;
        return this;
    }

    public void setCode(Long code) {
        this.code = code;
    }

    public String getType() {
        return type;
    }

    public Branch type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getLatitude() {
        return latitude;
    }

    public Branch latitude(Long latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(Long latitude) {
        this.latitude = latitude;
    }

    public Long getLongitude() {
        return longitude;
    }

    public Branch longitude(Long longitude) {
        this.longitude = longitude;
        return this;
    }

    public void setLongitude(Long longitude) {
        this.longitude = longitude;
    }

    public String getAdditionalInfo() {
        return additionalInfo;
    }

    public Branch additionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
        return this;
    }

    public void setAdditionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
    }

    public Address getAddress() {
        return address;
    }

    public Branch address(Address address) {
        this.address = address;
        return this;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Set<Availability> getAvailabilities() {
        return availabilities;
    }

    public Branch availabilities(Set<Availability> availabilities) {
        this.availabilities = availabilities;
        return this;
    }

    public Branch addAvailability(Availability availability) {
        this.availabilities.add(availability);
        availability.setBranch(this);
        return this;
    }

    public Branch removeAvailability(Availability availability) {
        this.availabilities.remove(availability);
        availability.setBranch(null);
        return this;
    }

    public void setAvailabilities(Set<Availability> availabilities) {
        this.availabilities = availabilities;
    }

    public Company getCompany() {
        return company;
    }

    public Branch company(Company company) {
        this.company = company;
        return this;
    }

    public void setCompany(Company company) {
        this.company = company;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Branch)) {
            return false;
        }
        return id != null && id.equals(((Branch) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Branch{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", code=" + getCode() +
            ", type='" + getType() + "'" +
            ", latitude=" + getLatitude() +
            ", longitude=" + getLongitude() +
            ", additionalInfo='" + getAdditionalInfo() + "'" +
            "}";
    }


}
