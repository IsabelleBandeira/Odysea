import type { ReactNode } from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  helper?: string;
  icon?: ReactNode;
}

export function MetricCard({ label, value, helper, icon }: MetricCardProps) {
  return (
    <article className="metric-card">
      <div className="metric-card__header">
        <span>{label}</span>
        {icon ? <span className="metric-card__icon" aria-hidden="true">{icon}</span> : null}
      </div>
      <strong>{value}</strong>
      {helper ? <small>{helper}</small> : null}
    </article>
  );
}
