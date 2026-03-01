// ============================================
// NYANCHESS - MAIN ENTRY
// Fork dari Lichess dengan tema Kucing Pink
// ============================================

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from '@/components/ui/sonner';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster 
      position="top-right"
      toastOptions={{
        style: {
          background: 'rgba(255, 255, 255, 0.95)',
          border: '2px solid #ff6b9d',
          color: '#330011',
          borderRadius: '12px',
        },
      }}
    />
  </StrictMode>,
);
