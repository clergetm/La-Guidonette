package fr.uga.laguidonette.service.dto;

import fr.uga.laguidonette.domain.Product;
import java.util.List;
import lombok.Data;
import lombok.Setter;

@Data
@Setter
public class GetProductsPageResponseDto {

    private List<Product> products;
    private Integer size;
    private Long totalProducts;
    private Integer totalPages;
    private Integer page;
    private Boolean last;
}
