import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Rooms from './pages/Rooms';
import RoomDetails from './pages/RoomDetails';
import Dining from './pages/Dining';
import Spa from './pages/Spa';
import Activities from './pages/Activities';
import Packages from './pages/Packages';
import CustomPackage from './pages/CustomPackage';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
    return (
        <ErrorBoundary>
            <BookingProvider>
                <Router>
                    <ScrollToTop />
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/rooms" element={<Rooms />} />
                            <Route path="/rooms/:id" element={<RoomDetails />} />
                            <Route path="/dining" element={<Dining />} />
                            <Route path="/spa" element={<Spa />} />
                            <Route path="/activities" element={<Activities />} />
                            <Route path="/packages" element={<Packages />} />
                            <Route path="/custom-package" element={<CustomPackage />} />
                            <Route path="/gallery" element={<Gallery />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Layout>
                </Router>
            </BookingProvider>
        </ErrorBoundary>
    );
}

export default App;

