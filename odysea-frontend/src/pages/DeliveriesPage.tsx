import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import { DeliveryList } from '../components/deliveries/DeliveryList';
import { EmptyState } from '../components/ui/EmptyState';
import type { Delivery, DeliveryStatus } from '../types/delivery';
import { listDeliveries } from '../services/deliveriesService';
import { STATUS_META } from '../utils/status';

const allStatuses = Object.keys(STATUS_META) as DeliveryStatus[];

export function DeliveriesPage() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<DeliveryStatus | 'TODOS'>('TODOS');
  const [destinationFilter, setDestinationFilter] = useState<'TODOS' | 'Lua' | 'Marte'>('TODOS');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function load(): Promise<void> {
      const response = await listDeliveries();
      if (!ignore) {
        setDeliveries(response);
        setIsLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, []);

  const filteredDeliveries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return deliveries.filter((delivery) => {
      const matchesQuery = [delivery.codigoRastreio, delivery.missionName, delivery.destino, delivery.cargoType, delivery.agency]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery);
      const matchesStatus = statusFilter === 'TODOS' || delivery.status === statusFilter;
      const matchesDestination = destinationFilter === 'TODOS' || delivery.destino === destinationFilter;

      return matchesQuery && matchesStatus && matchesDestination;
    });
  }, [deliveries, destinationFilter, query, statusFilter]);

  function handleStatusChange(event: ChangeEvent<HTMLSelectElement>): void {
    setStatusFilter(event.target.value as DeliveryStatus | 'TODOS');
  }

  function handleDestinationChange(event: ChangeEvent<HTMLSelectElement>): void {
    setDestinationFilter(event.target.value as 'TODOS' | 'Lua' | 'Marte');
  }

  return (
    <div className="page-stack">
      <section className="page-header-card">
        <div>
          <span className="eyebrow">Catálogo de entregas</span>
          <h2>Entregas espaciais mockadas</h2>
          <p>Consulte cargas, missões, destinos, prioridades e status das operações para Lua e Marte.</p>
        </div>
      </section>

      <section className="filters-panel" aria-label="Filtros de entregas">
        <label>
          Buscar
          <input
            type="search"
            placeholder="Código, missão, destino ou carga"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <label>
          Status
          <select value={statusFilter} onChange={handleStatusChange}>
            <option value="TODOS">Todos</option>
            {allStatuses.map((status) => (
              <option key={status} value={status}>{STATUS_META[status].label}</option>
            ))}
          </select>
        </label>

        <label>
          Destino
          <select value={destinationFilter} onChange={handleDestinationChange}>
            <option value="TODOS">Todos</option>
            <option value="Lua">Lua</option>
            <option value="Marte">Marte</option>
          </select>
        </label>
      </section>

      {isLoading ? (
        <EmptyState title="Carregando entregas" description="A Odysea está buscando dados mockados ou API local." />
      ) : filteredDeliveries.length > 0 ? (
        <DeliveryList deliveries={filteredDeliveries} />
      ) : (
        <EmptyState title="Nenhuma entrega encontrada" description="Ajuste os filtros para visualizar outras operações espaciais." />
      )}
    </div>
  );
}
