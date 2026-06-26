// src/main.jsx
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { msalInstance } from './config/msalConfig';
import { MsalProvider } from '@azure/msal-react';

async function startApp() {
  try {
    await msalInstance.initialize();
  } catch (error) {
    console.error("MSAL initialization failed", error);
  }

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </StrictMode>,
  );
}

startApp();
