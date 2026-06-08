package com.globalsolution.odysea.controller;

import com.globalsolution.odysea.dto.EntregaRequestDTO;
import com.globalsolution.odysea.dto.EntregaResponseDTO;
import com.globalsolution.odysea.service.EntregaService;
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
class EntregaControllerTest {

    @Mock
    private EntregaService service;

    @InjectMocks
    private EntregaController controller;

    private EntregaResponseDTO responseDTO;
    private EntregaRequestDTO requestDTO;

    @BeforeEach
    void setup() {
        requestDTO = new EntregaRequestDTO();
        responseDTO = new EntregaResponseDTO();
    }

    @Test
    void deveCriarEntrega() {
        when(service.criar(requestDTO)).thenReturn(responseDTO);

        EntregaResponseDTO result = controller.criar(requestDTO);

        assertNotNull(result);
        assertEquals(responseDTO, result);
        verify(service, times(1)).criar(requestDTO);
    }

    @Test
    void deveListarEntregas() {
        List<EntregaResponseDTO> lista = List.of(responseDTO);

        when(service.listar()).thenReturn(lista);

        List<EntregaResponseDTO> result = controller.listar();

        assertEquals(1, result.size());
        assertEquals(lista, result);
        verify(service, times(1)).listar();
    }

    @Test
    void deveBuscarPorId() {
        Long id = 1L;

        when(service.buscarPorId(id)).thenReturn(responseDTO);

        EntregaResponseDTO result = controller.buscar(id);

        assertNotNull(result);
        assertEquals(responseDTO, result);
        verify(service, times(1)).buscarPorId(id);
    }

    @Test
    void deveAtualizarStatus() {
        Long id = 1L;
        String status = "ENTREGUE";

        when(service.atualizarStatus(id, status)).thenReturn(responseDTO);

        EntregaResponseDTO result = controller.atualizarStatus(id, status);

        assertNotNull(result);
        assertEquals(responseDTO, result);
        verify(service, times(1)).atualizarStatus(id, status);
    }

    @Test
    void deveDeletarEntrega() {
        Long id = 1L;

        doNothing().when(service).deletar(id);

        controller.deletar(id);

        verify(service, times(1)).deletar(id);
    }
}