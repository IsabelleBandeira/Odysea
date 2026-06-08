import { mockDeliveries } from '../data/mockDeliveries';
import type { BackendDeliveryDTO, Delivery, DeliveryPayload, DeliveryStatus } from '../types/delivery';
import { apiRequest, shouldUseApi } from './apiClient';

function normalizeStatus(status: string): DeliveryStatus {
  const normalized = status
    .trim()
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_');

  const statusMap: Record<string, DeliveryStatus> = {
    CRIADA: 'CRIADA',
    EM_TRANSITO: 'EM_TRANSITO',
    ENTREGUE: 'ENTREGUE',
    EM_ALERTA: 'EM_ALERTA',
    AGUARDANDO_LANCAMENTO: 'AGUARDANDO_LANCAMENTO',
    EM_APROXIMACAO: 'EM_APROXIMACAO',
    AGUARDANDO_CONFIRMACAO: 'AGUARDANDO_CONFIRMACAO',
    EM_ORBITA: 'EM_ORBITA',
    TRANSFERENCIA_ESPACIAL: 'TRANSFERENCIA_ESPACIAL',
  };

  return statusMap[normalized] ?? 'EM_TRANSITO';
}

function mapBackendDelivery(dto: BackendDeliveryDTO, index = 0): Delivery {
  const fallback = mockDeliveries.find((delivery) => delivery.id === dto.id) ?? mockDeliveries[index % mockDeliveries.length];

  return {
    ...fallback,
    id: dto.id,
    codigoRastreio: dto.codigoRastreio ?? fallback.codigoRastreio,
    origem: dto.origem ?? fallback.origem,
    destino: dto.destino === 'Marte' ? 'Marte' : dto.destino === 'Lua' ? 'Lua' : fallback.destino,
    status: normalizeStatus(dto.status ?? fallback.status),
    latitude: dto.latitude ?? fallback.latitude,
    longitude: dto.longitude ?? fallback.longitude,
    lastUpdate: new Date().toISOString(),
  };
}

export async function listDeliveries(): Promise<Delivery[]> {
  if (shouldUseApi()) {
    try {
      const response = await apiRequest<BackendDeliveryDTO[]>('/api/entregas');
      return response.map(mapBackendDelivery);
    } catch (error) {
      console.warn('API indisponível. Fallback para mocks.', error);
    }
  }

  return mockDeliveries;
}

export async function getDeliveryById(id: number): Promise<Delivery | null> {
  if (shouldUseApi()) {
    try {
      const response = await apiRequest<BackendDeliveryDTO>(`/api/entregas/${id}`);
      return mapBackendDelivery(response);
    } catch (error) {
      console.warn('API indisponível para detalhe. Fallback para mocks.', error);
    }
  }

  return mockDeliveries.find((delivery) => delivery.id === id) ?? null;
}

export async function createDelivery(payload: DeliveryPayload): Promise<Delivery> {
  if (shouldUseApi()) {
    const response = await apiRequest<BackendDeliveryDTO>('/api/entregas', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return mapBackendDelivery(response);
  }

  return {
    ...mockDeliveries[0],
    id: Date.now(),
    codigoRastreio: `ODY-MOCK-${Date.now()}`,
    origem: payload.origem,
    destino: payload.destino === 'Marte' ? 'Marte' : 'Lua',
    status: 'CRIADA',
    missionName: 'Nova entrega simulada',
  };
}

export async function updateDeliveryStatus(id: number, status: DeliveryStatus): Promise<Delivery | null> {
  if (shouldUseApi()) {
    const response = await apiRequest<BackendDeliveryDTO>(`/api/entregas/${id}/status?status=${encodeURIComponent(status)}`, {
      method: 'PUT',
    });

    return mapBackendDelivery(response);
  }

  const delivery = mockDeliveries.find((item) => item.id === id);
  return delivery ? { ...delivery, status } : null;
}

export async function deleteDelivery(id: number): Promise<void> {
  if (shouldUseApi()) {
    await apiRequest<void>(`/api/entregas/${id}`, { method: 'DELETE' });
  }
}
