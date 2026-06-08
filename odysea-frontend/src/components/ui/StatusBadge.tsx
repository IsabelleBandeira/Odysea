import type { DeliveryStatus } from '../../types/delivery';
import { getStatusLabel, getStatusTone } from '../../utils/status';

interface StatusBadgeProps {
  status: DeliveryStatus | string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const tone = getStatusTone(status);

  return <span className={`status-badge status-badge--${tone}`}>{getStatusLabel(status)}</span>;
}
