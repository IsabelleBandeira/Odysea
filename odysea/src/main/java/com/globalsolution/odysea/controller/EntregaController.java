package com.globalsolution.odysea.controller;

import com.globalsolution.odysea.dto.EntregaRequestDTO;
import com.globalsolution.odysea.dto.EntregaResponseDTO;
import com.globalsolution.odysea.service.EntregaService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/entregas")
public class EntregaController {

    private final EntregaService service;

    public EntregaController(EntregaService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EntregaResponseDTO criar(@RequestBody EntregaRequestDTO dto) {
        return service.criar(dto);
    }

    @GetMapping
    public List<EntregaResponseDTO> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public EntregaResponseDTO buscar(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PutMapping("/{id}/status")
    public EntregaResponseDTO atualizarStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        return service.atualizarStatus(id, status);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}