package com.globalsolution.odysea.repository;

import com.globalsolution.odysea.entity.Entrega;
import com.globalsolution.odysea.entity.EventoRastreamento;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class EventoRastreamentoRepositoryTest {

    @Autowired
    private EventoRastreamentoRepository repository;

    @Autowired
    private com.globalsolution.odysea.repository.EntregaRepository entregaRepository;

    @Test
    void deveBuscarEventosPorEntregaId() {
        Entrega entrega = new Entrega();
        entrega.setStatus("CRIADA");
        entrega = entregaRepository.save(entrega);

        Long entregaId = entrega.getId();

        EventoRastreamento evento1 = new EventoRastreamento();
        evento1.setEntrega(entrega);

        EventoRastreamento evento2 = new EventoRastreamento();
        evento2.setEntrega(entrega);

        repository.save(evento1);
        repository.save(evento2);

        List<EventoRastreamento> result =
                repository.findByEntregaId(entregaId);

        assertEquals(2, result.size());

        for (EventoRastreamento e : result) {
            assertEquals(entregaId, e.getEntrega().getId());
        }
    }

    @Test
    void deveRetornarListaVaziaQuandoNaoExistemEventos() {
        List<EventoRastreamento> result =
                repository.findByEntregaId(999L);

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }
}   