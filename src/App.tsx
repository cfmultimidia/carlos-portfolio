import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PromotoolCase from './pages/PromotoolCase';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/promotool" element={<PromotoolCase />} />
      </Routes>
    </BrowserRouter>
  );
}
