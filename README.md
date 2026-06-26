# Azure Resource Governance & Reclamation Portal (ARGRP)

An enterprise-grade, centralized Azure governance dashboard designed to manage, audit, and optimize cloud resource usage, subscription ownership, and cost reclamation workflows, integrated with an AI Copilot for intelligent cloud analytics.

---

## 🚀 Key Features

*   **Azure-Style Telemetry Dashboard**: Modern, responsive dashboard containing real-time resource indicators, status distributions, and active candidate reclamation counts.
*   **Asset Management**: Fully-interactive directories for **Subscriptions**, **Resource Groups**, **Resources**, and **Employees** with full server-side pagination, search, and details.
*   **Reclamation Workflows**: Streamlined interface for managing resource lifecycle states (`Active`, `Idle`, `Candidate`, `Approved`, `Reclaimed`) with manual Approve/Reject overrides.
*   **AI Copilot**: High-fidelity chat interface utilizing hybrid intelligence (structured local fallbacks and OpenAI API endpoints) to answer questions, locate idle resources, and recommend optimizations.
*   **Enterprise Authentication**: Configured with MSAL (Microsoft Authentication Library) React hooks for seamless single sign-on (SSO) integrations.

---

## 🛠 Technology Stack

### Frontend
*   **React 18** with **Vite** (Fast HMR bundler)
*   **Material UI (MUI) v5** (Enterprise component system)
*   **Chart.js** & **react-chartjs-2** (Visual telemetry)
*   **Axios** (API requests)

### Backend
*   **Node.js** & **Express.js** (REST APIs)
*   **Sequelize ORM**
*   **SQLite** (Local database for rapid development)

---

## 📂 Project Structure

```text
Azure-governance-portal/
├── server.js                      # Express backend entry point
├── app.js                         # Database config and routing
├── seed.js                        # Database seed script (mock data)
├── package.json                   # Backend dependencies and scripts
├── database.sqlite                # Local development SQLite db (git-ignored)
├── .env                           # Backend environment configs (git-ignored)
├── frontend/                      # React application root
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── .env                       # Frontend environment configs (git-ignored)
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── theme.js               # Azure-inspired design system
│       ├── assets/                # Images and static design files
│       ├── components/            # Reusable page layouts and controls
│       │   ├── common/            # StatCard, StatusChip
│       │   └── layout/            # Sidebar, Topbar, AppLayout
│       ├── context/               # AuthContext
│       ├── hooks/                 # useAuth, useDebounce
│       ├── services/              # API layers (employeeService, resourceService, etc.)
│       ├── pages/                 # Full feature views (Dashboard, AI Copilot, etc.)
│       └── utils/                 # Constants, formatters
```

---

## ⚙️ Getting Started

### Prerequisites
*   **Node.js** (v16.x or higher)
*   **npm** (v8.x or higher)

---

### Backend Setup

1. Navigate to the root directory:
   ```bash
   cd Azure-governance-portal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables. Create a `.env` file in the root directory:
   ```env
   PORT=5005
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Seed the database with mock telemetry and resource data:
   ```bash
   node seed.js
   ```

5. Start the backend server:
   ```bash
   node server.js
   ```
   *The API will run at `http://localhost:5005`*

---

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure frontend environment. Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:5005/api
   ```

4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The portal will open locally at `http://localhost:5173`*

---

## 🔑 Authentication
The application supports mock credential login (`admin@azure.com` / `admin123`) for testing and is fully wired up with `@azure/msal-react` for OAuth single sign-on. Production integrations can be configured within `frontend/src/config/msalConfig.js` using your Azure Active Directory (AAD) Client ID and Tenant ID.

## 🤖 AI Copilot Functions
You can query the Copilot with prompts like:
*   `Show idle resources`
*   `List all VMs`
*   `Recommend reclamation candidates`
*   `Generate governance report`
