package com.globalsolution.odysea.repository;

import com.globalsolution.odysea.entity.Entrega;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class EntregaRepositoryTest {

    @Autowired
    private EntregaRepository repository;

    @Test
    void deveSalvarEntrega() {

        Entrega entrega = new Entrega();
        entrega.setCodigoRastreio("ABC123");
        entrega.setOrigem("SP");
        entrega.setDestino("RJ");
        entrega.setStatus("CRIADA");
        entrega.setDataEnvio(LocalDate.now());

        Entrega saved = repository.save(entrega);

        assertNotNull(saved.getId());
        assertEquals("ABC123", saved.getCodigoRastreio());
    }
}