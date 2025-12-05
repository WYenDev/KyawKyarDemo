import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BuyCars from './pages/BuyCars';
import SellCars from './pages/SellCars';
import About from './pages/About';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import CarDetails from './pages/CarDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buyCars" element={<BuyCars />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/sellCars" element={<SellCars />} />
          <Route path="/about" element={<About />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
