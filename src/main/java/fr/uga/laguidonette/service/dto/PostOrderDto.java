package fr.uga.laguidonette.service.dto;

import fr.uga.laguidonette.domain.OrderLine;
import fr.uga.laguidonette.domain.Product;
import fr.uga.laguidonette.domain.User;
import java.util.List;
import lombok.Data;
import lombok.Setter;

@Data
@Setter
public class PostOrderDto {

    private List<OrderLine> orderLines;
    private User user;
}
