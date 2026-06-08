package com.globalsolution.odysea.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.globalsolution.odysea.entity.EventoRastreamento;

@Repository
public interface EventoRastreamentoRepository
        extends JpaRepository<EventoRastreamento, Long> {

    List<EventoRastreamento> findByEntregaId(Long entregaId);

    EventoRastreamento findTopByEntregaIdOrderByIdDesc(Long entregaId);
}
