package fr.uga.laguidonette.service;

import fr.uga.laguidonette.domain.OrderLine;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link OrderLine}.
 */
public interface OrderLineService {
    /**
     * Save a orderLine.
     *
     * @param orderLine the entity to save.
     * @return the persisted entity.
     */
    OrderLine save(OrderLine orderLine);

    /**
     * Updates a orderLine.
     *
     * @param orderLine the entity to update.
     * @return the persisted entity.
     */
    OrderLine update(OrderLine orderLine);

    /**
     * Partially updates a orderLine.
     *
     * @param orderLine the entity to update partially.
     * @return the persisted entity.
     */
    Optional<OrderLine> partialUpdate(OrderLine orderLine);

    /**
     * Get all the orderLines.
     *
     * @return the list of entities.
     */
    List<OrderLine> findAll();

    /**
     * Get the "id" orderLine.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<OrderLine> findOne(Long id);

    /**
     * Delete the "id" orderLine.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
