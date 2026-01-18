import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Waves } from 'lucide-react';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Dining', path: '/dining' },
    { name: 'Spa', path: '/spa' },
    { name: 'Activities', path: '/activities' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
];

// Pages that have a dark hero section where white text is visible
const pagesWithHero = ['/', '/rooms', '/dining', '/spa', '/activities', '/gallery', '/contact'];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    // Check if current page has a hero section
    const hasHeroSection = pagesWithHero.includes(location.pathname);

    // Use dark navbar style if scrolled OR if page doesn't have a hero
    const useDarkStyle = isScrolled || !hasHeroSection;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${useDarkStyle || isOpen
                    ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
                    : 'bg-transparent py-5'
                    }`}
            >
                <div className="container-custom">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 group">
                            <Waves
                                className={`w-8 h-8 transition-colors duration-300 ${useDarkStyle || isOpen ? 'text-primary-500' : 'text-white'
                                    }`}
                            />
                            <span
                                className={`font-heading text-xl md:text-2xl font-bold transition-colors duration-300 ${useDarkStyle || isOpen ? 'text-primary-600' : 'text-white'
                                    }`}
                            >
                                Azure Paradise
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`relative font-medium transition-colors duration-300 ${location.pathname === link.path
                                        ? useDarkStyle
                                            ? 'text-primary-500'
                                            : 'text-white'
                                        : useDarkStyle
                                            ? 'text-neutral-600 hover:text-primary-500'
                                            : 'text-white/80 hover:text-white'
                                        }`}
                                >
                                    {link.name}
                                    {location.pathname === link.path && (
                                        <motion.div
                                            layoutId="underline"
                                            className={`absolute -bottom-1 left-0 right-0 h-0.5 ${useDarkStyle ? 'bg-primary-500' : 'bg-white'
                                                }`}
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Book Now Button - Desktop */}
                        <div className="hidden lg:block">
                            <Link
                                to="/rooms"
                                className="bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white font-semibold py-2.5 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Book Now
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMenu}
                            className={`lg:hidden p-2 rounded-lg transition-colors ${useDarkStyle || isOpen ? 'text-neutral-700' : 'text-white'
                                }`}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            < AnimatePresence >
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleMenu}
                            className="fixed inset-0 bg-black/50 lg:hidden z-[100]"
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="fixed right-0 top-0 h-full w-3/4 max-w-sm z-[105] lg:hidden"
                        >
                            <div className="absolute inset-0 bg-white" />
                            <div className="relative z-10 p-6 h-full overflow-y-auto">
                                {/* Close Button */}
                                <div className="flex justify-end mb-8">
                                    <button
                                        onClick={toggleMenu}
                                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <X className="w-6 h-6 text-neutral-700" />
                                    </button>
                                </div>

                                {/* Mobile Nav Links */}
                                <div className="flex flex-col gap-4">
                                    {navLinks.map((link, index) => (
                                        <motion.div
                                            key={link.path}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Link
                                                to={link.path}
                                                className={`block py-3 px-4 rounded-lg font-medium transition-colors ${location.pathname === link.path
                                                    ? 'bg-primary-50 text-primary-600'
                                                    : 'text-neutral-600 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {link.name}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Mobile Book Now Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="mt-8"
                                >
                                    <Link
                                        to="/rooms"
                                        className="block text-center bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-semibold py-3 px-6 rounded-lg"
                                    >
                                        Book Now
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )
                }
            </AnimatePresence >
        </>
    );
};

export default Navbar;
