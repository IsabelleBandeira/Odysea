import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { routes } from '../app/routes';
import { DeliverySummary } from '../components/deliveries/DeliverySummary';
import { IoTSignalCard } from '../components/tracking/IoTSignalCard';
import { TrackingMapMock } from '../components/tracking/TrackingMapMock';
import { TrackingTimeline } from '../components/tracking/TrackingTimeline';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import type { Delivery } from '../types/delivery';
import { getDeliveryById } from '../services/deliveriesService';
import { sendTrackingEvent } from '../services/trackingService';
import { formatDateTime } from '../utils/formatters';

export function DeliveryDetailsPage() {
  const { id } = useParams();
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    let ignore = false;
    const deliveryId = Number(id);

    async function load(): Promise<void> {
      if (Number.isNaN(deliveryId)) {
        setIsLoading(false);
        return;
      }

      const response = await getDeliveryById(deliveryId);
      if (!ignore) {
        setDelivery(response);
        setIsLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [id]);

  async function handleSimulateIoT(): Promise<void> {
    if (!delivery || delivery.latitude === undefined || delivery.longitude === undefined) {
      return;
    }

    const result = await sendTrackingEvent({
      entregaId: delivery.id,
      latitude: delivery.latitude,
      longitude: delivery.longitude,
    });

    setFeedback(
      result.mocked
        ? 'Evento IoT tratado como mock porque a API não está configurada ou não respondeu.'
        : 'Evento IoT enviado para a API local com sucesso.',
    );
  }

  if (isLoading) {
    return <EmptyState title="Carregando entrega" description="Consultando dados locais e fallback de rastreio." />;
  }

  if (!delivery) {
    return (
      <EmptyState
        title="Entrega não encontrada"
        description="O código solicitado não existe nos mocks atuais da Odysea. Volte para a lista de entregas."
      />
    );
  }

  const latestEvent = [...delivery.events].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];

  return (
    <div className="page-stack">
      <Link className="text-link" to={routes.deliveries}>← Voltar para entregas</Link>

      <DeliverySummary delivery={delivery} />

      <section className="details-grid">
        <TrackingMapMock delivery={delivery} />
        <div className="details-grid__side">
          <IoTSignalCard delivery={delivery} event={latestEvent} />
          <section className="panel observations-card">
            <span className="eyebrow">Observações operacionais</span>
            <h2>{delivery.currentStep}</h2>
            <p>{delivery.observations}</p>
            <small>Última atualização: {formatDateTime(delivery.lastUpdate)}</small>
            <Button type="button" variant="secondary" onClick={handleSimulateIoT}>
              Simular envio IoT
            </Button>
            {feedback ? <p className="form-alert form-alert--success" role="status">{feedback}</p> : null}
          </section>
        </div>
      </section>

      <TrackingTimeline events={delivery.events} />
    </div>
  );
}
