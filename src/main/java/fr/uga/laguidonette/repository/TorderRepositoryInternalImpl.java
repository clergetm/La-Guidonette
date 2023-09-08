package fr.uga.laguidonette.repository;

import static org.springframework.data.relational.core.query.Criteria.where;
import static org.springframework.data.relational.core.query.Query.query;

import fr.uga.laguidonette.domain.Product;
import fr.uga.laguidonette.domain.Torder;
import fr.uga.laguidonette.domain.enumeration.Status;
import fr.uga.laguidonette.repository.rowmapper.TorderRowMapper;
import fr.uga.laguidonette.repository.rowmapper.UserRowMapper;
import io.r2dbc.spi.Row;
import io.r2dbc.spi.RowMetadata;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.function.BiFunction;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.convert.R2dbcConverter;
import org.springframework.data.r2dbc.core.R2dbcEntityOperations;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.data.r2dbc.repository.support.SimpleR2dbcRepository;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.relational.core.sql.Column;
import org.springframework.data.relational.core.sql.Comparison;
import org.springframework.data.relational.core.sql.Condition;
import org.springframework.data.relational.core.sql.Conditions;
import org.springframework.data.relational.core.sql.Expression;
import org.springframework.data.relational.core.sql.Select;
import org.springframework.data.relational.core.sql.SelectBuilder.SelectFromAndJoinCondition;
import org.springframework.data.relational.core.sql.Table;
import org.springframework.data.relational.repository.support.MappingRelationalEntityInformation;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.r2dbc.core.RowsFetchSpec;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC custom repository implementation for the Torder entity.
 */
@SuppressWarnings("unused")
class TorderRepositoryInternalImpl extends SimpleR2dbcRepository<Torder, Long> implements TorderRepositoryInternal {

    private final DatabaseClient db;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;
    private final EntityManager entityManager;

    private final UserRowMapper userMapper;
    private final TorderRowMapper torderMapper;

    private static final Table entityTable = Table.aliased("torder", EntityManager.ENTITY_ALIAS);
    private static final Table userIDTable = Table.aliased("jhi_user", "userID");

    private static final EntityManager.LinkTable productLink = new EntityManager.LinkTable(
        "rel_torder__product",
        "torder_id",
        "product_id"
    );

    public TorderRepositoryInternalImpl(
        R2dbcEntityTemplate template,
        EntityManager entityManager,
        UserRowMapper userMapper,
        TorderRowMapper torderMapper,
        R2dbcEntityOperations entityOperations,
        R2dbcConverter converter
    ) {
        super(
            new MappingRelationalEntityInformation(converter.getMappingContext().getRequiredPersistentEntity(Torder.class)),
            entityOperations,
            converter
        );
        this.db = template.getDatabaseClient();
        this.r2dbcEntityTemplate = template;
        this.entityManager = entityManager;
        this.userMapper = userMapper;
        this.torderMapper = torderMapper;
    }

    @Override
    public Flux<Torder> findAllBy(Pageable pageable) {
        return createQuery(pageable, null).all();
    }

    RowsFetchSpec<Torder> createQuery(Pageable pageable, Condition whereClause) {
        List<Expression> columns = TorderSqlHelper.getColumns(entityTable, EntityManager.ENTITY_ALIAS);
        columns.addAll(UserSqlHelper.getColumns(userIDTable, "userID"));
        SelectFromAndJoinCondition selectFrom = Select
            .builder()
            .select(columns)
            .from(entityTable)
            .leftOuterJoin(userIDTable)
            .on(Column.create("userid_id", entityTable))
            .equals(Column.create("id", userIDTable));
        // we do not support Criteria here for now as of https://github.com/jhipster/generator-jhipster/issues/18269
        String select = entityManager.createSelect(selectFrom, Torder.class, pageable, whereClause);
        return db.sql(select).map(this::process);
    }

    @Override
    public Flux<Torder> findAll() {
        return findAllBy(null);
    }

    @Override
    public Mono<Torder> findById(Long id) {
        Comparison whereClause = Conditions.isEqual(entityTable.column("id"), Conditions.just(id.toString()));
        return createQuery(null, whereClause).one();
    }

    @Override
    public Mono<Torder> findOneWithEagerRelationships(Long id) {
        return findById(id);
    }

    @Override
    public Flux<Torder> findAllWithEagerRelationships() {
        return findAll();
    }

    @Override
    public Flux<Torder> findAllWithEagerRelationships(Pageable page) {
        return findAllBy(page);
    }

    private Torder process(Row row, RowMetadata metadata) {
        Torder entity = torderMapper.apply(row, "e");
        entity.setUserID(userMapper.apply(row, "userID"));
        return entity;
    }

    @Override
    public <S extends Torder> Mono<S> save(S entity) {
        return super.save(entity).flatMap((S e) -> updateRelations(e));
    }

    protected <S extends Torder> Mono<S> updateRelations(S entity) {
        Mono<Void> result = entityManager
            .updateLinkTable(productLink, entity.getId(), entity.getProducts().stream().map(Product::getId))
            .then();
        return result.thenReturn(entity);
    }

    @Override
    public Mono<Void> deleteById(Long entityId) {
        return deleteRelations(entityId).then(super.deleteById(entityId));
    }

    protected Mono<Void> deleteRelations(Long entityId) {
        return entityManager.deleteFromLinkTable(productLink, entityId);
    }
}
