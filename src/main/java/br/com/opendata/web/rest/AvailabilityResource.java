package br.com.opendata.web.rest;

import br.com.opendata.domain.Availability;
import br.com.opendata.repository.AvailabilityRepository;
import br.com.opendata.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link br.com.opendata.domain.Availability}.
 */
@RestController
@RequestMapping("/api")
public class AvailabilityResource {

    private final Logger log = LoggerFactory.getLogger(AvailabilityResource.class);

    private static final String ENTITY_NAME = "availability";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AvailabilityRepository availabilityRepository;

    public AvailabilityResource(AvailabilityRepository availabilityRepository) {
        this.availabilityRepository = availabilityRepository;
    }

    /**
     * {@code POST  /availabilities} : Create a new availability.
     *
     * @param availability the availability to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new availability, or with status {@code 400 (Bad Request)} if the availability has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/availabilities")
    public ResponseEntity<Availability> createAvailability(@RequestBody Availability availability) throws URISyntaxException {
        log.debug("REST request to save Availability : {}", availability);
        if (availability.getId() != null) {
            throw new BadRequestAlertException("A new availability cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Availability result = availabilityRepository.save(availability);
        return ResponseEntity.created(new URI("/api/availabilities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /availabilities} : Updates an existing availability.
     *
     * @param availability the availability to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated availability,
     * or with status {@code 400 (Bad Request)} if the availability is not valid,
     * or with status {@code 500 (Internal Server Error)} if the availability couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/availabilities")
    public ResponseEntity<Availability> updateAvailability(@RequestBody Availability availability) throws URISyntaxException {
        log.debug("REST request to update Availability : {}", availability);
        if (availability.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Availability result = availabilityRepository.save(availability);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, availability.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /availabilities} : get all the availabilities.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of availabilities in body.
     */
    @GetMapping("/availabilities")
    public List<Availability> getAllAvailabilities() {
        log.debug("REST request to get all Availabilities");
        return availabilityRepository.findAll();
    }

    /**
     * {@code GET  /availabilities/:id} : get the "id" availability.
     *
     * @param id the id of the availability to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the availability, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/availabilities/{id}")
    public ResponseEntity<Availability> getAvailability(@PathVariable Long id) {
        log.debug("REST request to get Availability : {}", id);
        Optional<Availability> availability = availabilityRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(availability);
    }

    /**
     * {@code DELETE  /availabilities/:id} : delete the "id" availability.
     *
     * @param id the id of the availability to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/availabilities/{id}")
    public ResponseEntity<Void> deleteAvailability(@PathVariable Long id) {
        log.debug("REST request to delete Availability : {}", id);
        availabilityRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
