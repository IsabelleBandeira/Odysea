package com.globalsolution.odysea.service;

import com.globalsolution.odysea.dto.EventoRequestDTO;
import com.globalsolution.odysea.dto.EventoResponseDTO;
import com.globalsolution.odysea.entity.Entrega;
import com.globalsolution.odysea.entity.EventoRastreamento;
import com.globalsolution.odysea.exception.ResourceNotFoundException;
import com.globalsolution.odysea.repository.EntregaRepository;
import com.globalsolution.odysea.repository.EventoRastreamentoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EventoRastreamentoServiceTest {

    @Mock
    private EventoRastreamentoRepository repository;

    @Mock
    private EntregaRepository entregaRepository;

    @InjectMocks
    private EventoRastreamentoService service;

    @Test
    void deveAdicionarEventoComSucesso() {
        Long entregaId = 1L;

        Entrega entrega = new Entrega();
        entrega.setId(entregaId);

        EventoRequestDTO dto = new EventoRequestDTO();

        EventoRastreamento savedEvento = new EventoRastreamento();
        savedEvento.setId(10L);

        when(entregaRepository.findById(entregaId))
                .thenReturn(Optional.of(entrega));

        when(repository.save(any(EventoRastreamento.class)))
                .thenReturn(savedEvento);

        EventoResponseDTO result =
                service.adicionarEvento(entregaId, dto);

        assertNotNull(result);

        verify(entregaRepository, times(1)).findById(entregaId);
        verify(repository, times(1)).save(any(EventoRastreamento.class));
    }

    @Test
    void deveLancarExcecaoQuandoEntregaNaoExiste() {
        Long entregaId = 99L;

        when(entregaRepository.findById(entregaId))
                .thenReturn(Optional.empty());

        EventoRequestDTO dto = new EventoRequestDTO();

        assertThrows(ResourceNotFoundException.class, () ->
                service.adicionarEvento(entregaId, dto)
        );

        verify(entregaRepository).findById(entregaId);
        verify(repository, never()).save(any());
    }

    @Test
    void deveListarEventosPorEntrega() {
        Long entregaId = 1L;

        EventoRastreamento e1 = new EventoRastreamento();
        EventoRastreamento e2 = new EventoRastreamento();

        when(repository.findByEntregaId(entregaId))
                .thenReturn(List.of(e1, e2));

        List<EventoResponseDTO> result =
                service.listarPorEntrega(entregaId);

        assertEquals(2, result.size());
        verify(repository, times(1)).findByEntregaId(entregaId);
    }

    @Test
    void deveAssociarEntregaAoEventoAoCriar() {
        Long entregaId = 1L;

        Entrega entrega = new Entrega();
        entrega.setId(entregaId);

        EventoRequestDTO dto = new EventoRequestDTO();

        when(entregaRepository.findById(entregaId))
                .thenReturn(Optional.of(entrega));

        when(repository.save(any(EventoRastreamento.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        ArgumentCaptor<EventoRastreamento> captor =
                ArgumentCaptor.forClass(EventoRastreamento.class);

        service.adicionarEvento(entregaId, dto);

        verify(repository).save(captor.capture());

        EventoRastreamento saved = captor.getValue();

        assertEquals(entrega, saved.getEntrega());
        assertNotNull(saved.getDataHora());
    }
}