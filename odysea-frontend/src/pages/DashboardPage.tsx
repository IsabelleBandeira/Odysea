import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../app/routes';
import { DeliveryList } from '../components/deliveries/DeliveryList';
import { IoTSignalCard } from '../components/tracking/IoTSignalCard';
import { MetricCard } from '../components/ui/MetricCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import type { Delivery } from '../types/delivery';
import type { TrackingEvent } from '../types/tracking';
import { listDeliveries } from '../services/deliveriesService';
import { daysUntil, formatCoordinate, formatDate } from '../utils/formatters';
import { calculateDashboardMetrics } from '../utils/status';

function getLatestTracking(deliveries: Delivery[]): { delivery: Delivery; event?: TrackingEvent } | null {
  const candidates = deliveries
    .flatMap((delivery) =>
      delivery.events
        .filter((event) => event.latitude !== undefined && event.longitude !== undefined)
        .map((event) => ({ delivery, event })),
    )
    .sort((a, b) => new Date(b.event.timestamp).getTime() - new Date(a.event.timestamp).getTime());

  if (candidates.length > 0) {
    return candidates[0];
  }

  const fallback = deliveries.find((delivery) => delivery.iotActive);
  return fallback ? { delivery: fallback } : null;
}

export function DashboardPage() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadDeliveries(): Promise<void> {
      const response = await listDeliveries();
      if (!ignore) {
        setDeliveries(response);
        setIsLoading(false);
      }
    }

    loadDeliveries();

    return () => {
      ignore = true;
    };
  }, []);

  const metrics = useMemo(() => calculateDashboardMetrics(deliveries), [deliveries]);
  const nextDelivery = useMemo(
    () =>
      deliveries
        .filter((delivery) => delivery.status !== 'ENTREGUE')
        .sort((a, b) => new Date(a.estimatedArrival).getTime() - new Date(b.estimatedArrival).getTime())[0],
    [deliveries],
  );
  const latestTracking = useMemo(() => getLatestTracking(deliveries), [deliveries]);
  const highlightedDeliveries = deliveries.slice(0, 3);

  return (
    <div className="page-stack">
      <section className="hero-card">
        <div>
          <span className="eyebrow">Dashboard operacional</span>
          <h2>Rastreio de entregas espaciais em tempo quase real</h2>
          <p>
            Visão consolidada das cargas mockadas da Odysea, alinhada aos conceitos de API REST e telemetria IoT do projeto.
          </p>
        </div>
        <div className="hero-card__status">
          <StatusBadge status={metrics.alerts > 0 ? 'EM_ALERTA' : 'EM_TRANSITO'} />
          <small>{isLoading ? 'Carregando dados...' : `${metrics.total} entregas monitoradas`}</small>
        </div>
      </section>

      <section className="metrics-grid" aria-label="Indicadores principais">
        <MetricCard label="Em andamento" value={metrics.active} helper="Cargas ainda não concluídas" icon="↗" />
        <MetricCard label="Concluídas" value={metrics.completed} helper="Recebidas no destino" icon="✓" />
        <MetricCard label="Em alerta" value={metrics.alerts} helper="Exigem acompanhamento" icon="!" />
        <MetricCard label="IoT ativo" value={metrics.iotActive} helper="Com telemetria simulada" icon="◍" />
      </section>

      <section className="dashboard-grid">
        <article className="panel next-delivery">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Próxima chegada</span>
              <h2>{nextDelivery?.missionName ?? 'Sem entregas ativas'}</h2>
            </div>
            {nextDelivery ? <StatusBadge status={nextDelivery.status} /> : null}
          </div>
          {nextDelivery ? (
            <dl className="info-grid info-grid--compact">
              <div>
                <dt>Destino</dt>
                <dd>{nextDelivery.destino}</dd>
              </div>
              <div>
                <dt>ETA</dt>
                <dd>{formatDate(nextDelivery.estimatedArrival)}</dd>
              </div>
              <div>
                <dt>Dias restantes</dt>
                <dd>{daysUntil(nextDelivery.estimatedArrival)} dias</dd>
              </div>
              <div>
                <dt>Etapa atual</dt>
                <dd>{nextDelivery.currentStep}</dd>
              </div>
            </dl>
          ) : null}
        </article>

        {latestTracking ? (
          <IoTSignalCard delivery={latestTracking.delivery} event={latestTracking.event} />
        ) : (
          <article className="iot-card">
            <h3>Sem telemetria ativa</h3>
            <p>Nenhum evento de tracking com coordenadas foi encontrado nos mocks.</p>
          </article>
        )}
      </section>

      {latestTracking ? (
        <section className="panel coordinate-panel" aria-label="Última coordenada recebida">
          <span className="eyebrow">Última coordenada recebida</span>
          <strong>
            Lat {formatCoordinate(latestTracking.event?.latitude ?? latestTracking.delivery.latitude)} · Long{' '}
            {formatCoordinate(latestTracking.event?.longitude ?? latestTracking.delivery.longitude)}
          </strong>
          <p>{latestTracking.delivery.codigoRastreio} - {latestTracking.delivery.destino}</p>
        </section>
      ) : null}

      <section className="panel">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Entregas em destaque</span>
            <h2>Operações recentes</h2>
          </div>
          <Link className="text-link" to={routes.deliveries}>Ver todas</Link>
        </div>
        <DeliveryList deliveries={highlightedDeliveries} />
      </section>
    </div>
  );
}
