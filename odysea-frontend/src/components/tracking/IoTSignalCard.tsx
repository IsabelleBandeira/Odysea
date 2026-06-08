import type { Delivery } from '../../types/delivery';
import type { TrackingEvent } from '../../types/tracking';
import { formatDateTime } from '../../utils/formatters';
import { StatusBadge } from '../ui/StatusBadge';

interface IoTSignalCardProps {
  delivery: Delivery;
  event?: TrackingEvent;
  compact?: boolean;
}

export function IoTSignalCard({ delivery, event, compact = false }: IoTSignalCardProps) {
  const latitude = event?.latitude ?? delivery.latitude;
  const longitude = event?.longitude ?? delivery.longitude;
  const status = event?.status ?? delivery.status;

  return (
    <article className={compact ? 'iot-card iot-card--compact' : 'iot-card'}>
      <div className="iot-card__header">
        <div>
          <span className="eyebrow">IoT Tracking</span>
          <h3>Pacote de telemetria</h3>
        </div>
        <span className={delivery.iotActive ? 'signal-dot active' : 'signal-dot'} aria-label={delivery.iotActive ? 'Sinal ativo' : 'Sinal inativo'} />
      </div>

      <dl className="info-grid info-grid--compact">
        <div>
          <dt>Entrega ID</dt>
          <dd>{delivery.id}</dd>
        </div>
        <div>
          <dt>Latitude</dt>
          <dd>{latitude !== undefined ? latitude.toFixed(4) : 'N/A'}</dd>
        </div>
        <div>
          <dt>Longitude</dt>
          <dd>{longitude !== undefined ? longitude.toFixed(4) : 'N/A'}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd><StatusBadge status={status} /></dd>
        </div>
      </dl>

      <p>{event?.description ?? delivery.observations}</p>
      <small>{formatDateTime(event?.timestamp ?? delivery.lastUpdate)}</small>
    </article>
  );
}
