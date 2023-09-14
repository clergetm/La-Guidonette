package fr.uga.laguidonette.web.rest;

import fr.uga.laguidonette.domain.OrderLine;
import fr.uga.laguidonette.domain.Product;
import fr.uga.laguidonette.domain.Torder;
import fr.uga.laguidonette.repository.ProductRepository;
import fr.uga.laguidonette.repository.TorderRepository;
import fr.uga.laguidonette.service.OrderLineService;
import fr.uga.laguidonette.service.ProductService;
import fr.uga.laguidonette.service.TorderService;
import fr.uga.laguidonette.service.dto.PostOrderDto;
import fr.uga.laguidonette.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.Instant;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.persistence.OptimisticLockException;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

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

    private final ProductService productService;

    private final ProductRepository productRepository;

    private final OrderLineService orderLineService;

    public TorderResource(
        TorderService torderService,
        TorderRepository torderRepository,
        ProductRepository productRepository,
        ProductService productService,
        OrderLineService orderLineService
    ) {
        this.torderService = torderService;
        this.torderRepository = torderRepository;
        this.productRepository = productRepository;
        this.productService = productService;
        this.orderLineService = orderLineService;
    }

    /**
     *
     * @param torder the torder to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new torder, or with status {@code 400 (Bad Request)} if the torder has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    public ResponseEntity<Torder> createTorder(@Valid @RequestBody Torder torder) throws URISyntaxException {
        log.debug("REST request to save Torder : {}", torder);
        if (torder.getId() != null) {
            throw new BadRequestAlertException("A new torder cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Torder result = torderService.save(torder);
        return ResponseEntity
            .created(new URI("/api/torders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code POST  /torders} : Create a new torder using a list of orderlines and a user.
     */
    @PostMapping("/torders")
    public ResponseEntity<Torder> createTorderFromProducts(@Valid @RequestBody PostOrderDto postOrderDto) throws URISyntaxException {
        log.debug("REST request to save Torder from products : {}", postOrderDto);
        if (postOrderDto.getOrderLines() == null) {
            throw new BadRequestAlertException("A new torder cannot have an empty orderlines list", "product", "noorderline");
        }
        if (postOrderDto.getUser() == null) {
            throw new BadRequestAlertException("A new torder must have an user", "user", "nouser");
        }
        // Step 1: Verify that each product of each orderline has a stock >= orderline.quantity
        for (OrderLine orderLine : postOrderDto.getOrderLines()) {
            if (orderLine.getProduct() == null) {
                throw new BadRequestAlertException("A new orderline must have a product", "product", "noproducts");
            }
            if (!productRepository.existsById(orderLine.getProduct().getId())) {
                throw new BadRequestAlertException("Entity not found", "product", "idnotfound");
            }

            Optional<Product> optionalProduct = productService.findOne(orderLine.getProduct().getId());
            if (optionalProduct.get().getQuantity() < orderLine.getQuantity()) throw new BadRequestAlertException(
                "Product " + optionalProduct.get().getId() + "has a quantity of " + optionalProduct.get().getQuantity(),
                "product",
                "badquantity"
            );
        }
        // Step 2: Decrement stock by quantity for each product
        for (OrderLine orderLine : postOrderDto.getOrderLines()) {
            orderLine.getProduct().setQuantity(orderLine.getQuantity());
            try {
                productService.update(orderLine.getProduct());
            } catch (OptimisticLockException e) {
                Optional<Product> optionalProduct = productService.findOne(orderLine.getProduct().getId());
                optionalProduct.get().setQuantity(orderLine.getQuantity());
                productService.update(optionalProduct.get());
            }
        }
        // Step 3: Create a new Torder
        Torder torder = new Torder();
        torder.id(null);
        torder.userID(postOrderDto.getUser());
        torder.date(Instant.now());
        Torder createdTorder = createTorder(torder).getBody();
        // Step 4: Create each Orderline linked with the torder and the user.
        for (OrderLine orderLine : postOrderDto.getOrderLines()) {
            orderLine.setTorder(createdTorder);
            orderLineService.save(orderLine);
        }

        assert createdTorder != null;
        return ResponseEntity
            .created(new URI("/api/torders/" + createdTorder.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, createdTorder.getId().toString()))
            .body(createdTorder);
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
    public ResponseEntity<Torder> updateTorder(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Torder torder
    ) throws URISyntaxException {
        log.debug("REST request to update Torder : {}, {}", id, torder);
        if (torder.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, torder.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!torderRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Torder result = torderService.update(torder);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, torder.getId().toString()))
            .body(result);
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
    public ResponseEntity<Torder> partialUpdateTorder(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Torder torder
    ) throws URISyntaxException {
        log.debug("REST request to partial update Torder partially : {}, {}", id, torder);
        if (torder.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, torder.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!torderRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Torder> result = torderService.partialUpdate(torder);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, torder.getId().toString())
        );
    }

    /**
     * {@code GET  /torders} : get all the torders.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of torders in body.
     */
    @GetMapping("/torders")
    public List<Torder> getAllTorders() {
        log.debug("REST request to get all Torders");
        return torderService.findAll();
    }

    /**
     * {@code GET  /torders/:id} : get the "id" torder.
     *
     * @param id the id of the torder to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the torder, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/torders/{id}")
    public ResponseEntity<Torder> getTorder(@PathVariable Long id) {
        log.debug("REST request to get Torder : {}", id);
        Optional<Torder> torder = torderService.findOne(id);
        return ResponseUtil.wrapOrNotFound(torder);
    }

    /**
     * {@code DELETE  /torders/:id} : delete the "id" torder.
     *
     * @param id the id of the torder to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/torders/{id}")
    public ResponseEntity<Void> deleteTorder(@PathVariable Long id) {
        log.debug("REST request to delete Torder : {}", id);
        torderService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
