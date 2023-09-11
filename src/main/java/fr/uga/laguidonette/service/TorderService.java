package fr.uga.laguidonette.service;

import fr.uga.laguidonette.domain.Torder;
import java.util.List;
import java.util.Optional;

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
    Torder save(Torder torder);

    /**
     * Updates a torder.
     *
     * @param torder the entity to update.
     * @return the persisted entity.
     */
    Torder update(Torder torder);

    /**
     * Partially updates a torder.
     *
     * @param torder the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Torder> partialUpdate(Torder torder);

    /**
     * Get all the torders.
     *
     * @return the list of entities.
     */
    List<Torder> findAll();

    /**
     * Get the "id" torder.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Torder> findOne(Long id);

    /**
     * Delete the "id" torder.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
