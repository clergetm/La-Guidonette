package fr.uga.laguidonette.service;

import fr.uga.laguidonette.domain.Torder;
import java.util.List;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Interface for managing {@link Torder}.
 */
public interface TorderService {
    /**
     * Save a torder.
     *
     * @param torder the entity to save.
     * @return the persisted entity.
     */
    Mono<Torder> save(Torder torder);

    /**
     * Updates a torder.
     *
     * @param torder the entity to update.
     * @return the persisted entity.
     */
    Mono<Torder> update(Torder torder);

    /**
     * Partially updates a torder.
     *
     * @param torder the entity to update partially.
     * @return the persisted entity.
     */
    Mono<Torder> partialUpdate(Torder torder);

    /**
     * Get all the torders.
     *
     * @return the list of entities.
     */
    Flux<Torder> findAll();

    /**
     * Get all the torders with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<Torder> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Returns the number of torders available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" torder.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<Torder> findOne(Long id);

    /**
     * Delete the "id" torder.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
