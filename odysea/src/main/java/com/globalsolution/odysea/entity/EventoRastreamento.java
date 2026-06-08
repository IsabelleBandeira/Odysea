package com.globalsolution.odysea.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "eventos_rastreamento")
public class EventoRastreamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String localizacao;

    private String descricao;

    private LocalDateTime dataHora;

    private Double latitude;
    
    private Double longitude;

    @ManyToOne
    @JoinColumn(name = "entrega_id")
    private Entrega entrega;

    // GETTERS

    public Long getId() {
        return id;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public String getDescricao() {
        return descricao;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public Entrega getEntrega() {
        return entrega;
    }

    public Double getLatitude() {
       return latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    // SETTERS

    public void setId(Long id) {
        this.id = id;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public void setEntrega(Entrega entrega) {
        this.entrega = entrega;
    }

    public void setLatitude(Double latitude){
        this.latitude = latitude;
    }

    public void setLongitude(Double longitude){
        this.longitude = longitude;
    }

}