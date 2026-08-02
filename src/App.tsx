import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CasePage from './pages/CasePage';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPanel />} />
        {/* Dynamic catch-all for any project slug */}
        <Route path="/:slug" element={<CasePage />} />
      </Routes>
    </BrowserRouter>
  );
}
