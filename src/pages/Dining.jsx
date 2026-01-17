import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Users, DollarSign, ChevronDown } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import RestaurantReservationModal from '../components/dining/RestaurantReservationModal';
import { restaurantsData } from '../data/restaurantsData';

const Dining = () => {
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [expandedMenu, setExpandedMenu] = useState(null);
    const [reservationModalOpen, setReservationModalOpen] = useState(false);
    const [selectedForReservation, setSelectedForReservation] = useState(null);

    const handleReserveTable = (restaurant) => {
        setSelectedForReservation(restaurant);
        setReservationModalOpen(true);
    };

    const handleCloseModal = () => {
        setReservationModalOpen(false);
        setSelectedForReservation(null);
    };

    return (
        <>
            <RestaurantReservationModal
                restaurant={selectedForReservation}
                isOpen={reservationModalOpen}
                onClose={handleCloseModal}
            />
            <div className="min-h-screen bg-gray-50">
                {/* Hero Banner */}
                <section className="relative h-72 md:h-96 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920"
                        alt="Fine dining experience"
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
                                Dining & Cuisine
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-white/90 text-lg max-w-2xl"
                            >
                                Experience culinary excellence at our world-class restaurants,
                                from fresh seafood to international cuisine.
                            </motion.p>
                        </div>
                    </div>
                </section>

                {/* Restaurants Section */}
                <section className="section-padding">
                    <div className="container-custom">
                        <AnimatedSection className="text-center mb-12">
                            <p className="text-secondary-500 font-medium tracking-wider mb-3 uppercase">
                                Culinary Excellence
                            </p>
                            <h2 className="heading-lg text-neutral-800 mb-4">
                                Our Restaurants
                            </h2>
                            <p className="text-neutral-600 max-w-2xl mx-auto">
                                Five unique dining venues offering everything from casual beachside
                                fare to elegant fine dining experiences.
                            </p>
                        </AnimatedSection>

                        <div className="space-y-8">
                            {restaurantsData.map((restaurant, index) => (
                                <AnimatedSection key={restaurant.id} delay={index * 0.1}>
                                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                        <div className="grid grid-cols-1 lg:grid-cols-2">
                                            {/* Image */}
                                            <div className="relative h-64 lg:h-auto">
                                                <img
                                                    src={restaurant.image}
                                                    alt={restaurant.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute top-4 left-4 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                                                    {restaurant.cuisine}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6 lg:p-8">
                                                <h3 className="font-heading text-2xl font-bold text-neutral-800 mb-3">
                                                    {restaurant.name}
                                                </h3>
                                                <p className="text-neutral-600 mb-6">
                                                    {restaurant.description}
                                                </p>

                                                {/* Info */}
                                                <div className="grid grid-cols-2 gap-4 mb-6">
                                                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                                                        <Clock className="w-4 h-4 text-primary-500" />
                                                        <span>{restaurant.hours}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                                                        <Users className="w-4 h-4 text-primary-500" />
                                                        <span>{restaurant.dressCode}</span>
                                                    </div>
                                                </div>

                                                {/* Features */}
                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {restaurant.features.map((feature, i) => (
                                                        <span
                                                            key={i}
                                                            className="text-xs bg-primary-50 text-primary-600 px-3 py-1 rounded-full"
                                                        >
                                                            {feature}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Menu Toggle & Reserve Button */}
                                                <div className="flex flex-wrap items-center gap-4">
                                                    <button
                                                        onClick={() => setExpandedMenu(expandedMenu === restaurant.id ? null : restaurant.id)}
                                                        className="flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700"
                                                    >
                                                        View Menu
                                                        <ChevronDown className={`w-4 h-4 transition-transform ${expandedMenu === restaurant.id ? 'rotate-180' : ''}`} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleReserveTable(restaurant)}
                                                        className="btn-primary py-2 px-4 text-sm"
                                                    >
                                                        Reserve Table
                                                    </button>
                                                </div>

                                                {/* Expanded Menu */}
                                                {expandedMenu === restaurant.id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        className="mt-6 pt-6 border-t border-gray-100"
                                                    >
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                            {restaurant.menu.map((category, i) => (
                                                                <div key={i}>
                                                                    <h4 className="font-semibold text-neutral-800 mb-3">
                                                                        {category.category}
                                                                    </h4>
                                                                    <ul className="space-y-2">
                                                                        {category.items.map((item, j) => (
                                                                            <li key={j} className="text-sm text-neutral-600">
                                                                                • {item}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Experience Packages Banner */}
                <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-500">
                    <div className="container-custom">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="text-center md:text-left">
                                <h2 className="heading-md text-white mb-2">Looking for Complete Experiences?</h2>
                                <p className="text-white/80">Discover curated packages combining dining, spa & activities</p>
                            </div>
                            <Link
                                to="/packages"
                                className="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                View Experience Packages →
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Dining;


