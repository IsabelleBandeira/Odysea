import type { TrackingEvent } from '../../types/tracking';
import { formatDateTime } from '../../utils/formatters';
import { StatusBadge } from '../ui/StatusBadge';

interface TrackingTimelineProps {
  events: TrackingEvent[];
}

export function TrackingTimeline({ events }: TrackingTimelineProps) {
  const sortedEvents = [...events].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <section className="panel" aria-labelledby="tracking-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Histórico</span>
          <h2 id="tracking-title">Linha do tempo do rastreio</h2>
        </div>
      </div>

      <ol className="timeline">
        {sortedEvents.map((event) => (
          <li key={event.id}>
            <div className="timeline__dot" aria-hidden="true" />
            <div className="timeline__content">
              <div className="timeline__header">
                <h3>{event.title}</h3>
                <StatusBadge status={event.status} />
              </div>
              <p>{event.description}</p>
              <small>
                {formatDateTime(event.timestamp)} · Fonte: {event.source}
                {event.latitude !== undefined && event.longitude !== undefined
                  ? ` · Lat ${event.latitude.toFixed(2)} / Long ${event.longitude.toFixed(2)}`
                  : ''}
              </small>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
