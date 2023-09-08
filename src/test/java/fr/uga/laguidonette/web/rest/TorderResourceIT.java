package fr.uga.laguidonette.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

import fr.uga.laguidonette.IntegrationTest;
import fr.uga.laguidonette.domain.Torder;
import fr.uga.laguidonette.domain.enumeration.Status;
import fr.uga.laguidonette.repository.EntityManager;
import fr.uga.laguidonette.repository.TorderRepository;
import fr.uga.laguidonette.service.TorderService;
import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Integration tests for the {@link TorderResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
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
    private WebTestClient webTestClient;

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

    public static void deleteEntities(EntityManager em) {
        try {
            em.deleteAll("rel_torder__product").block();
            em.deleteAll(Torder.class).block();
        } catch (Exception e) {
            // It can fail, if other entities are still referring this - it will be removed later.
        }
    }

    @AfterEach
    public void cleanup() {
        deleteEntities(em);
    }

    @BeforeEach
    public void initTest() {
        deleteEntities(em);
        torder = createEntity(em);
    }

    @Test
    void createTorder() throws Exception {
        int databaseSizeBeforeCreate = torderRepository.findAll().collectList().block().size();
        // Create the Torder
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(torder))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the Torder in the database
        List<Torder> torderList = torderRepository.findAll().collectList().block();
        assertThat(torderList).hasSize(databaseSizeBeforeCreate + 1);
        Torder testTorder = torderList.get(torderList.size() - 1);
        assertThat(testTorder.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testTorder.getTotal()).isEqualTo(DEFAULT_TOTAL);
        assertThat(testTorder.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    void createTorderWithExistingId() throws Exception {
        // Create the Torder with an existing ID
        torder.setId(1L);

        int databaseSizeBeforeCreate = torderRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(torder))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Torder in the database
        List<Torder> torderList = torderRepository.findAll().collectList().block();
        assertThat(torderList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void getAllTordersAsStream() {
        // Initialize the database
        torderRepository.save(torder).block();

        List<Torder> torderList = webTestClient
            .get()
            .uri(ENTITY_API_URL)
            .accept(MediaType.APPLICATION_NDJSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentTypeCompatibleWith(MediaType.APPLICATION_NDJSON)
            .returnResult(Torder.class)
            .getResponseBody()
            .filter(torder::equals)
            .collectList()
            .block(Duration.ofSeconds(5));

        assertThat(torderList).isNotNull();
        assertThat(torderList).hasSize(1);
        Torder testTorder = torderList.get(0);
        assertThat(testTorder.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testTorder.getTotal()).isEqualTo(DEFAULT_TOTAL);
        assertThat(testTorder.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    void getAllTorders() {
        // Initialize the database
        torderRepository.save(torder).block();

        // Get all the torderList
        webTestClient
            .get()
            .uri(ENTITY_API_URL + "?sort=id,desc")
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.[*].id")
            .value(hasItem(torder.getId().intValue()))
            .jsonPath("$.[*].date")
            .value(hasItem(DEFAULT_DATE.toString()))
            .jsonPath("$.[*].total")
            .value(hasItem(DEFAULT_TOTAL.intValue()))
            .jsonPath("$.[*].status")
            .value(hasItem(DEFAULT_STATUS.toString()));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllTordersWithEagerRelationshipsIsEnabled() {
        when(torderServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=true").exchange().expectStatus().isOk();

        verify(torderServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllTordersWithEagerRelationshipsIsNotEnabled() {
        when(torderServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=false").exchange().expectStatus().isOk();
        verify(torderRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    void getTorder() {
        // Initialize the database
        torderRepository.save(torder).block();

        // Get the torder
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, torder.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(torder.getId().intValue()))
            .jsonPath("$.date")
            .value(is(DEFAULT_DATE.toString()))
            .jsonPath("$.total")
            .value(is(DEFAULT_TOTAL.intValue()))
            .jsonPath("$.status")
            .value(is(DEFAULT_STATUS.toString()));
    }

    @Test
    void getNonExistingTorder() {
        // Get the torder
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingTorder() throws Exception {
        // Initialize the database
        torderRepository.save(torder).block();

        int databaseSizeBeforeUpdate = torderRepository.findAll().collectList().block().size();

        // Update the torder
        Torder updatedTorder = torderRepository.findById(torder.getId()).block();
        updatedTorder.date(UPDATED_DATE).total(UPDATED_TOTAL).status(UPDATED_STATUS);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, updatedTorder.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(updatedTorder))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Torder in the database
        List<Torder> torderList = torderRepository.findAll().collectList().block();
        assertThat(torderList).hasSize(databaseSizeBeforeUpdate);
        Torder testTorder = torderList.get(torderList.size() - 1);
        assertThat(testTorder.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testTorder.getTotal()).isEqualTo(UPDATED_TOTAL);
        assertThat(testTorder.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    void putNonExistingTorder() throws Exception {
        int databaseSizeBeforeUpdate = torderRepository.findAll().collectList().block().size();
        torder.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, torder.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(torder))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Torder in the database
        List<Torder> torderList = torderRepository.findAll().collectList().block();
        assertThat(torderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchTorder() throws Exception {
        int databaseSizeBeforeUpdate = torderRepository.findAll().collectList().block().size();
        torder.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, count.incrementAndGet())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(torder))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Torder in the database
        List<Torder> torderList = torderRepository.findAll().collectList().block();
        assertThat(torderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamTorder() throws Exception {
        int databaseSizeBeforeUpdate = torderRepository.findAll().collectList().block().size();
        torder.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(torder))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Torder in the database
        List<Torder> torderList = torderRepository.findAll().collectList().block();
        assertThat(torderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateTorderWithPatch() throws Exception {
        // Initialize the database
        torderRepository.save(torder).block();

        int databaseSizeBeforeUpdate = torderRepository.findAll().collectList().block().size();

        // Update the torder using partial update
        Torder partialUpdatedTorder = new Torder();
        partialUpdatedTorder.setId(torder.getId());

        partialUpdatedTorder.date(UPDATED_DATE).status(UPDATED_STATUS);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedTorder.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedTorder))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Torder in the database
        List<Torder> torderList = torderRepository.findAll().collectList().block();
        assertThat(torderList).hasSize(databaseSizeBeforeUpdate);
        Torder testTorder = torderList.get(torderList.size() - 1);
        assertThat(testTorder.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testTorder.getTotal()).isEqualTo(DEFAULT_TOTAL);
        assertThat(testTorder.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    void fullUpdateTorderWithPatch() throws Exception {
        // Initialize the database
        torderRepository.save(torder).block();

        int databaseSizeBeforeUpdate = torderRepository.findAll().collectList().block().size();

        // Update the torder using partial update
        Torder partialUpdatedTorder = new Torder();
        partialUpdatedTorder.setId(torder.getId());

        partialUpdatedTorder.date(UPDATED_DATE).total(UPDATED_TOTAL).status(UPDATED_STATUS);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedTorder.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedTorder))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Torder in the database
        List<Torder> torderList = torderRepository.findAll().collectList().block();
        assertThat(torderList).hasSize(databaseSizeBeforeUpdate);
        Torder testTorder = torderList.get(torderList.size() - 1);
        assertThat(testTorder.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testTorder.getTotal()).isEqualTo(UPDATED_TOTAL);
        assertThat(testTorder.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    void patchNonExistingTorder() throws Exception {
        int databaseSizeBeforeUpdate = torderRepository.findAll().collectList().block().size();
        torder.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, torder.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(torder))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Torder in the database
        List<Torder> torderList = torderRepository.findAll().collectList().block();
        assertThat(torderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchTorder() throws Exception {
        int databaseSizeBeforeUpdate = torderRepository.findAll().collectList().block().size();
        torder.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, count.incrementAndGet())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(torder))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Torder in the database
        List<Torder> torderList = torderRepository.findAll().collectList().block();
        assertThat(torderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamTorder() throws Exception {
        int databaseSizeBeforeUpdate = torderRepository.findAll().collectList().block().size();
        torder.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(torder))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Torder in the database
        List<Torder> torderList = torderRepository.findAll().collectList().block();
        assertThat(torderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteTorder() {
        // Initialize the database
        torderRepository.save(torder).block();

        int databaseSizeBeforeDelete = torderRepository.findAll().collectList().block().size();

        // Delete the torder
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, torder.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<Torder> torderList = torderRepository.findAll().collectList().block();
        assertThat(torderList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
