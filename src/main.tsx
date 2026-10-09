import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './theme.css';

// La version Test n'est plus une PWA. Nettoyer les anciens service workers
// qui peuvent servir un vieux HTML sans CSS depuis leur cache.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    const regs = await navigator.serviceWorker.getRegistrations();
    const stale = regs.filter(reg => reg.scope.includes('/Test/'));
    if (!stale.length) return;
    await Promise.all(stale.map(reg => reg.unregister()));
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.filter(key => /workbox|precache|Test/i.test(key)).map(key => caches.delete(key)));
    }
    if (navigator.serviceWorker.controller && !sessionStorage.getItem('dofus-test-sw-cleared')) {
      sessionStorage.setItem('dofus-test-sw-cleared', '1');
      location.reload();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>
);
