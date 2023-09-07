package fr.uga.laguidonette.repository.rowmapper;

import fr.uga.laguidonette.domain.Torder;
import fr.uga.laguidonette.domain.enumeration.Status;
import io.r2dbc.spi.Row;
import java.time.Instant;
import java.util.function.BiFunction;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link Torder}, with proper type conversions.
 */
@Service
public class TorderRowMapper implements BiFunction<Row, String, Torder> {

    private final ColumnConverter converter;

    public TorderRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link Torder} stored in the database.
     */
    @Override
    public Torder apply(Row row, String prefix) {
        Torder entity = new Torder();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setDate(converter.fromRow(row, prefix + "_date", Instant.class));
        entity.setTotal(converter.fromRow(row, prefix + "_total", Long.class));
        entity.setStatus(converter.fromRow(row, prefix + "_status", Status.class));
        entity.setUserIDId(converter.fromRow(row, prefix + "_userid_id", Long.class));
        return entity;
    }
}
