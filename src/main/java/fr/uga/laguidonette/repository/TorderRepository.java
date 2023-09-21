package fr.uga.laguidonette.repository;

import fr.uga.laguidonette.domain.Torder;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Torder entity.
 */
@Repository
public interface TorderRepository extends JpaRepository<Torder, Long> {
    @Query("select torder from Torder torder where torder.userID.login = ?#{principal.username}")
    List<Torder> findByUserIDIsCurrentUser();

    default Optional<Torder> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Torder> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Torder> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct torder from Torder torder left join fetch torder.userID",
        countQuery = "select count(distinct torder) from Torder torder"
    )
    Page<Torder> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct torder from Torder torder left join fetch torder.userID")
    List<Torder> findAllWithToOneRelationships();

    @Query("select torder from Torder torder left join fetch torder.userID where torder.id =:id")
    Optional<Torder> findOneWithToOneRelationships(@Param("id") Long id);
}
