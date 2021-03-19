package br.com.opendata.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonInclude.Include;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * A Availability.
 */
@Entity
@Table(name = "availability")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@JsonInclude(Include.NON_NULL)
public class Availability implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "weekday")
    private String weekday;

    @Column(name = "opening_time")
    private String openingTime;

    @Column(name = "closing_time")
    private String closingTime;

    @ManyToOne
    @JsonIgnoreProperties("availabilities")
    private Branch branch;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWeekday() {
        return weekday;
    }

    public Availability weekday(String weekday) {
        this.weekday = weekday;
        return this;
    }

    public void setWeekday(String weekday) {
        this.weekday = weekday;
    }

    public String getOpeningTime() {
        return openingTime;
    }

    public Availability openingTime(String openingTime) {
        this.openingTime = openingTime;
        return this;
    }

    public void setOpeningTime(String openingTime) {
        this.openingTime = openingTime;
    }

    public String getClosingTime() {
        return closingTime;
    }

    public Availability closingTime(String closingTime) {
        this.closingTime = closingTime;
        return this;
    }

    public void setClosingTime(String closingTime) {
        this.closingTime = closingTime;
    }

    public Branch getBranch() {
        return branch;
    }

    public Availability branch(Branch branch) {
        this.branch = branch;
        return this;
    }

    public void setBranch(Branch branch) {
        this.branch = branch;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Availability)) {
            return false;
        }
        return id != null && id.equals(((Availability) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Availability{" +
            "id=" + getId() +
            ", weekday='" + getWeekday() + "'" +
            ", openingTime='" + getOpeningTime() + "'" +
            ", closingTime='" + getClosingTime() + "'" +
            "}";
    }
}
