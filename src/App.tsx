import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PromotoolCase from './pages/PromotoolCase';
import PremmiaCase from './pages/PremmiaCase';
import PasswordGate from './components/PasswordGate';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/promotool" element={<PromotoolCase />} />
        <Route
          path="/premmia"
          element={
            <PasswordGate>
              <PremmiaCase />
            </PasswordGate>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
