import type { Delivery } from '../../types/delivery';
import { formatDateTime } from '../../utils/formatters';

interface TrackingMapMockProps {
  delivery: Delivery;
}

export function TrackingMapMock({ delivery }: TrackingMapMockProps) {
  const x = Math.min(92, Math.max(8, delivery.destino === 'Lua' ? 62 : 78));
  const y = Math.min(82, Math.max(14, 100 - delivery.progress));

  return (
    <section className="panel map-panel" aria-labelledby="map-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Rota simulada</span>
          <h2 id="map-title">Tracking orbital</h2>
        </div>
      </div>

      <div className="map-mock" role="img" aria-label={`Mapa visual simulado da rota para ${delivery.destino}`}>
        <span className="map-mock__earth">Terra</span>
        <span className="map-mock__destination">{delivery.destino}</span>
        <span className="map-mock__route" />
        <span className="map-mock__vehicle" style={{ left: `${x}%`, top: `${y}%` }} aria-hidden="true" />
      </div>

      <dl className="info-grid info-grid--compact">
        <div>
          <dt>Coordenadas atuais</dt>
          <dd>
            {delivery.latitude !== undefined && delivery.longitude !== undefined
              ? `${delivery.latitude.toFixed(2)}, ${delivery.longitude.toFixed(2)}`
              : 'Sem coordenadas disponíveis'}
          </dd>
        </div>
        <div>
          <dt>Última atualização</dt>
          <dd>{formatDateTime(delivery.lastUpdate)}</dd>
        </div>
        <div>
          <dt>Etapa atual</dt>
          <dd>{delivery.currentStep}</dd>
        </div>
      </dl>
    </section>
  );
}
