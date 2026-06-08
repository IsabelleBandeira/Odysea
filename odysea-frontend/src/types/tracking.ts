import type { DeliveryStatus } from './delivery';

export interface TrackingEvent {
  id: string;
  entregaId: number;
  title: string;
  description: string;
  status: DeliveryStatus;
  timestamp: string;
  latitude?: number;
  longitude?: number;
  source: 'API' | 'IoT' | 'Operador' | 'Mock';
}

export interface TrackingEventPayload {
  entregaId: number;
  latitude: number;
  longitude: number;
}

export interface TrackingView {
  id: number;
  codigoRastreio: string;
  origem: string;
  destino: string;
  status: string;
  latitude?: number;
  longitude?: number;
}
