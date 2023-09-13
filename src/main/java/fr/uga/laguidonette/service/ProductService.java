package fr.uga.laguidonette.service;

import fr.uga.laguidonette.domain.Product;
import fr.uga.laguidonette.domain.enumeration.Brand;
import fr.uga.laguidonette.domain.enumeration.Color;
import fr.uga.laguidonette.service.dto.GetProductsPageResponseDto;
import org.springframework.data.domain.Pageable;

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
    GetProductsPageResponseDto search(String query, Integer page, Integer size);
    List<Product> getBestSellers();

    /**
     * Apply filters on a list of product.
     *
     * @param categories the list of categories to find.
     * @param colors the list of colors to find.
     * @param brands the list of brands to find.
     * @return the list of product that contains at least one of these filters.
     */
    List<Product> filterProducts(List<String> categories, List<Color> colors, List<Brand> brands);

    /**
     * Search a list of product.
     *
     * @param query the query to apply.
     * @return the list of products found.
     */

    /**
     * Get the "id" product.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Product> findOne(Long id);
    GetProductsPageResponseDto getProductPage(Integer page, Integer size);

    /**
     * Delete the "id" product.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
