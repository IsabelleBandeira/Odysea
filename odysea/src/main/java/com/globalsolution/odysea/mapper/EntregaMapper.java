package com.globalsolution.odysea.mapper;

import com.globalsolution.odysea.dto.*;
import com.globalsolution.odysea.entity.Entrega;

public class EntregaMapper {

    public static Entrega toEntity(EntregaRequestDTO dto) {
        Entrega e = new Entrega();
        e.setOrigem(dto.getOrigem());
        e.setDestino(dto.getDestino());
        return e;
    }

    public static EntregaResponseDTO toDTO(Entrega e) {
        EntregaResponseDTO dto = new EntregaResponseDTO();
        dto.setId(e.getId());
        dto.setCodigoRastreio(e.getCodigoRastreio());
        dto.setOrigem(e.getOrigem());
        dto.setDestino(e.getDestino());
        dto.setStatus(e.getStatus());
        return dto;
    }
}