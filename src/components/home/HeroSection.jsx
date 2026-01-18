import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, Calendar, Users, Search } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useBooking } from '../../context/BookingContext';

const heroImages = [
    {
        url: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1920",
        alt: "Beautiful overwater bungalows at sunset"
    },
    {
        url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1920",
        alt: "Luxury beachfront villa with pool"
    },
    {
        url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920",
        alt: "Tropical resort pool at twilight"
    },
    {
        url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920",
        alt: "Paradise beach with palm trees"
    }
];

const HeroSection = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [showBookingWidget, setShowBookingWidget] = useState(true);
    const { bookingData, updateDates, updateGuests } = useBooking();
    const [checkIn, setCheckIn] = useState(bookingData.checkIn);
    const [checkOut, setCheckOut] = useState(bookingData.checkOut);
    const [guestDropdown, setGuestDropdown] = useState(false);
    const [guests, setGuests] = useState(bookingData.guests);

    // Auto-rotate images
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleCheckInChange = (date) => {
        setCheckIn(date);
        if (checkOut && date >= checkOut) {
            const nextDay = new Date(date);
            nextDay.setDate(nextDay.getDate() + 1);
            setCheckOut(nextDay);
        }
        updateDates(date, checkOut);
    };

    const handleCheckOutChange = (date) => {
        setCheckOut(date);
        updateDates(checkIn, date);
    };

    const updateGuestCount = (type, operation) => {
        setGuests(prev => {
            const newGuests = { ...prev };
            // Ensure rooms is initialized if it wasn't present
            if (newGuests.rooms === undefined) newGuests.rooms = 1;

            if (operation === 'add') {
                if (type === 'adults') newGuests[type] = Math.min(prev[type] + 1, 10);
                else if (type === 'children') newGuests[type] = Math.min(prev[type] + 1, 6);
                else if (type === 'rooms') newGuests[type] = Math.min(prev[type] + 1, 5);
            } else {
                // Minimum limits: 1 adult, 0 children, 1 room
                const minLimit = type === 'children' ? 0 : 1;
                newGuests[type] = Math.max(prev[type] - 1, minLimit);
            }
            updateGuests(newGuests.adults, newGuests.children, newGuests.rooms);
            return newGuests;
        });
    };

    const scrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <section className="relative min-h-screen w-full overflow-hidden">
            {/* Background Images */}
            <AnimatePresence>
                <motion.div
                    key={currentImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <img
                        src={heroImages[currentImage].url}
                        alt={heroImages[currentImage].alt}
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 py-20 md:pb-64">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-center max-w-4xl"
                >
                    <motion.p
                        className="text-secondary-400 font-medium tracking-widest mb-4 uppercase"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Welcome to Paradise
                    </motion.p>

                    <h1 className="heading-xl text-white text-shadow-lg mb-6">
                        Azure Paradise Resort
                    </h1>

                    <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
                        Where Luxury Meets Nature
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/rooms"
                            className="btn-secondary inline-block"
                        >
                            Explore Rooms
                        </Link>
                        <button
                            onClick={scrollToContent}
                            className="btn-outline border-white text-white hover:bg-white hover:text-neutral-800 inline-block"
                        >
                            Discover More
                        </button>
                    </div>


                </motion.div>

                {/* Booking Widget */}
                {showBookingWidget && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="w-full mt-12 md:mt-0 md:absolute md:bottom-20 md:left-auto md:right-auto max-w-4xl mx-auto"
                    >
                        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 md:p-6 overflow-visible">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {/* Check-in */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-neutral-600 mb-2">
                                        Check In
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 z-10" />
                                        <DatePicker
                                            selected={checkIn}
                                            onChange={handleCheckInChange}
                                            minDate={new Date()}
                                            placeholderText="Select date"
                                            dateFormat="MMM dd, yyyy"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-800 bg-white"
                                        />
                                    </div>
                                </div>

                                {/* Check-out */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-neutral-600 mb-2">
                                        Check Out
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 z-10" />
                                        <DatePicker
                                            selected={checkOut}
                                            onChange={handleCheckOutChange}
                                            minDate={checkIn ? new Date(checkIn.getTime() + 86400000) : new Date()}
                                            placeholderText="Select date"
                                            dateFormat="MMM dd, yyyy"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-800 bg-white"
                                        />
                                    </div>
                                </div>

                                {/* Guests */}
                                <div className="relative overflow-visible" style={{ zIndex: 50 }}>
                                    <label className="block text-sm font-medium text-neutral-600 mb-2">
                                        Guests
                                    </label>
                                    <button
                                        onClick={() => setGuestDropdown(!guestDropdown)}
                                        className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg bg-white hover:border-primary-400 transition-colors"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Users className="w-5 h-5 text-neutral-400" />
                                            <span className="text-neutral-700 text-sm">
                                                {guests.rooms || 1} {guests.rooms > 1 ? 'Rooms' : 'Room'},{' '}
                                                {guests.adults} {guests.adults > 1 ? 'Adults' : 'Adult'},{' '}
                                                {guests.children} {guests.children === 1 ? 'Child' : 'Children'}
                                            </span>
                                        </div>
                                        <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${guestDropdown ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Guest Dropdown */}
                                    <AnimatePresence>
                                        {guestDropdown && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-100 p-5 z-[100] min-w-[280px]"
                                            >
                                                {/* Rooms */}
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="min-w-[100px]">
                                                        <p className="font-medium text-neutral-800">Rooms</p>
                                                        <p className="text-sm text-neutral-500">Max 3 guests/room</p>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <button
                                                            onClick={() => updateGuestCount('rooms', 'subtract')}
                                                            className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-neutral-600 hover:border-primary-500 hover:text-primary-500 transition-colors font-medium"
                                                        >
                                                            −
                                                        </button>
                                                        <span className="w-6 text-center font-semibold text-neutral-800">{guests.rooms || 1}</span>
                                                        <button
                                                            onClick={() => updateGuestCount('rooms', 'add')}
                                                            className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-neutral-600 hover:border-primary-500 hover:text-primary-500 transition-colors font-medium"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Adults */}
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="min-w-[100px]">
                                                        <p className="font-medium text-neutral-800">Adults</p>
                                                        <p className="text-sm text-neutral-500">Ages 13+</p>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <button
                                                            onClick={() => updateGuestCount('adults', 'subtract')}
                                                            className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-neutral-600 hover:border-primary-500 hover:text-primary-500 transition-colors font-medium"
                                                        >
                                                            −
                                                        </button>
                                                        <span className="w-6 text-center font-semibold text-neutral-800">{guests.adults}</span>
                                                        <button
                                                            onClick={() => updateGuestCount('adults', 'add')}
                                                            className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-neutral-600 hover:border-primary-500 hover:text-primary-500 transition-colors font-medium"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Children */}
                                                <div className="flex items-center justify-between">
                                                    <div className="min-w-[100px]">
                                                        <p className="font-medium text-neutral-800">Children</p>
                                                        <p className="text-sm text-neutral-500">Ages 0-12</p>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <button
                                                            onClick={() => updateGuestCount('children', 'subtract')}
                                                            className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-neutral-600 hover:border-primary-500 hover:text-primary-500 transition-colors font-medium"
                                                        >
                                                            −
                                                        </button>
                                                        <span className="w-6 text-center font-semibold text-neutral-800">{guests.children}</span>
                                                        <button
                                                            onClick={() => updateGuestCount('children', 'add')}
                                                            className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-neutral-600 hover:border-primary-500 hover:text-primary-500 transition-colors font-medium"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => setGuestDropdown(false)}
                                                    className="w-full mt-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700"
                                                >
                                                    Done
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Search Button */}
                                <div className="flex items-end">
                                    <Link
                                        to="/rooms"
                                        className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.02]"
                                    >
                                        <Search className="w-5 h-5" />
                                        <span>Check Availability</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{
                        opacity: { delay: 1.5 },
                        y: { repeat: Infinity, duration: 2 }
                    }}
                    onClick={scrollToContent}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer md:hidden"
                >
                    <ChevronDown className="w-8 h-8 text-white" />
                </motion.div>
            </div>

            {/* Image Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10 hidden md:flex">
                {heroImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentImage
                            ? 'bg-white w-8'
                            : 'bg-white/50 hover:bg-white/75'
                            }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSection;
