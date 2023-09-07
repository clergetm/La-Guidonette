package fr.uga.laguidonette.service.impl;

import fr.uga.laguidonette.domain.Torder;
import fr.uga.laguidonette.repository.TorderRepository;
import fr.uga.laguidonette.service.TorderService;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link Torder}.
 */
@Service
@Transactional
public class TorderServiceImpl implements TorderService {

    private final Logger log = LoggerFactory.getLogger(TorderServiceImpl.class);

    private final TorderRepository torderRepository;

    public TorderServiceImpl(TorderRepository torderRepository) {
        this.torderRepository = torderRepository;
    }

    @Override
    public Mono<Torder> save(Torder torder) {
        log.debug("Request to save Torder : {}", torder);
        return torderRepository.save(torder);
    }

    @Override
    public Mono<Torder> update(Torder torder) {
        log.debug("Request to update Torder : {}", torder);
        return torderRepository.save(torder);
    }

    @Override
    public Mono<Torder> partialUpdate(Torder torder) {
        log.debug("Request to partially update Torder : {}", torder);

        return torderRepository
            .findById(torder.getId())
            .map(existingTorder -> {
                if (torder.getDate() != null) {
                    existingTorder.setDate(torder.getDate());
                }
                if (torder.getTotal() != null) {
                    existingTorder.setTotal(torder.getTotal());
                }
                if (torder.getStatus() != null) {
                    existingTorder.setStatus(torder.getStatus());
                }

                return existingTorder;
            })
            .flatMap(torderRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<Torder> findAll() {
        log.debug("Request to get all Torders");
        return torderRepository.findAll();
    }

    public Flux<Torder> findAllWithEagerRelationships(Pageable pageable) {
        return torderRepository.findAllWithEagerRelationships(pageable);
    }

    public Mono<Long> countAll() {
        return torderRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<Torder> findOne(Long id) {
        log.debug("Request to get Torder : {}", id);
        return torderRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete Torder : {}", id);
        return torderRepository.deleteById(id);
    }
}
