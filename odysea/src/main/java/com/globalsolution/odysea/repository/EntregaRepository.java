package com.globalsolution.odysea.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.globalsolution.odysea.entity.Entrega;

@Repository
public interface EntregaRepository
        extends JpaRepository<Entrega, Long> {

    Optional<Entrega> findByCodigoRastreio(String codigo);
}