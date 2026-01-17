import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Users, MapPin } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import ActivityBookingModal from '../components/activities/ActivityBookingModal';
import { activitiesData, activityCategories, getActivitiesByCategory } from '../data/activitiesData';

const Activities = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [bookingModalOpen, setBookingModalOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);

    const filteredActivities = getActivitiesByCategory(activeCategory);

    const handleBookActivity = (activity) => {
        setSelectedActivity(activity);
        setBookingModalOpen(true);
    };

    const handleCloseModal = () => {
        setBookingModalOpen(false);
        setSelectedActivity(null);
    };

    return (
        <>
            <ActivityBookingModal
                activity={selectedActivity}
                isOpen={bookingModalOpen}
                onClose={handleCloseModal}
            />
            <div className="min-h-screen bg-gray-50">
                {/* Hero Banner */}
                <section className="relative h-72 md:h-96 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920"
                        alt="Water activities"
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
                                Activities & Experiences
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-white/90 text-lg max-w-2xl"
                            >
                                Discover a world of adventures, from ocean explorations to wellness journeys.
                            </motion.p>
                        </div>
                    </div>
                </section>

                {/* Category Tabs */}
                <section className="bg-white border-b border-gray-100 sticky top-16 z-20">
                    <div className="container-custom">
                        <div className="flex overflow-x-auto gap-2 py-4 -mx-4 px-4 md:mx-0 md:px-0">
                            {activityCategories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`whitespace-nowrap px-6 py-2.5 rounded-full font-medium transition-all ${activeCategory === category.id
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-gray-100 text-neutral-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Activities Grid */}
                <section className="section-padding">
                    <div className="container-custom">
                        <AnimatedSection className="text-center mb-12">
                            <h2 className="heading-lg text-neutral-800 mb-4">
                                {activeCategory === 'all' ? 'All Activities' : activityCategories.find(c => c.id === activeCategory)?.name}
                            </h2>
                            <p className="text-neutral-600 max-w-2xl mx-auto">
                                {filteredActivities.length} experiences available for you to explore
                            </p>
                        </AnimatedSection>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredActivities.map((activity, index) => (
                                <AnimatedSection key={activity.id} delay={index * 0.05}>
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col"
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={activity.image}
                                                alt={activity.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute top-4 left-4 bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full capitalize">
                                                {activity.category}
                                            </div>
                                            <div className="absolute top-4 right-4 bg-white/95 text-primary-600 font-bold px-3 py-1 rounded-full text-sm">
                                                ${activity.price}
                                            </div>
                                        </div>

                                        <div className="p-6 flex-grow flex flex-col">
                                            <h3 className="font-heading text-xl font-semibold text-neutral-800 mb-2">
                                                {activity.name}
                                            </h3>
                                            <p className="text-neutral-600 text-sm mb-4 flex-grow">
                                                {activity.description}
                                            </p>

                                            {/* Info Row */}
                                            <div className="flex flex-wrap gap-3 mb-4 text-sm text-neutral-500">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {activity.duration}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Users className="w-4 h-4" />
                                                    {activity.difficulty}
                                                </span>
                                            </div>

                                            {/* Includes */}
                                            <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-gray-100">
                                                {activity.includes.slice(0, 3).map((item, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-xs bg-gray-100 text-neutral-600 px-2 py-1 rounded"
                                                    >
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Schedule & Button */}
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-neutral-500">
                                                    <MapPin className="w-3 h-3 inline mr-1" />
                                                    {activity.schedule}
                                                </span>
                                                <button
                                                    onClick={() => handleBookActivity(activity)}
                                                    className="text-sm font-medium text-primary-600 hover:text-primary-700"
                                                >
                                                    Book Now →
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Private Experience CTA */}
                <section className="py-16 bg-primary-500">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <AnimatedSection>
                                <h2 className="heading-md text-white mb-4">
                                    Create Your Own Adventure
                                </h2>
                                <p className="text-white/80 mb-6">
                                    Want something truly unique? Our concierge team can create bespoke
                                    experiences tailored to your interests, from private island picnics
                                    to underwater dining.
                                </p>
                                <Link
                                    to="/contact?subject=concierge"
                                    className="inline-block bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    Contact Concierge
                                </Link>
                            </AnimatedSection>
                            <AnimatedSection delay={0.2} direction="right">
                                <img
                                    src="https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600"
                                    alt="Private experience"
                                    className="rounded-2xl shadow-xl"
                                />
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* Experience Packages Banner */}
                <section className="py-16 bg-gradient-to-r from-secondary-600 to-secondary-500">
                    <div className="container-custom">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="text-center md:text-left">
                                <h2 className="heading-md text-white mb-2">Looking for Complete Experiences?</h2>
                                <p className="text-white/80">Discover curated packages combining dining, spa & activities</p>
                            </div>
                            <Link
                                to="/packages"
                                className="inline-flex items-center gap-2 bg-white text-secondary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
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

export default Activities;


