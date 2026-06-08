import type { Delivery } from '../../types/delivery';
import { formatDate, formatNumber } from '../../utils/formatters';
import { StatusBadge } from '../ui/StatusBadge';

interface DeliverySummaryProps {
  delivery: Delivery;
}

export function DeliverySummary({ delivery }: DeliverySummaryProps) {
  return (
    <section className="panel delivery-summary" aria-labelledby="delivery-summary-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Entrega espacial</span>
          <h2 id="delivery-summary-title">{delivery.missionName}</h2>
        </div>
        <StatusBadge status={delivery.status} />
      </div>

      <dl className="info-grid">
        <div>
          <dt>Código</dt>
          <dd>{delivery.codigoRastreio}</dd>
        </div>
        <div>
          <dt>Origem</dt>
          <dd>{delivery.origem}</dd>
        </div>
        <div>
          <dt>Destino</dt>
          <dd>{delivery.destino}</dd>
        </div>
        <div>
          <dt>Data de envio</dt>
          <dd>{formatDate(delivery.dataEnvio)}</dd>
        </div>
        <div>
          <dt>Chegada estimada</dt>
          <dd>{formatDate(delivery.estimatedArrival)}</dd>
        </div>
        <div>
          <dt>Tipo de carga</dt>
          <dd>{delivery.cargoType}</dd>
        </div>
        <div>
          <dt>Massa</dt>
          <dd>{formatNumber(delivery.massKg)} kg</dd>
        </div>
        <div>
          <dt>Responsável</dt>
          <dd>{delivery.responsible}</dd>
        </div>
      </dl>

      <div className="route-steps" aria-label="Etapas da rota">
        {delivery.route.map((step, index) => (
          <span key={`${step}-${index}`}>{step}</span>
        ))}
      </div>
    </section>
  );
}
