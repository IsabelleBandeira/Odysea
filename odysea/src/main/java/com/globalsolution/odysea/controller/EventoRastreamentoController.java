package com.globalsolution.odysea.controller;

import com.globalsolution.odysea.dto.EventoRequestDTO;
import com.globalsolution.odysea.dto.EventoResponseDTO;
import com.globalsolution.odysea.service.EventoRastreamentoService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/entregas/{entregaId}/eventos")
public class EventoRastreamentoController {

    private final EventoRastreamentoService service;

    public EventoRastreamentoController(EventoRastreamentoService service) {
        this.service = service;
    }

    // ✅ Add tracking event to a delivery
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EventoResponseDTO adicionarEvento(
            @PathVariable Long entregaId,
            @RequestBody EventoRequestDTO dto
    ) {
        return service.adicionarEvento(entregaId, dto);
    }

    // ✅ List tracking history of a delivery
    @GetMapping
    public List<EventoResponseDTO> listar(@PathVariable Long entregaId) {
        return service.listarPorEntrega(entregaId);
    }
}