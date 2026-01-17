import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Grid3X3, List, ChevronDown, Calendar, Users, X } from 'lucide-react';
import RoomCard from '../components/rooms/RoomCard';
import RoomFilter from '../components/rooms/RoomFilter';
import AnimatedSection from '../components/ui/AnimatedSection';
import { roomsData } from '../data/roomsData';
import { useBooking } from '../context/BookingContext';

const Rooms = () => {
    const { bookingData } = useBooking();
    const totalGuests = bookingData.guests.adults + bookingData.guests.children;
    const hasBookingFilters = totalGuests > 1 || bookingData.checkIn || bookingData.checkOut;

    const [filters, setFilters] = useState({
        priceRange: [0, 2000],
        roomTypes: [],
        viewTypes: [],
        minGuests: totalGuests || 1,
    });

    // Update minGuests filter when booking context changes
    useEffect(() => {
        if (totalGuests > 1) {
            setFilters(prev => ({ ...prev, minGuests: totalGuests }));
        }
    }, [totalGuests]);
    const [sortBy, setSortBy] = useState('recommended');
    const [viewMode, setViewMode] = useState('grid');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Filter and sort rooms
    const filteredRooms = useMemo(() => {
        let result = roomsData.filter(room => {
            // Price filter
            if (room.price > filters.priceRange[1]) return false;

            // Room type filter
            if (filters.roomTypes.length > 0 && !filters.roomTypes.includes(room.category)) {
                return false;
            }

            // View type filter
            if (filters.viewTypes.length > 0 && !filters.viewTypes.includes(room.view)) {
                return false;
            }

            // Guests filter
            if (room.maxGuests < filters.minGuests) return false;

            return true;
        });

        // Sort
        switch (sortBy) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            default:
                // recommended - keep original order
                break;
        }

        return result;
    }, [filters, sortBy]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleReset = () => {
        setFilters({
            priceRange: [0, 2000],
            roomTypes: [],
            viewTypes: [],
            minGuests: 1,
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Banner */}
            <section className="relative h-72 md:h-96 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920"
                    alt="Luxury resort rooms"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
                <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="heading-xl text-white mb-4"
                        >
                            Rooms & Suites
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-white/90 text-lg max-w-2xl"
                        >
                            Choose from our collection of elegantly designed accommodations,
                            each offering stunning views and world-class amenities.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Booking Summary Banner */}
            {hasBookingFilters && (
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4">
                    <div className="container-custom">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex flex-wrap items-center gap-6">
                                {bookingData.checkIn && bookingData.checkOut && (
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5" />
                                        <span>
                                            {bookingData.checkIn.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {bookingData.checkOut.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5" />
                                    <span>
                                        {bookingData.guests.rooms || 1} {(bookingData.guests.rooms || 1) > 1 ? 'Rooms' : 'Room'}, {bookingData.guests.adults} {bookingData.guests.adults > 1 ? 'Adults' : 'Adult'}
                                        {bookingData.guests.children > 0 && `, ${bookingData.guests.children} ${bookingData.guests.children === 1 ? 'Child' : 'Children'}`}
                                    </span>
                                </div>
                                <span className="text-white/80 text-sm">
                                    Showing rooms for {totalGuests}+ guests
                                </span>
                            </div>
                            <button
                                onClick={() => setFilters(prev => ({ ...prev, minGuests: 1 }))}
                                className="flex items-center gap-1 text-white/80 hover:text-white text-sm transition-colors"
                            >
                                <X className="w-4 h-4" />
                                Clear filter
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filter Sidebar */}
                        <div className="lg:w-72 flex-shrink-0">
                            <RoomFilter
                                filters={filters}
                                onFilterChange={handleFilterChange}
                                onReset={handleReset}
                                isOpen={isFilterOpen}
                                onToggle={() => setIsFilterOpen(!isFilterOpen)}
                            />
                        </div>

                        {/* Rooms Grid */}
                        <div className="flex-grow">
                            {/* Toolbar */}
                            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    {/* Mobile Filter Button */}
                                    <button
                                        onClick={() => setIsFilterOpen(true)}
                                        className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                                    >
                                        <SlidersHorizontal className="w-4 h-4" />
                                        Filters
                                    </button>

                                    {/* Results Count */}
                                    <p className="text-neutral-600">
                                        <span className="font-semibold text-neutral-800">{filteredRooms.length}</span> rooms found
                                    </p>

                                    <div className="flex items-center gap-4">
                                        {/* Sort Dropdown */}
                                        <div className="relative">
                                            <select
                                                value={sortBy}
                                                onChange={(e) => setSortBy(e.target.value)}
                                                className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            >
                                                <option value="recommended">Recommended</option>
                                                <option value="price-low">Price: Low to High</option>
                                                <option value="price-high">Price: High to Low</option>
                                                <option value="rating">Highest Rated</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                                        </div>

                                        {/* View Mode Toggle */}
                                        <div className="hidden md:flex border border-gray-200 rounded-lg overflow-hidden">
                                            <button
                                                onClick={() => setViewMode('grid')}
                                                className={`p-2 ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'bg-white text-neutral-600 hover:bg-gray-50'}`}
                                            >
                                                <Grid3X3 className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => setViewMode('list')}
                                                className={`p-2 ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'bg-white text-neutral-600 hover:bg-gray-50'}`}
                                            >
                                                <List className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Rooms Grid */}
                            {filteredRooms.length > 0 ? (
                                <div className={`grid gap-6 ${viewMode === 'grid'
                                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                                    : 'grid-cols-1'
                                    }`}>
                                    {filteredRooms.map((room, index) => (
                                        <AnimatedSection key={room.id} delay={index * 0.05}>
                                            <RoomCard room={room} />
                                        </AnimatedSection>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16 bg-white rounded-xl">
                                    <p className="text-neutral-600 mb-4">No rooms match your criteria</p>
                                    <button
                                        onClick={handleReset}
                                        className="text-primary-600 font-medium hover:underline"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Rooms;
