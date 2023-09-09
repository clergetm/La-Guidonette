package fr.uga.laguidonette.repository;

import fr.uga.laguidonette.domain.Torder;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.hibernate.annotations.QueryHints;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class TorderRepositoryWithBagRelationshipsImpl implements TorderRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Torder> fetchBagRelationships(Optional<Torder> torder) {
        return torder.map(this::fetchProducts);
    }

    @Override
    public Page<Torder> fetchBagRelationships(Page<Torder> torders) {
        return new PageImpl<>(fetchBagRelationships(torders.getContent()), torders.getPageable(), torders.getTotalElements());
    }

    @Override
    public List<Torder> fetchBagRelationships(List<Torder> torders) {
        return Optional.of(torders).map(this::fetchProducts).orElse(Collections.emptyList());
    }

    Torder fetchProducts(Torder result) {
        return entityManager
            .createQuery("select torder from Torder torder left join fetch torder.products where torder is :torder", Torder.class)
            .setParameter("torder", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Torder> fetchProducts(List<Torder> torders) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, torders.size()).forEach(index -> order.put(torders.get(index).getId(), index));
        List<Torder> result = entityManager
            .createQuery("select distinct torder from Torder torder left join fetch torder.products where torder in :torders", Torder.class)
            .setParameter("torders", torders)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
