# Azure Resource Governance & Reclamation Portal - Frontend

This is the React frontend application for the Azure Resource Governance & Reclamation Portal (ARGRP). It is powered by Vite, Material UI (MUI), and Chart.js.

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Setup environment variables:
   Create a `.env` file in this directory and specify the API endpoint:
   ```env
   VITE_API_URL=http://localhost:5005/api
   ```

3. Run development mode:
   ```bash
   npm run dev
   ```

4. Build production bundle:
   ```bash
   npm run build
   ```

## 📂 Frontend Structure

*   `src/theme.js` - Contains the custom Material UI color palette, typography definitions, and styling overrides modeled after the official Microsoft Azure portal.
*   `src/config/msalConfig.js` - Single sign-on client configuration for Azure Active Directory (AAD).
*   `src/services/` - Modules representing clean API connectors (e.g. `api.js`, `dashboardService.js`, `reclamationService.js`).
*   `src/context/AuthContext.jsx` - Manage user session state and handle mock/MSAL auth workflows.

For details on the backend API integrations, schema seeding, and the full project architecture, please refer to the main [Root README.md](../README.md).
