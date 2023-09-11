package fr.uga.laguidonette.service.impl;

import fr.uga.laguidonette.domain.OrderLine;
import fr.uga.laguidonette.repository.OrderLineRepository;
import fr.uga.laguidonette.service.OrderLineService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link OrderLine}.
 */
@Service
@Transactional
public class OrderLineServiceImpl implements OrderLineService {

    private final Logger log = LoggerFactory.getLogger(OrderLineServiceImpl.class);

    private final OrderLineRepository orderLineRepository;

    public OrderLineServiceImpl(OrderLineRepository orderLineRepository) {
        this.orderLineRepository = orderLineRepository;
    }

    @Override
    public OrderLine save(OrderLine orderLine) {
        log.debug("Request to save OrderLine : {}", orderLine);
        return orderLineRepository.save(orderLine);
    }

    @Override
    public OrderLine update(OrderLine orderLine) {
        log.debug("Request to update OrderLine : {}", orderLine);
        return orderLineRepository.save(orderLine);
    }

    @Override
    public Optional<OrderLine> partialUpdate(OrderLine orderLine) {
        log.debug("Request to partially update OrderLine : {}", orderLine);

        return orderLineRepository
            .findById(orderLine.getId())
            .map(existingOrderLine -> {
                if (orderLine.getQuantity() != null) {
                    existingOrderLine.setQuantity(orderLine.getQuantity());
                }

                return existingOrderLine;
            })
            .map(orderLineRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderLine> findAll() {
        log.debug("Request to get all OrderLines");
        return orderLineRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<OrderLine> findOne(Long id) {
        log.debug("Request to get OrderLine : {}", id);
        return orderLineRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete OrderLine : {}", id);
        orderLineRepository.deleteById(id);
    }
}
