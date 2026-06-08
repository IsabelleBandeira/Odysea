import { mockDeliveries } from '../data/mockDeliveries';
import type { TrackingEventPayload, TrackingView } from '../types/tracking';
import { apiRequest, shouldUseApi } from './apiClient';

export async function sendTrackingEvent(payload: TrackingEventPayload): Promise<{ mocked: boolean }> {
  if (shouldUseApi()) {
    try {
      await apiRequest<void>('/tracking/events', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      return { mocked: false };
    } catch (error) {
      console.warn('Falha ao enviar tracking para API. Evento tratado como mock.', error);
    }
  }

  return { mocked: true };
}

export async function getTrackingByDeliveryId(entregaId: number): Promise<TrackingView | null> {
  if (shouldUseApi()) {
    try {
      return await apiRequest<TrackingView>(`/tracking/${entregaId}`);
    } catch (error) {
      console.warn('Falha ao consultar tracking na API. Fallback para mock.', error);
    }
  }

  const delivery = mockDeliveries.find((item) => item.id === entregaId);
  if (!delivery) {
    return null;
  }

  return {
    id: delivery.id,
    codigoRastreio: delivery.codigoRastreio,
    origem: delivery.origem,
    destino: delivery.destino,
    status: delivery.status,
    latitude: delivery.latitude,
    longitude: delivery.longitude,
  };
}
