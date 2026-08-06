import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/auth';
import AuthGuard from './components/AuthGuard';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PortfolioPage from './pages/PortfolioPage';
import CasePage from './pages/CasePage';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          {/* Public portfolio routes — /p/:username and /p/:username/:slug */}
          <Route path="/p/:username" element={<PortfolioPage />} />
          <Route path="/p/:username/:slug" element={<CasePage />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
          <Route path="/admin" element={<AuthGuard><AdminPanel /></AuthGuard>} />

          {/* Legacy: Carlos's direct portfolio at root (redirect handled by portfolio page) */}
          <Route path="/:slug" element={<CasePage legacyMode />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
