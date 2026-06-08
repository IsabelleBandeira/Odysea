package com.globalsolution.odysea.controller;

import com.globalsolution.odysea.dto.EventoRequestDTO;
import com.globalsolution.odysea.dto.EventoResponseDTO;
import com.globalsolution.odysea.service.EventoRastreamentoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EventoRastreamentoControllerTest {

    @Mock
    private EventoRastreamentoService service;

    @InjectMocks
    private EventoRastreamentoController controller;

    private EventoRequestDTO requestDTO;
    private EventoResponseDTO responseDTO;

    @BeforeEach
    void setup() {
        requestDTO = new EventoRequestDTO();
        responseDTO = new EventoResponseDTO();
    }

    @Test
    void deveAdicionarEventoComSucesso() {
        Long entregaId = 1L;

        when(service.adicionarEvento(entregaId, requestDTO))
                .thenReturn(responseDTO);

        EventoResponseDTO result =
                controller.adicionarEvento(entregaId, requestDTO);

        assertNotNull(result);
        assertEquals(responseDTO, result);

        verify(service, times(1))
                .adicionarEvento(entregaId, requestDTO);
    }

    @Test
    void deveListarEventosPorEntrega() {
        Long entregaId = 1L;

        List<EventoResponseDTO> lista = List.of(responseDTO);

        when(service.listarPorEntrega(entregaId))
                .thenReturn(lista);

        List<EventoResponseDTO> result =
                controller.listar(entregaId);

        assertEquals(1, result.size());
        assertEquals(lista, result);

        verify(service, times(1))
                .listarPorEntrega(entregaId);
    }
}