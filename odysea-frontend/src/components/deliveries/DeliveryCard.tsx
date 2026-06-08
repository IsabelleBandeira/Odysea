import { Link } from 'react-router-dom';
import { routes } from '../../app/routes';
import type { Delivery } from '../../types/delivery';
import { formatDate, formatRelativeDate } from '../../utils/formatters';
import { getProgressLabel } from '../../utils/status';
import { StatusBadge } from '../ui/StatusBadge';

interface DeliveryCardProps {
  delivery: Delivery;
}

export function DeliveryCard({ delivery }: DeliveryCardProps) {
  return (
    <article className="delivery-card">
      <div className="delivery-card__header">
        <div>
          <small>{delivery.codigoRastreio}</small>
          <h3>{delivery.missionName}</h3>
        </div>
        <StatusBadge status={delivery.status} />
      </div>

      <dl className="delivery-card__grid">
        <div>
          <dt>Destino</dt>
          <dd>{delivery.destino}</dd>
        </div>
        <div>
          <dt>Carga</dt>
          <dd>{delivery.cargoType}</dd>
        </div>
        <div>
          <dt>Prioridade</dt>
          <dd>{delivery.priority}</dd>
        </div>
        <div>
          <dt>Chegada estimada</dt>
          <dd>{formatDate(delivery.estimatedArrival)}</dd>
        </div>
      </dl>

      <div className="progress" aria-label={`Progresso ${delivery.progress}%`}>
        <div className="progress__bar">
          <span style={{ width: `${delivery.progress}%` }} />
        </div>
        <small>{getProgressLabel(delivery.progress)} · {formatRelativeDate(delivery.lastUpdate)}</small>
      </div>

      <Link className="text-link" to={routes.deliveryDetails(delivery.id)}>
        Ver detalhes
      </Link>
    </article>
  );
}
