package fr.uga.laguidonette.web.rest;

import fr.uga.laguidonette.domain.Torder;
import fr.uga.laguidonette.repository.TorderRepository;
import fr.uga.laguidonette.service.TorderService;
import fr.uga.laguidonette.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.reactive.ResponseUtil;

/**
 * REST controller for managing {@link fr.uga.laguidonette.domain.Torder}.
 */
@RestController
@RequestMapping("/api")
public class TorderResource {

    private final Logger log = LoggerFactory.getLogger(TorderResource.class);

    private static final String ENTITY_NAME = "torder";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TorderService torderService;

    private final TorderRepository torderRepository;

    public TorderResource(TorderService torderService, TorderRepository torderRepository) {
        this.torderService = torderService;
        this.torderRepository = torderRepository;
    }

    /**
     * {@code POST  /torders} : Create a new torder.
     *
     * @param torder the torder to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new torder, or with status {@code 400 (Bad Request)} if the torder has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/torders")
    public Mono<ResponseEntity<Torder>> createTorder(@RequestBody Torder torder) throws URISyntaxException {
        log.debug("REST request to save Torder : {}", torder);
        if (torder.getId() != null) {
            throw new BadRequestAlertException("A new torder cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return torderService
            .save(torder)
            .map(result -> {
                try {
                    return ResponseEntity
                        .created(new URI("/api/torders/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /torders/:id} : Updates an existing torder.
     *
     * @param id the id of the torder to save.
     * @param torder the torder to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated torder,
     * or with status {@code 400 (Bad Request)} if the torder is not valid,
     * or with status {@code 500 (Internal Server Error)} if the torder couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/torders/{id}")
    public Mono<ResponseEntity<Torder>> updateTorder(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Torder torder
    ) throws URISyntaxException {
        log.debug("REST request to update Torder : {}, {}", id, torder);
        if (torder.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, torder.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return torderRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return torderService
                    .update(torder)
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(result ->
                        ResponseEntity
                            .ok()
                            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                            .body(result)
                    );
            });
    }

    /**
     * {@code PATCH  /torders/:id} : Partial updates given fields of an existing torder, field will ignore if it is null
     *
     * @param id the id of the torder to save.
     * @param torder the torder to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated torder,
     * or with status {@code 400 (Bad Request)} if the torder is not valid,
     * or with status {@code 404 (Not Found)} if the torder is not found,
     * or with status {@code 500 (Internal Server Error)} if the torder couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/torders/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<Torder>> partialUpdateTorder(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Torder torder
    ) throws URISyntaxException {
        log.debug("REST request to partial update Torder partially : {}, {}", id, torder);
        if (torder.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, torder.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return torderRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<Torder> result = torderService.partialUpdate(torder);

                return result
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(res ->
                        ResponseEntity
                            .ok()
                            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, res.getId().toString()))
                            .body(res)
                    );
            });
    }

    /**
     * {@code GET  /torders} : get all the torders.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of torders in body.
     */
    @GetMapping("/torders")
    public Mono<List<Torder>> getAllTorders(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Torders");
        return torderService.findAll().collectList();
    }

    /**
     * {@code GET  /torders} : get all the torders as a stream.
     * @return the {@link Flux} of torders.
     */
    @GetMapping(value = "/torders", produces = MediaType.APPLICATION_NDJSON_VALUE)
    public Flux<Torder> getAllTordersAsStream() {
        log.debug("REST request to get all Torders as a stream");
        return torderService.findAll();
    }

    /**
     * {@code GET  /torders/:id} : get the "id" torder.
     *
     * @param id the id of the torder to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the torder, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/torders/{id}")
    public Mono<ResponseEntity<Torder>> getTorder(@PathVariable Long id) {
        log.debug("REST request to get Torder : {}", id);
        Mono<Torder> torder = torderService.findOne(id);
        return ResponseUtil.wrapOrNotFound(torder);
    }

    /**
     * {@code DELETE  /torders/:id} : delete the "id" torder.
     *
     * @param id the id of the torder to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/torders/{id}")
    public Mono<ResponseEntity<Void>> deleteTorder(@PathVariable Long id) {
        log.debug("REST request to delete Torder : {}", id);
        return torderService
            .delete(id)
            .then(
                Mono.just(
                    ResponseEntity
                        .noContent()
                        .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
                        .build()
                )
            );
    }
}
