package fr.uga.laguidonette.service;

import fr.uga.laguidonette.domain.Product;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Product}.
 */
public interface ProductService {
    /**
     * Save a product.
     *
     * @param product the entity to save.
     * @return the persisted entity.
     */
    Product save(Product product);

    /**
     * Updates a product.
     *
     * @param product the entity to update.
     * @return the persisted entity.
     */
    Product update(Product product);

    /**
     * Partially updates a product.
     *
     * @param product the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Product> partialUpdate(Product product);

    /**
     * Get all the products.
     *
     * @return the list of entities.
     */
    List<Product> findAll();

    /**
     * Get the "id" product.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Product> findOne(Long id);

    /**
     * Delete the "id" product.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
