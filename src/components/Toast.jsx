import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Toast() {
  const { toastMessage } = useShop();

  if (!toastMessage) return null;

  const isError = toastMessage.type === 'error';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        padding: '0.8rem 1.4rem',
        borderRadius: '12px',
        background: isError ? '#ef4444' : 'var(--purple-950)',
        color: '#fff',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        fontSize: '0.9rem',
        fontWeight: 600,
        animation: 'fadeIn 0.25s ease'
      }}
    >
      {isError ? <AlertCircle size={18} /> : <CheckCircle2 size={18} style={{ color: '#FFD700' }} />}
      <span>{toastMessage.message}</span>
    </div>
  );
}
