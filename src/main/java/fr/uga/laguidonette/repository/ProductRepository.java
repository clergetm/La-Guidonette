package fr.uga.laguidonette.repository;

import fr.uga.laguidonette.domain.Product;
import fr.uga.laguidonette.domain.enumeration.Brand;
import fr.uga.laguidonette.domain.enumeration.Color;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(
        " select p from Product p where lower(p.label) like lower(concat('%', :query,'%'))" +
        "or lower(p.brand) like lower(concat('%', :query,'%'))"
    )
    List<Product> search(@Param("query") String name);

    @Query(
        "select distinct p from Product p left join p.categories c where c.name in :categories or p.color in :colors or p.brand in :brands"
    )
    List<Product> filterProducts(
        @Param("categories") List<String> categories,
        @Param("colors") List<Color> colors,
        @Param("brands") List<Brand> brands
    );
}
