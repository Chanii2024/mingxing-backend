import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import TShirtShop from './pages/TShirtShop';
import MugShop from './pages/MugShop';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundAndCancellation from './pages/RefundAndCancellation';
import Terms from './pages/Terms';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/tshirts" element={<TShirtShop />} />
        <Route path="/mugs" element={<MugShop />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-cancellation" element={<RefundAndCancellation />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </Router>
  );
}

export default App;
