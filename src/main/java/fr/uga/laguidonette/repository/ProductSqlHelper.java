package fr.uga.laguidonette.repository;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.relational.core.sql.Column;
import org.springframework.data.relational.core.sql.Expression;
import org.springframework.data.relational.core.sql.Table;

public class ProductSqlHelper {

    public static List<Expression> getColumns(Table table, String columnPrefix) {
        List<Expression> columns = new ArrayList<>();
        columns.add(Column.aliased("id", table, columnPrefix + "_id"));
        columns.add(Column.aliased("label", table, columnPrefix + "_label"));
        columns.add(Column.aliased("description", table, columnPrefix + "_description"));
        columns.add(Column.aliased("price", table, columnPrefix + "_price"));
        columns.add(Column.aliased("brand", table, columnPrefix + "_brand"));
        columns.add(Column.aliased("model", table, columnPrefix + "_model"));
        columns.add(Column.aliased("color", table, columnPrefix + "_color"));
        columns.add(Column.aliased("quantity", table, columnPrefix + "_quantity"));

        return columns;
    }
}
