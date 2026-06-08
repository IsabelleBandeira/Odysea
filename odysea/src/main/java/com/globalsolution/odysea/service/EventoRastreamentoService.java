package com.globalsolution.odysea.service;

import com.globalsolution.odysea.dto.EventoRequestDTO;
import com.globalsolution.odysea.dto.EventoResponseDTO;
import com.globalsolution.odysea.entity.Entrega;
import com.globalsolution.odysea.entity.EventoRastreamento;
import com.globalsolution.odysea.exception.ResourceNotFoundException;
import com.globalsolution.odysea.mapper.EventoMapper;
import com.globalsolution.odysea.repository.EntregaRepository;
import com.globalsolution.odysea.repository.EventoRastreamentoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EventoRastreamentoService {

    private final EventoRastreamentoRepository repository;
    private final EntregaRepository entregaRepository;

    public EventoRastreamentoService(
            EventoRastreamentoRepository repository,
            EntregaRepository entregaRepository
    ) {
        this.repository = repository;
        this.entregaRepository = entregaRepository;
    }

    // ➤ Add tracking event
    public EventoResponseDTO adicionarEvento(Long entregaId, EventoRequestDTO dto) {

        Entrega entrega = entregaRepository.findById(entregaId)
                .orElseThrow(() -> new ResourceNotFoundException("Entrega não encontrada"));

        EventoRastreamento evento = EventoMapper.toEntity(dto);

        evento.setEntrega(entrega);
        evento.setDataHora(LocalDateTime.now());

        EventoRastreamento saved = repository.save(evento);

        return EventoMapper.toDTO(saved);
    }

    // ➤ List tracking history
    public List<EventoResponseDTO> listarPorEntrega(Long entregaId) {

        List<EventoRastreamento> eventos =
                repository.findByEntregaId(entregaId);

        return eventos.stream()
                .map(EventoMapper::toDTO)
                .toList();
    }
}