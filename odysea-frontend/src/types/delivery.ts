import type { TrackingEvent } from './tracking';

export type Destination = 'Lua' | 'Marte';

export type DeliveryStatus =
  | 'CRIADA'
  | 'AGUARDANDO_LANCAMENTO'
  | 'EM_TRANSITO'
  | 'EM_ORBITA'
  | 'TRANSFERENCIA_ESPACIAL'
  | 'EM_APROXIMACAO'
  | 'AGUARDANDO_CONFIRMACAO'
  | 'ENTREGUE'
  | 'EM_ALERTA';

export type Priority = 'Baixa' | 'Média' | 'Alta' | 'Crítica';

export interface Delivery {
  id: number;
  codigoRastreio: string;
  missionName: string;
  origem: string;
  destino: Destination;
  status: DeliveryStatus;
  dataEnvio: string;
  estimatedArrival: string;
  cargoType: string;
  priority: Priority;
  agency: string;
  responsible: string;
  massKg: number;
  latitude?: number;
  longitude?: number;
  lastUpdate: string;
  currentStep: string;
  progress: number;
  iotActive: boolean;
  route: string[];
  observations: string;
  events: TrackingEvent[];
}

export interface DeliveryPayload {
  origem: string;
  destino: string;
}

export interface BackendDeliveryDTO {
  id: number;
  codigoRastreio: string;
  origem: string;
  destino: string;
  status: string;
  latitude?: number;
  longitude?: number;
}
