# Odysea - Integração IoT (Simulação de Tracking)

## Visão Geral

Essa simulação representa dispositivos GPS instalados em cada carga, que enviam periodicamente dados de localização para a aplicação.


## Dispositivo IoT (Simulado)

O dispositivo IoT é representado por um script em Python que simula um rastreador GPS.

Ele envia dados como:

```json
{
  "entregaId": 15,
  "latitude": 10.5,
  "longitude": 20.3
}
```

Esses dados representam a posição atual da carga no espaço.

## Fluxo de Dados
O script Python (IoT simulado) envia coordenadas GPS.

A API Spring Boot recebe os dados no endpoint:

`POST /tracking/events`

&darr;

O sistema processa os dados recebidos.

&darr;

Um evento de rastreamento é gerado.

&darr;

O status da entrega é atualizado automaticamente.


## Objetivo da Simulação

A simulação mostra um cenário realista de rastreamento logístico espacial, onde dados de sensores (GPS) são usados para automatizar o monitoramento e o progresso das entregas no sistema Odysea.