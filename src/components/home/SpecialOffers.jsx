import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Tag, ArrowRight } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';

const offers = [
    {
        id: 1,
        title: "Early Bird Special",
        discount: "25% OFF",
        description: "Book 60 days in advance and save on your dream vacation. Includes complimentary airport transfer.",
        validUntil: "March 31, 2026",
        image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600",
        color: "from-primary-500 to-primary-600"
    },
    {
        id: 2,
        title: "Honeymoon Package",
        discount: "FREE UPGRADE",
        description: "Celebrate love with a complimentary room upgrade, romantic dinner, and couples spa treatment.",
        validUntil: "December 31, 2026",
        image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600",
        color: "from-secondary-500 to-secondary-600"
    },
    {
        id: 3,
        title: "Extended Stay",
        discount: "4TH NIGHT FREE",
        description: "Stay 4 nights and pay for only 3. Perfect for those who want to truly unwind in paradise.",
        validUntil: "June 30, 2026",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600",
        color: "from-accent-500 to-accent-600"
    }
];

const SpecialOffers = () => {
    return (
        <section className="section-padding bg-neutral-500">
            <div className="container-custom">
                {/* Section Header */}
                <AnimatedSection className="text-center mb-12">
                    <p className="text-secondary-400 font-medium tracking-wider mb-3 uppercase">
                        Limited Time Only
                    </p>
                    <h2 className="heading-lg text-white mb-4">
                        Special Offers
                    </h2>
                    <p className="text-white/70 max-w-2xl mx-auto">
                        Take advantage of our exclusive deals and make your luxury getaway
                        even more memorable.
                    </p>
                </AnimatedSection>

                {/* Offers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {offers.map((offer, index) => (
                        <AnimatedSection
                            key={offer.id}
                            delay={index * 0.1}
                            className="group"
                        >
                            <motion.div
                                whileHover={{ y: -10 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-xl h-full flex flex-col"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={offer.image}
                                        alt={offer.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                    {/* Discount Badge */}
                                    <div className={`absolute top-4 left-4 bg-gradient-to-r ${offer.color} text-white font-bold px-4 py-2 rounded-full text-sm`}>
                                        {offer.discount}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-grow flex flex-col">
                                    <h3 className="font-heading text-xl font-semibold text-neutral-800 mb-3">
                                        {offer.title}
                                    </h3>

                                    <p className="text-neutral-600 text-sm mb-4 flex-grow">
                                        {offer.description}
                                    </p>

                                    {/* Validity */}
                                    <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
                                        <Clock className="w-4 h-4" />
                                        <span>Valid until {offer.validUntil}</span>
                                    </div>

                                    {/* CTA */}
                                    <Link
                                        to="/rooms"
                                        className={`w-full py-3 bg-gradient-to-r ${offer.color} text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}
                                    >
                                        Book Now
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        </AnimatedSection>
                    ))}
                </div>

                {/* View All Link */}
                <AnimatedSection className="text-center mt-10">
                    <Link
                        to="/rooms"
                        className="inline-flex items-center gap-2 text-white font-medium hover:text-secondary-400 transition-colors"
                    >
                        View All Offers
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default SpecialOffers;
