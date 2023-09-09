package fr.uga.laguidonette.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.uga.laguidonette.IntegrationTest;
import fr.uga.laguidonette.domain.Torder;
import fr.uga.laguidonette.domain.enumeration.Status;
import fr.uga.laguidonette.repository.TorderRepository;
import fr.uga.laguidonette.service.TorderService;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link TorderResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class TorderResourceIT {

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_TOTAL = 1L;
    private static final Long UPDATED_TOTAL = 2L;

    private static final Status DEFAULT_STATUS = Status.IN_PROGRESS;
    private static final Status UPDATED_STATUS = Status.CANCELLED;

    private static final String ENTITY_API_URL = "/api/torders";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TorderRepository torderRepository;

    @Mock
    private TorderRepository torderRepositoryMock;

    @Mock
    private TorderService torderServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTorderMockMvc;

    private Torder torder;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Torder createEntity(EntityManager em) {
        Torder torder = new Torder().date(DEFAULT_DATE).total(DEFAULT_TOTAL).status(DEFAULT_STATUS);
        return torder;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Torder createUpdatedEntity(EntityManager em) {
        Torder torder = new Torder().date(UPDATED_DATE).total(UPDATED_TOTAL).status(UPDATED_STATUS);
        return torder;
    }

    @BeforeEach
    public void initTest() {
        torder = createEntity(em);
    }

    @Test
    @Transactional
    void createTorder() throws Exception {
        int databaseSizeBeforeCreate = torderRepository.findAll().size();
        // Create the Torder
        restTorderMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(torder)))
            .andExpect(status().isCreated());

        // Validate the Torder in the database
        List<Torder> torderList = torderRepository.findAll();
        assertThat(torderList).hasSize(databaseSizeBeforeCreate + 1);
        Torder testTorder = torderList.get(torderList.size() - 1);
        assertThat(testTorder.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testTorder.getTotal()).isEqualTo(DEFAULT_TOTAL);
        assertThat(testTorder.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    void createTorderWithExistingId() throws Exception {
        // Create the Torder with an existing ID
        torder.setId(1L);

        int databaseSizeBeforeCreate = torderRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTorderMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(torder)))
            .andExpect(status().isBadRequest());

        // Validate the Torder in the database
        List<Torder> torderList = torderRepository.findAll();
        assertThat(torderList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllTorders() throws Exception {
        // Initialize the database
        torderRepository.saveAndFlush(torder);

        // Get all the torderList
        restTorderMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(torder.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].total").value(hasItem(DEFAULT_TOTAL.intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllTordersWithEagerRelationshipsIsEnabled() throws Exception {
        when(torderServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restTorderMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(torderServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllTordersWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(torderServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restTorderMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(torderRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getTorder() throws Exception {
        // Initialize the database
        torderRepository.saveAndFlush(torder);

        // Get the torder
        restTorderMockMvc
            .perform(get(ENTITY_API_URL_ID, torder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(torder.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.total").value(DEFAULT_TOTAL.intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    void getNonExistingTorder() throws Exception {
        // Get the torder
        restTorderMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTorder() throws Exception {
        // Initialize the database
        torderRepository.saveAndFlush(torder);

        int databaseSizeBeforeUpdate = torderRepository.findAll().size();

        // Update the torder
        Torder updatedTorder = torderRepository.findById(torder.getId()).get();
        // Disconnect from session so that the updates on updatedTorder are not directly saved in db
        em.detach(updatedTorder);
        updatedTorder.date(UPDATED_DATE).total(UPDATED_TOTAL).status(UPDATED_STATUS);

        restTorderMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTorder.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTorder))
            )
            .andExpect(status().isOk());

        // Validate the Torder in the database
        List<Torder> torderList = torderRepository.findAll();
        assertThat(torderList).hasSize(databaseSizeBeforeUpdate);
        Torder testTorder = torderList.get(torderList.size() - 1);
        assertThat(testTorder.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testTorder.getTotal()).isEqualTo(UPDATED_TOTAL);
        assertThat(testTorder.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    void putNonExistingTorder() throws Exception {
        int databaseSizeBeforeUpdate = torderRepository.findAll().size();
        torder.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTorderMockMvc
            .perform(
                put(ENTITY_API_URL_ID, torder.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(torder))
            )
            .andExpect(status().isBadRequest());

        // Validate the Torder in the database
        List<Torder> torderList = torderRepository.findAll();
        assertThat(torderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTorder() throws Exception {
        int databaseSizeBeforeUpdate = torderRepository.findAll().size();
        torder.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTorderMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(torder))
            )
            .andExpect(status().isBadRequest());

        // Validate the Torder in the database
        List<Torder> torderList = torderRepository.findAll();
        assertThat(torderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTorder() throws Exception {
        int databaseSizeBeforeUpdate = torderRepository.findAll().size();
        torder.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTorderMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(torder)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Torder in the database
        List<Torder> torderList = torderRepository.findAll();
        assertThat(torderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTorderWithPatch() throws Exception {
        // Initialize the database
        torderRepository.saveAndFlush(torder);

        int databaseSizeBeforeUpdate = torderRepository.findAll().size();

        // Update the torder using partial update
        Torder partialUpdatedTorder = new Torder();
        partialUpdatedTorder.setId(torder.getId());

        partialUpdatedTorder.date(UPDATED_DATE).status(UPDATED_STATUS);

        restTorderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTorder.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTorder))
            )
            .andExpect(status().isOk());

        // Validate the Torder in the database
        List<Torder> torderList = torderRepository.findAll();
        assertThat(torderList).hasSize(databaseSizeBeforeUpdate);
        Torder testTorder = torderList.get(torderList.size() - 1);
        assertThat(testTorder.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testTorder.getTotal()).isEqualTo(DEFAULT_TOTAL);
        assertThat(testTorder.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    void fullUpdateTorderWithPatch() throws Exception {
        // Initialize the database
        torderRepository.saveAndFlush(torder);

        int databaseSizeBeforeUpdate = torderRepository.findAll().size();

        // Update the torder using partial update
        Torder partialUpdatedTorder = new Torder();
        partialUpdatedTorder.setId(torder.getId());

        partialUpdatedTorder.date(UPDATED_DATE).total(UPDATED_TOTAL).status(UPDATED_STATUS);

        restTorderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTorder.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTorder))
            )
            .andExpect(status().isOk());

        // Validate the Torder in the database
        List<Torder> torderList = torderRepository.findAll();
        assertThat(torderList).hasSize(databaseSizeBeforeUpdate);
        Torder testTorder = torderList.get(torderList.size() - 1);
        assertThat(testTorder.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testTorder.getTotal()).isEqualTo(UPDATED_TOTAL);
        assertThat(testTorder.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    void patchNonExistingTorder() throws Exception {
        int databaseSizeBeforeUpdate = torderRepository.findAll().size();
        torder.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTorderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, torder.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(torder))
            )
            .andExpect(status().isBadRequest());

        // Validate the Torder in the database
        List<Torder> torderList = torderRepository.findAll();
        assertThat(torderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTorder() throws Exception {
        int databaseSizeBeforeUpdate = torderRepository.findAll().size();
        torder.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTorderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(torder))
            )
            .andExpect(status().isBadRequest());

        // Validate the Torder in the database
        List<Torder> torderList = torderRepository.findAll();
        assertThat(torderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTorder() throws Exception {
        int databaseSizeBeforeUpdate = torderRepository.findAll().size();
        torder.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTorderMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(torder)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Torder in the database
        List<Torder> torderList = torderRepository.findAll();
        assertThat(torderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTorder() throws Exception {
        // Initialize the database
        torderRepository.saveAndFlush(torder);

        int databaseSizeBeforeDelete = torderRepository.findAll().size();

        // Delete the torder
        restTorderMockMvc
            .perform(delete(ENTITY_API_URL_ID, torder.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Torder> torderList = torderRepository.findAll();
        assertThat(torderList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
