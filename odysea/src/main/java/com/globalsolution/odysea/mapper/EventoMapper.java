package com.globalsolution.odysea.mapper;

import com.globalsolution.odysea.dto.EventoRequestDTO;
import com.globalsolution.odysea.dto.EventoResponseDTO;
import com.globalsolution.odysea.entity.EventoRastreamento;

public class EventoMapper {

    public static EventoRastreamento toEntity(EventoRequestDTO dto) {
        EventoRastreamento e = new EventoRastreamento();
        e.setLocalizacao(dto.getLocalizacao());
        e.setDescricao(dto.getDescricao());
        return e;
    }

    public static EventoResponseDTO toDTO(EventoRastreamento e) {
        EventoResponseDTO dto = new EventoResponseDTO();
        dto.setId(e.getId());
        dto.setLocalizacao(e.getLocalizacao());
        dto.setDescricao(e.getDescricao());
        dto.setDataHora(e.getDataHora());
        return dto;
    }
}