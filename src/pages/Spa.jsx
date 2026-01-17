import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Sparkles, Check } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import SpaBookingModal from '../components/spa/SpaBookingModal';

const treatments = [
    {
        id: 1,
        name: "Signature Maldivian Massage",
        duration: "90 minutes",
        price: 220,
        description: "Traditional healing techniques combined with aromatic oils for deep relaxation.",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600"
    },
    {
        id: 2,
        name: "Ocean Stone Therapy",
        duration: "75 minutes",
        price: 180,
        description: "Heated volcanic stones placed on key points to release tension and restore balance.",
        image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600"
    },
    {
        id: 3,
        name: "Tropical Body Wrap",
        duration: "60 minutes",
        price: 150,
        description: "Nourishing coconut and papaya wrap to hydrate and rejuvenate your skin.",
        image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600"
    },
    {
        id: 4,
        name: "Couples Harmony Ritual",
        duration: "120 minutes",
        price: 450,
        description: "Shared experience including massage, facial, and champagne in private suite.",
        image: "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=600"
    },
    {
        id: 5,
        name: "Anti-Aging Facial",
        duration: "60 minutes",
        price: 160,
        description: "Premium facial using marine collagen to reduce fine lines and restore radiance.",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600"
    },
    {
        id: 6,
        name: "Full Day Retreat",
        duration: "6 hours",
        price: 550,
        description: "Complete wellness journey with massage, body treatment, facial, lunch, and pool access.",
        image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600"
    }
];

const facilities = [
    "Infinity-edge Vitality Pool",
    "Thermal Suite & Steam Rooms",
    "Private Treatment Pavilions",
    "Yoga & Meditation Deck",
    "Outdoor Relaxation Garden",
    "Beauty Salon & Nail Bar",
    "Fitness Center",
    "Healthy Spa Cuisine"
];

const Spa = () => {
    const [bookingModalOpen, setBookingModalOpen] = useState(false);
    const [selectedTreatment, setSelectedTreatment] = useState(null);

    const handleBookTreatment = (treatment) => {
        setSelectedTreatment(treatment);
        setBookingModalOpen(true);
    };

    const handleCloseModal = () => {
        setBookingModalOpen(false);
        setSelectedTreatment(null);
    };

    return (
        <>
            <SpaBookingModal
                treatment={selectedTreatment}
                isOpen={bookingModalOpen}
                onClose={handleCloseModal}
            />
            <div className="min-h-screen bg-gray-50">
                {/* Hero Banner */}
                <section className="relative h-72 md:h-96 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920"
                        alt="Luxury spa experience"
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
                                Spa & Wellness
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-white/90 text-lg max-w-2xl"
                            >
                                Rejuvenate your body and soul at our award-winning spa sanctuary.
                            </motion.p>
                        </div>
                    </div>
                </section>

                {/* Intro Section */}
                <section className="section-padding bg-white">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <AnimatedSection>
                                <p className="text-secondary-500 font-medium tracking-wider mb-3 uppercase">
                                    Azure Spa
                                </p>
                                <h2 className="heading-lg text-neutral-800 mb-6">
                                    A Sanctuary of Serenity
                                </h2>
                                <p className="text-neutral-600 mb-6 leading-relaxed">
                                    Set across 3,000 square meters of tranquil gardens, our overwater
                                    spa offers a holistic approach to wellness. Drawing inspiration from
                                    ancient healing traditions and modern techniques, our expert therapists
                                    create personalized experiences that restore balance and vitality.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    {facilities.slice(0, 4).map((facility, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-primary-500" />
                                            <span className="text-sm text-neutral-600">{facility}</span>
                                        </div>
                                    ))}
                                </div>
                            </AnimatedSection>

                            <AnimatedSection delay={0.2} direction="right">
                                <div className="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800"
                                        alt="Spa interior"
                                        className="rounded-2xl shadow-xl"
                                    />
                                    <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                                <Sparkles className="w-6 h-6 text-primary-500" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-neutral-800">Award Winning</p>
                                                <p className="text-sm text-neutral-500">Best Resort Spa 2025</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* Treatments */}
                <section className="section-padding bg-gray-50">
                    <div className="container-custom">
                        <AnimatedSection className="text-center mb-12">
                            <p className="text-secondary-500 font-medium tracking-wider mb-3 uppercase">
                                Treatments
                            </p>
                            <h2 className="heading-lg text-neutral-800 mb-4">
                                Signature Experiences
                            </h2>
                            <p className="text-neutral-600 max-w-2xl mx-auto">
                                Choose from our curated menu of treatments designed to restore,
                                relax, and rejuvenate.
                            </p>
                        </AnimatedSection>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {treatments.map((treatment, index) => (
                                <AnimatedSection key={treatment.id} delay={index * 0.1}>
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col"
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={treatment.image}
                                                alt={treatment.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-6 flex-grow flex flex-col">
                                            <h3 className="font-heading text-xl font-semibold text-neutral-800 mb-2">
                                                {treatment.name}
                                            </h3>
                                            <p className="text-neutral-600 text-sm mb-4 flex-grow">
                                                {treatment.description}
                                            </p>
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mb-4">
                                                <div className="flex items-center gap-1 text-sm text-neutral-500">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{treatment.duration}</span>
                                                </div>
                                                <span className="font-bold text-primary-600 text-lg">${treatment.price}</span>
                                            </div>
                                            <button
                                                onClick={() => handleBookTreatment(treatment)}
                                                className="btn-primary w-full py-2 text-sm"
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </motion.div>
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

export default Spa;

