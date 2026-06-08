package com.globalsolution.odysea.service;

import com.globalsolution.odysea.dto.TrackingUpdateDTO;
import com.globalsolution.odysea.entity.Entrega;
import com.globalsolution.odysea.entity.EventoRastreamento;
import com.globalsolution.odysea.exception.ResourceNotFoundException;
import com.globalsolution.odysea.repository.EntregaRepository;
import com.globalsolution.odysea.repository.EventoRastreamentoRepository;
import org.springframework.stereotype.Service;

@Service
public class TrackingService {

    private final EntregaRepository entregaRepository;
    private final EventoRastreamentoRepository eventoRepository;

    public TrackingService(EntregaRepository entregaRepository,
                           EventoRastreamentoRepository eventoRepository) {
        this.entregaRepository = entregaRepository;
        this.eventoRepository = eventoRepository;
    }

    public void processTrackingUpdate(TrackingUpdateDTO dto) {

        Entrega entrega = entregaRepository.findById(dto.getEntregaId())
                .orElseThrow(() -> new ResourceNotFoundException("Entrega não encontrada"));

        EventoRastreamento evento = new EventoRastreamento();
        evento.setEntrega(entrega);
        evento.setLatitude(dto.getLatitude());
        evento.setLongitude(dto.getLongitude());   
        evento.setDescricao(buildDescription(dto));

        eventoRepository.save(evento);

        if (isOrigin(dto)) {
            entrega.setStatus("Em Trânsito");
        }else if (isDestination(dto)) {
            entrega.setStatus("Entregue");
        } else{
            entrega.setStatus("Em Trânsito");
        }

        entregaRepository.save(entrega);
    }

    private String buildDescription(TrackingUpdateDTO dto) {
        return "Últimas coordenadas conhecidas: lat="
                + dto.getLatitude()
                + ", lon="
                + dto.getLongitude();
    }

    private boolean isOrigin(TrackingUpdateDTO dto) {
        return dto.getLatitude() == 0 && dto.getLongitude() == 0;
    }

    private boolean isDestination(TrackingUpdateDTO dto) {
        return dto.getLatitude() > 100;
    }
}