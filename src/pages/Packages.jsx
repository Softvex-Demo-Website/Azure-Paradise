import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Clock, Users, Check, Star, Utensils, Sparkles,
    Activity, X, Calendar, ChevronRight, Gift
} from 'lucide-react';
import DatePicker from 'react-datepicker';
import AnimatedSection from '../components/ui/AnimatedSection';
import { packagesData } from '../data/packagesData';
import 'react-datepicker/dist/react-datepicker.css';

const Packages = () => {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [bookingModalOpen, setBookingModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: null,
        guests: 2,
        specialRequests: ''
    });
    const [submitStatus, setSubmitStatus] = useState('idle');

    const handleBookPackage = (pkg) => {
        setSelectedPackage(pkg);
        setBookingModalOpen(true);
    };

    const handleCloseModal = () => {
        setBookingModalOpen(false);
        setSelectedPackage(null);
        setSubmitStatus('idle');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus('loading');
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmitStatus('success');
        setTimeout(() => {
            handleCloseModal();
            setFormData({
                name: '',
                email: '',
                phone: '',
                date: null,
                guests: 2,
                specialRequests: ''
            });
        }, 2000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'dining': return <Utensils className="w-4 h-4" />;
            case 'spa': return <Sparkles className="w-4 h-4" />;
            case 'activity': return <Activity className="w-4 h-4" />;
            default: return <Check className="w-4 h-4" />;
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'dining': return 'bg-amber-100 text-amber-600';
            case 'spa': return 'bg-purple-100 text-purple-600';
            case 'activity': return 'bg-blue-100 text-blue-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <>
            {/* Booking Modal */}
            <AnimatePresence>
                {bookingModalOpen && selectedPackage && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseModal}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        />
                        <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 overflow-y-auto">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="max-h-[85vh] overflow-y-auto">
                                    {/* Modal Header */}
                                    <div className="relative h-40 bg-gradient-to-r from-primary-600 to-primary-500">
                                        <button
                                            onClick={handleCloseModal}
                                            className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                        <div className="absolute bottom-4 left-6 right-6 text-white">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Gift className="w-5 h-5" />
                                                <span className="font-medium">Experience Package</span>
                                            </div>
                                            <h2 className="font-heading text-2xl font-bold">{selectedPackage.name}</h2>
                                            <p className="text-white/80 text-sm">{selectedPackage.tagline}</p>
                                        </div>
                                    </div>

                                    {/* Modal Content */}
                                    <div className="p-6">
                                        {/* Price Summary */}
                                        <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                                            <div>
                                                <p className="text-sm text-neutral-500">Package Price</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-3xl font-bold text-primary-600">${selectedPackage.price}</span>
                                                    <span className="text-lg text-neutral-400 line-through">${selectedPackage.originalPrice}</span>
                                                </div>
                                            </div>
                                            <div className="bg-green-100 text-green-600 px-4 py-2 rounded-lg">
                                                <p className="text-xs font-medium">You Save</p>
                                                <p className="text-lg font-bold">${selectedPackage.savings}</p>
                                            </div>
                                        </div>

                                        {/* Booking Form */}
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-neutral-600 mb-1">Name *</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                        className="input-field"
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-neutral-600 mb-1">Email *</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                        className="input-field"
                                                        placeholder="john@example.com"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-neutral-600 mb-1">Phone *</label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        required
                                                        className="input-field"
                                                        placeholder="+1 234 567 890"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-neutral-600 mb-1">Guests *</label>
                                                    <select
                                                        name="guests"
                                                        value={formData.guests}
                                                        onChange={handleChange}
                                                        required
                                                        className="input-field"
                                                    >
                                                        {[1, 2, 3, 4, 5, 6].map(num => (
                                                            <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-neutral-600 mb-1">Preferred Date *</label>
                                                <DatePicker
                                                    selected={formData.date}
                                                    onChange={(date) => setFormData(prev => ({ ...prev, date }))}
                                                    minDate={new Date()}
                                                    dateFormat="MMMM d, yyyy"
                                                    placeholderText="Select date"
                                                    className="input-field w-full"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-neutral-600 mb-1">Special Requests</label>
                                                <textarea
                                                    name="specialRequests"
                                                    value={formData.specialRequests}
                                                    onChange={handleChange}
                                                    rows={3}
                                                    className="input-field resize-none"
                                                    placeholder="Any special occasions, dietary requirements, or preferences..."
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={submitStatus === 'loading' || submitStatus === 'success'}
                                                className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${submitStatus === 'success'
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-primary-500 hover:bg-primary-600 text-white'
                                                    }`}
                                            >
                                                {submitStatus === 'loading' ? (
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                                    />
                                                ) : submitStatus === 'success' ? (
                                                    <>
                                                        <Check className="w-5 h-5" />
                                                        Booking Confirmed!
                                                    </>
                                                ) : (
                                                    <>
                                                        <Gift className="w-5 h-5" />
                                                        Book This Package - ${selectedPackage.price}
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>

            <div className="min-h-screen bg-gray-50">
                {/* Hero Banner */}
                <section className="relative h-72 md:h-96 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920"
                        alt="Luxury resort experience"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
                    <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center justify-center gap-2 mb-4"
                            >
                                <Gift className="w-6 h-6 text-secondary-400" />
                                <span className="text-secondary-400 font-medium tracking-wider uppercase">Curated Experiences</span>
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="heading-xl text-white mb-4"
                            >
                                Experience Packages
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-white/90 text-lg max-w-2xl"
                            >
                                Discover our curated bundles combining the best of dining, wellness, and adventure.
                            </motion.p>
                        </div>
                    </div>
                </section>

                {/* Packages Grid */}
                <section className="section-padding">
                    <div className="container-custom">
                        <AnimatedSection className="text-center mb-12">
                            <h2 className="heading-lg text-neutral-800 mb-4">Choose Your Perfect Package</h2>
                            <p className="text-neutral-600 max-w-2xl mx-auto">
                                Each package is thoughtfully designed to provide a complete experience.
                                Select the one that matches your vacation style.
                            </p>
                        </AnimatedSection>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {packagesData.map((pkg, index) => (
                                <AnimatedSection key={pkg.id} delay={index * 0.1}>
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all h-full flex flex-col"
                                    >
                                        {/* Package Image */}
                                        <div className="relative h-56">
                                            <img
                                                src={pkg.image}
                                                alt={pkg.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                            {/* Savings Badge */}
                                            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                                Save ${pkg.savings}
                                            </div>

                                            {/* Package Name Overlay */}
                                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                                <h3 className="font-heading text-2xl font-bold mb-1">{pkg.name}</h3>
                                                <p className="text-white/80 text-sm">{pkg.tagline}</p>
                                            </div>
                                        </div>

                                        {/* Package Content */}
                                        <div className="p-6 flex-grow flex flex-col">
                                            {/* Description */}
                                            <p className="text-neutral-600 mb-6">{pkg.description}</p>

                                            {/* What's Included */}
                                            <div className="mb-6">
                                                <h4 className="font-semibold text-neutral-800 mb-3 flex items-center gap-2">
                                                    <Check className="w-4 h-4 text-primary-500" />
                                                    What's Included
                                                </h4>
                                                <div className="space-y-3">
                                                    {pkg.includes.map((item, i) => (
                                                        <div key={i} className="flex items-start gap-3">
                                                            <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${getTypeColor(item.type)}`}>
                                                                {getTypeIcon(item.type)}
                                                            </span>
                                                            <div className="flex-grow">
                                                                <p className="font-medium text-neutral-800 text-sm">{item.name}</p>
                                                                <p className="text-xs text-neutral-500">{item.description}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Highlights */}
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {pkg.highlights.map((highlight, i) => (
                                                    <span key={i} className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full">
                                                        {highlight}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Best For */}
                                            <div className="flex items-center gap-2 mb-6 text-sm text-neutral-500">
                                                <Users className="w-4 h-4" />
                                                <span>Best for: {pkg.bestFor.join(', ')}</span>
                                            </div>

                                            {/* Price & Book Button */}
                                            <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                                                <div className="w-full sm:w-auto text-center sm:text-left">
                                                    <div className="flex items-center justify-center sm:justify-start gap-2">
                                                        <span className="text-3xl font-bold text-primary-600">${pkg.price}</span>
                                                        <span className="text-neutral-400 line-through">${pkg.originalPrice}</span>
                                                    </div>
                                                    <p className="text-xs text-neutral-500">{pkg.duration} • Per person</p>
                                                </div>
                                                <Link
                                                    to="/contact?subject=Package Booking"
                                                    className="w-full sm:w-auto bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors h-auto min-h-[3rem] whitespace-normal text-center"
                                                >
                                                    <span>Book Package</span>
                                                    <ChevronRight className="w-4 h-4 flex-shrink-0" />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Custom Package CTA */}
                <section className="py-16 bg-primary-500">
                    <div className="container-custom text-center">
                        <AnimatedSection>
                            <Gift className="w-12 h-12 text-white/80 mx-auto mb-4" />
                            <h2 className="heading-md text-white mb-4">Can't Find The Perfect Package?</h2>
                            <p className="text-white/80 mb-8 max-w-xl mx-auto">
                                Our concierge team can create a custom experience tailored to your preferences.
                                Tell us your dream vacation and we'll make it happen.
                            </p>
                            <Link
                                to="/custom-package"
                                className="inline-block bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Create Custom Package
                            </Link>
                        </AnimatedSection>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Packages;
