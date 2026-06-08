package com.globalsolution.odysea.service;

import com.globalsolution.odysea.dto.EntregaRequestDTO;
import com.globalsolution.odysea.dto.EntregaResponseDTO;
import com.globalsolution.odysea.entity.Entrega;
import com.globalsolution.odysea.exception.ResourceNotFoundException;
import com.globalsolution.odysea.repository.EntregaRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EntregaServiceTest {

    @Mock
    private EntregaRepository repository;

    @InjectMocks
    private EntregaService service;

    @Test
    void deveCriarEntregaComStatusECodigoRastreio() {
        EntregaRequestDTO dto = new EntregaRequestDTO();

        Entrega saved = new Entrega();
        saved.setId(1L);

        when(repository.save(any(Entrega.class))).thenReturn(saved);

        EntregaResponseDTO response = service.criar(dto);

        assertNotNull(response);
        verify(repository, times(1)).save(any(Entrega.class));
    }

    @Test
    void deveListarEntregas() {
        Entrega e1 = new Entrega();
        Entrega e2 = new Entrega();

        when(repository.findAll()).thenReturn(List.of(e1, e2));

        List<EntregaResponseDTO> result = service.listar();

        assertEquals(2, result.size());
        verify(repository, times(1)).findAll();
    }

    @Test
    void deveBuscarPorIdComSucesso() {
        Long id = 1L;

        Entrega entrega = new Entrega();
        when(repository.findById(id)).thenReturn(Optional.of(entrega));

        EntregaResponseDTO result = service.buscarPorId(id);

        assertNotNull(result);
        verify(repository, times(1)).findById(id);
    }

    @Test
    void deveLancarExcecaoQuandoNaoEncontrarPorId() {
        Long id = 99L;

        when(repository.findById(id)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            service.buscarPorId(id);
        });

        verify(repository, times(1)).findById(id);
    }

    @Test
    void deveAtualizarStatusComSucesso() {
        Long id = 1L;

        Entrega entrega = new Entrega();
        entrega.setStatus("CRIADA");

        when(repository.findById(id)).thenReturn(Optional.of(entrega));
        when(repository.save(any(Entrega.class))).thenReturn(entrega);

        EntregaResponseDTO result = service.atualizarStatus(id, "ENTREGUE");

        assertNotNull(result);
        verify(repository).findById(id);
        verify(repository).save(entrega);
        assertEquals("ENTREGUE", entrega.getStatus());
    }

    @Test
    void deveDeletarEntregaComSucesso() {
        Long id = 1L;

        Entrega entrega = new Entrega();

        when(repository.findById(id)).thenReturn(Optional.of(entrega));
        doNothing().when(repository).delete(entrega);

        service.deletar(id);

        verify(repository).findById(id);
        verify(repository).delete(entrega);
    }

    @Test
    void deveLancarExcecaoAoDeletarQuandoNaoEncontrado() {
        Long id = 10L;

        when(repository.findById(id)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> service.deletar(id));

        verify(repository).findById(id);
        verify(repository, never()).delete(any());
    }
}