package com.globalsolution.odysea.service;

import com.globalsolution.odysea.dto.EntregaRequestDTO;
import com.globalsolution.odysea.dto.EntregaResponseDTO;
import com.globalsolution.odysea.entity.Entrega;
import com.globalsolution.odysea.exception.ResourceNotFoundException;
import com.globalsolution.odysea.mapper.EntregaMapper;
import com.globalsolution.odysea.repository.EntregaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EntregaService {

    private final EntregaRepository repository;

    public EntregaService(EntregaRepository repository) {
        this.repository = repository;
    }

    public EntregaResponseDTO criar(EntregaRequestDTO dto) {

        Entrega entrega = EntregaMapper.toEntity(dto);

        entrega.setCodigoRastreio(
                "ODY-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase()
        );

        entrega.setStatus("CRIADA");

        Entrega saved = repository.save(entrega);

        return EntregaMapper.toDTO(saved);
    }

    public List<EntregaResponseDTO> listar() {
        return repository.findAll()
                .stream()
                .map(EntregaMapper::toDTO)
                .toList();
    }

    public EntregaResponseDTO buscarPorId(Long id) {
        Entrega entrega = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Entrega não encontrada"));

        return EntregaMapper.toDTO(entrega);
    }

    public EntregaResponseDTO atualizarStatus(Long id, String status) {
        Entrega entrega = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Entrega não encontrada"));

        entrega.setStatus(status);

        return EntregaMapper.toDTO(repository.save(entrega));
    }

    public void deletar(Long id) {

        Entrega entrega = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Entrega não encontrada"));

        repository.delete(entrega);
    }
}