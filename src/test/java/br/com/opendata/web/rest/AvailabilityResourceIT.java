package br.com.opendata.web.rest;

import br.com.opendata.OpendataApp;
import br.com.opendata.domain.Availability;
import br.com.opendata.repository.AvailabilityRepository;
import br.com.opendata.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static br.com.opendata.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link AvailabilityResource} REST controller.
 */
@SpringBootTest(classes = OpendataApp.class)
public class AvailabilityResourceIT {

    private static final String DEFAULT_WEEKDAY = "AAAAAAAAAA";
    private static final String UPDATED_WEEKDAY = "BBBBBBBBBB";

    private static final String DEFAULT_OPENING_TIME = "08:00:00Z";
    private static final String UPDATED_OPENING_TIME = "08:00:00Z";

    private static final String DEFAULT_CLOSING_TIME = "20:00:00Z";
    private static final String UPDATED_CLOSING_TIME = "20:00:00Z";

    @Autowired
    private AvailabilityRepository availabilityRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restAvailabilityMockMvc;

    private Availability availability;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AvailabilityResource availabilityResource = new AvailabilityResource(availabilityRepository);
        this.restAvailabilityMockMvc = MockMvcBuilders.standaloneSetup(availabilityResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Availability createEntity(EntityManager em) {
        Availability availability = new Availability()
            .weekday(DEFAULT_WEEKDAY)
            .openingTime(DEFAULT_OPENING_TIME)
            .closingTime(DEFAULT_CLOSING_TIME);
        return availability;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Availability createUpdatedEntity(EntityManager em) {
        Availability availability = new Availability()
            .weekday(UPDATED_WEEKDAY)
            .openingTime(UPDATED_OPENING_TIME)
            .closingTime(UPDATED_CLOSING_TIME);
        return availability;
    }

    @BeforeEach
    public void initTest() {
        availability = createEntity(em);
    }

    @Test
    @Transactional
    public void createAvailability() throws Exception {
        int databaseSizeBeforeCreate = availabilityRepository.findAll().size();

        // Create the Availability
        restAvailabilityMockMvc.perform(post("/api/availabilities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(availability)))
            .andExpect(status().isCreated());

        // Validate the Availability in the database
        List<Availability> availabilityList = availabilityRepository.findAll();
        assertThat(availabilityList).hasSize(databaseSizeBeforeCreate + 1);
        Availability testAvailability = availabilityList.get(availabilityList.size() - 1);
        assertThat(testAvailability.getWeekday()).isEqualTo(DEFAULT_WEEKDAY);
        assertThat(testAvailability.getOpeningTime()).isEqualTo(DEFAULT_OPENING_TIME);
        assertThat(testAvailability.getClosingTime()).isEqualTo(DEFAULT_CLOSING_TIME);
    }

    @Test
    @Transactional
    public void createAvailabilityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = availabilityRepository.findAll().size();

        // Create the Availability with an existing ID
        availability.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAvailabilityMockMvc.perform(post("/api/availabilities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(availability)))
            .andExpect(status().isBadRequest());

        // Validate the Availability in the database
        List<Availability> availabilityList = availabilityRepository.findAll();
        assertThat(availabilityList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAvailabilities() throws Exception {
        // Initialize the database
        availabilityRepository.saveAndFlush(availability);

        // Get all the availabilityList
        restAvailabilityMockMvc.perform(get("/api/availabilities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(availability.getId().intValue())))
            .andExpect(jsonPath("$.[*].weekday").value(hasItem(DEFAULT_WEEKDAY.toString())))
            .andExpect(jsonPath("$.[*].openingTime").value(hasItem(DEFAULT_OPENING_TIME.toString())))
            .andExpect(jsonPath("$.[*].closingTime").value(hasItem(DEFAULT_CLOSING_TIME.toString())));
    }
    
    @Test
    @Transactional
    public void getAvailability() throws Exception {
        // Initialize the database
        availabilityRepository.saveAndFlush(availability);

        // Get the availability
        restAvailabilityMockMvc.perform(get("/api/availabilities/{id}", availability.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(availability.getId().intValue()))
            .andExpect(jsonPath("$.weekday").value(DEFAULT_WEEKDAY.toString()))
            .andExpect(jsonPath("$.openingTime").value(DEFAULT_OPENING_TIME.toString()))
            .andExpect(jsonPath("$.closingTime").value(DEFAULT_CLOSING_TIME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAvailability() throws Exception {
        // Get the availability
        restAvailabilityMockMvc.perform(get("/api/availabilities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAvailability() throws Exception {
        // Initialize the database
        availabilityRepository.saveAndFlush(availability);

        int databaseSizeBeforeUpdate = availabilityRepository.findAll().size();

        // Update the availability
        Availability updatedAvailability = availabilityRepository.findById(availability.getId()).get();
        // Disconnect from session so that the updates on updatedAvailability are not directly saved in db
        em.detach(updatedAvailability);
        updatedAvailability
            .weekday(UPDATED_WEEKDAY)
            .openingTime(UPDATED_OPENING_TIME)
            .closingTime(UPDATED_CLOSING_TIME);

        restAvailabilityMockMvc.perform(put("/api/availabilities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAvailability)))
            .andExpect(status().isOk());

        // Validate the Availability in the database
        List<Availability> availabilityList = availabilityRepository.findAll();
        assertThat(availabilityList).hasSize(databaseSizeBeforeUpdate);
        Availability testAvailability = availabilityList.get(availabilityList.size() - 1);
        assertThat(testAvailability.getWeekday()).isEqualTo(UPDATED_WEEKDAY);
        assertThat(testAvailability.getOpeningTime()).isEqualTo(UPDATED_OPENING_TIME);
        assertThat(testAvailability.getClosingTime()).isEqualTo(UPDATED_CLOSING_TIME);
    }

    @Test
    @Transactional
    public void updateNonExistingAvailability() throws Exception {
        int databaseSizeBeforeUpdate = availabilityRepository.findAll().size();

        // Create the Availability

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAvailabilityMockMvc.perform(put("/api/availabilities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(availability)))
            .andExpect(status().isBadRequest());

        // Validate the Availability in the database
        List<Availability> availabilityList = availabilityRepository.findAll();
        assertThat(availabilityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAvailability() throws Exception {
        // Initialize the database
        availabilityRepository.saveAndFlush(availability);

        int databaseSizeBeforeDelete = availabilityRepository.findAll().size();

        // Delete the availability
        restAvailabilityMockMvc.perform(delete("/api/availabilities/{id}", availability.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Availability> availabilityList = availabilityRepository.findAll();
        assertThat(availabilityList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Availability.class);
        Availability availability1 = new Availability();
        availability1.setId(1L);
        Availability availability2 = new Availability();
        availability2.setId(availability1.getId());
        assertThat(availability1).isEqualTo(availability2);
        availability2.setId(2L);
        assertThat(availability1).isNotEqualTo(availability2);
        availability1.setId(null);
        assertThat(availability1).isNotEqualTo(availability2);
    }
}
