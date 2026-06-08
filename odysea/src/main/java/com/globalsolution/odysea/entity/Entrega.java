package com.globalsolution.odysea.entity;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
@Table(name = "entregas")
public class Entrega {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigoRastreio;
    private String origem;
    private String destino;
    private String status;
    private LocalDate dataEnvio;

    // GETTERS

    public Long getId() {
        return id;
    }

    public String getCodigoRastreio() {
        return codigoRastreio;
    }

    public String getOrigem() {
        return origem;
    }

    public String getDestino() {
        return destino;
    }

    public String getStatus() {
        return status;
    }

    public LocalDate getDataEnvio() {
        return dataEnvio;
    }

    // SETTERS

    public void setId(Long id) {
        this.id = id;
    }

    public void setCodigoRastreio(String codigoRastreio) {
        this.codigoRastreio = codigoRastreio;
    }

    public void setOrigem(String origem) {
        this.origem = origem;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setDataEnvio(LocalDate dataEnvio) {
        this.dataEnvio = dataEnvio;
    }
}