import type { Delivery } from '../../types/delivery';
import { DeliveryCard } from './DeliveryCard';

interface DeliveryListProps {
  deliveries: Delivery[];
}

export function DeliveryList({ deliveries }: DeliveryListProps) {
  return (
    <div className="delivery-list">
      {deliveries.map((delivery) => (
        <DeliveryCard key={delivery.id} delivery={delivery} />
      ))}
    </div>
  );
}
