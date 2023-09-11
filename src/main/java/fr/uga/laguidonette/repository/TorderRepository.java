package fr.uga.laguidonette.repository;

import fr.uga.laguidonette.domain.Torder;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Torder entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TorderRepository extends JpaRepository<Torder, Long> {}
