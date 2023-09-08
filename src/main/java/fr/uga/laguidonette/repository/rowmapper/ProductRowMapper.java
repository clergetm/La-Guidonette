package fr.uga.laguidonette.repository.rowmapper;

import fr.uga.laguidonette.domain.Product;
import fr.uga.laguidonette.domain.enumeration.Brand;
import fr.uga.laguidonette.domain.enumeration.Color;
import io.r2dbc.spi.Row;
import java.util.function.BiFunction;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link Product}, with proper type conversions.
 */
@Service
public class ProductRowMapper implements BiFunction<Row, String, Product> {

    private final ColumnConverter converter;

    public ProductRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link Product} stored in the database.
     */
    @Override
    public Product apply(Row row, String prefix) {
        Product entity = new Product();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setLabel(converter.fromRow(row, prefix + "_label", String.class));
        entity.setDescription(converter.fromRow(row, prefix + "_description", String.class));
        entity.setPrice(converter.fromRow(row, prefix + "_price", Long.class));
        entity.setBrand(converter.fromRow(row, prefix + "_brand", Brand.class));
        entity.setModel(converter.fromRow(row, prefix + "_model", String.class));
        entity.setColor(converter.fromRow(row, prefix + "_color", Color.class));
        entity.setQuantity(converter.fromRow(row, prefix + "_quantity", Integer.class));
        return entity;
    }
}
