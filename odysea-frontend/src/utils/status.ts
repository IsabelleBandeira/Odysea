import type { Delivery, DeliveryStatus } from '../types/delivery';

export const STATUS_META: Record<DeliveryStatus, { label: string; tone: string; description: string }> = {
  CRIADA: {
    label: 'Criada',
    tone: 'neutral',
    description: 'Entrega cadastrada e aguardando preparação operacional.',
  },
  AGUARDANDO_LANCAMENTO: {
    label: 'Aguardando lançamento',
    tone: 'warning',
    description: 'Carga preparada e aguardando janela de lançamento.',
  },
  EM_TRANSITO: {
    label: 'Em trânsito',
    tone: 'info',
    description: 'Entrega em deslocamento entre etapas logísticas.',
  },
  EM_ORBITA: {
    label: 'Em órbita',
    tone: 'info',
    description: 'Carga em órbita terrestre antes da transferência espacial.',
  },
  TRANSFERENCIA_ESPACIAL: {
    label: 'Transferência espacial',
    tone: 'info',
    description: 'Carga em rota de transferência para destino fora da Terra.',
  },
  EM_APROXIMACAO: {
    label: 'Em aproximação',
    tone: 'success',
    description: 'Carga próxima da fase de pouso ou recebimento.',
  },
  AGUARDANDO_CONFIRMACAO: {
    label: 'Aguardando confirmação',
    tone: 'warning',
    description: 'Aguardando confirmação de recebimento pela equipe de destino.',
  },
  ENTREGUE: {
    label: 'Entregue',
    tone: 'success',
    description: 'Entrega concluída e registrada no histórico operacional.',
  },
  EM_ALERTA: {
    label: 'Em alerta',
    tone: 'danger',
    description: 'Entrega com sinal operacional que exige acompanhamento.',
  },
};

export function getStatusLabel(status: DeliveryStatus | string): string {
  return STATUS_META[status as DeliveryStatus]?.label ?? status;
}

export function getStatusTone(status: DeliveryStatus | string): string {
  return STATUS_META[status as DeliveryStatus]?.tone ?? 'neutral';
}

export function isActiveDelivery(delivery: Delivery): boolean {
  return !['ENTREGUE'].includes(delivery.status);
}

export function calculateDashboardMetrics(deliveries: Delivery[]) {
  return {
    total: deliveries.length,
    active: deliveries.filter(isActiveDelivery).length,
    completed: deliveries.filter((delivery) => delivery.status === 'ENTREGUE').length,
    alerts: deliveries.filter((delivery) => delivery.status === 'EM_ALERTA').length,
    iotActive: deliveries.filter((delivery) => delivery.iotActive).length,
  };
}

export function getProgressLabel(progress: number): string {
  if (progress >= 100) {
    return 'Entrega concluída';
  }

  if (progress >= 75) {
    return 'Fase final de rota';
  }

  if (progress >= 40) {
    return 'Rastreamento em cruzeiro';
  }

  return 'Operação em preparação';
}
