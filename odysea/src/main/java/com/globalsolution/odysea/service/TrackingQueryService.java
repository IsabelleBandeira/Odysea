package com.globalsolution.odysea.service;

import com.globalsolution.odysea.dto.TrackingViewDTO;
import com.globalsolution.odysea.entity.Entrega;
import com.globalsolution.odysea.entity.EventoRastreamento;
import com.globalsolution.odysea.repository.EntregaRepository;
import com.globalsolution.odysea.repository.EventoRastreamentoRepository;
import org.springframework.stereotype.Service;

@Service
public class TrackingQueryService {

    private final EntregaRepository entregaRepository;
    private final EventoRastreamentoRepository eventoRepository;

    public TrackingQueryService(EntregaRepository entregaRepository,
                                EventoRastreamentoRepository eventoRepository) {
        this.entregaRepository = entregaRepository;
        this.eventoRepository = eventoRepository;
    }

    public TrackingViewDTO getTrackingView(Long entregaId) {

        Entrega entrega = entregaRepository.findById(entregaId)
                .orElseThrow();

        EventoRastreamento lastEvent =
                eventoRepository.findTopByEntregaIdOrderByIdDesc(entregaId);

        TrackingViewDTO dto = new TrackingViewDTO();

        dto.setId(entrega.getId());
        dto.setCodigoRastreio(entrega.getCodigoRastreio());
        dto.setOrigem(entrega.getOrigem());
        dto.setDestino(entrega.getDestino());
        dto.setStatus(entrega.getStatus());

        if (lastEvent != null && lastEvent.getLatitude() != null) {
            dto.setLatitude(lastEvent.getLatitude());
            dto.setLongitude(lastEvent.getLongitude());
        }

        return dto;
    }
}