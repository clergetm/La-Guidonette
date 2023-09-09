package fr.uga.laguidonette.repository;

import fr.uga.laguidonette.domain.Torder;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface TorderRepositoryWithBagRelationships {
    Optional<Torder> fetchBagRelationships(Optional<Torder> torder);

    List<Torder> fetchBagRelationships(List<Torder> torders);

    Page<Torder> fetchBagRelationships(Page<Torder> torders);
}
