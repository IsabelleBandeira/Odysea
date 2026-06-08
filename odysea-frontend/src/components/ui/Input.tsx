import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  helperText?: string;
}

export function Input({ id, label, error, helperText, className = '', ...props }: InputProps) {
  return (
    <div className={`field ${className}`.trim()}>
      <label htmlFor={id}>{label}</label>
      <input id={id} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props} />
      {helperText ? <small className="field__helper">{helperText}</small> : null}
      {error ? (
        <small id={`${id}-error`} className="field__error" role="alert">
          {error}
        </small>
      ) : null}
    </div>
  );
}
