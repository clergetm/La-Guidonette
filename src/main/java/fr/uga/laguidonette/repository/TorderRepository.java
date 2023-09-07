package fr.uga.laguidonette.repository;

import fr.uga.laguidonette.domain.Torder;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the Torder entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TorderRepository extends ReactiveCrudRepository<Torder, Long>, TorderRepositoryInternal {
    @Override
    Mono<Torder> findOneWithEagerRelationships(Long id);

    @Override
    Flux<Torder> findAllWithEagerRelationships();

    @Override
    Flux<Torder> findAllWithEagerRelationships(Pageable page);

    @Query("SELECT * FROM torder entity WHERE entity.userid_id = :id")
    Flux<Torder> findByUserID(Long id);

    @Query("SELECT * FROM torder entity WHERE entity.userid_id IS NULL")
    Flux<Torder> findAllWhereUserIDIsNull();

    @Query(
        "SELECT entity.* FROM torder entity JOIN rel_torder__product joinTable ON entity.id = joinTable.product_id WHERE joinTable.product_id = :id"
    )
    Flux<Torder> findByProduct(Long id);

    @Override
    <S extends Torder> Mono<S> save(S entity);

    @Override
    Flux<Torder> findAll();

    @Override
    Mono<Torder> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface TorderRepositoryInternal {
    <S extends Torder> Mono<S> save(S entity);

    Flux<Torder> findAllBy(Pageable pageable);

    Flux<Torder> findAll();

    Mono<Torder> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<Torder> findAllBy(Pageable pageable, Criteria criteria);

    Mono<Torder> findOneWithEagerRelationships(Long id);

    Flux<Torder> findAllWithEagerRelationships();

    Flux<Torder> findAllWithEagerRelationships(Pageable page);

    Mono<Void> deleteById(Long id);
}
