import { motion } from 'framer-motion';
import {
    Waves,
    Utensils,
    Dumbbell,
    Sparkles,
    Wifi,
    Car,
    Trees,
    Umbrella,
    Coffee,
    Plane,
    Baby,
    Gem
} from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';

const iconMap = {
    Waves: Waves,
    Utensils: Utensils,
    Dumbbell: Dumbbell,
    SparklesIcon: Sparkles,
    Wifi: Wifi,
    Car: Car,
    Palmtree: Trees,
    Umbrella: Umbrella,
    Coffee: Coffee,
    Plane: Plane,
    Baby: Baby,
    Gem: Gem
};

const amenitiesData = [
    { icon: 'Umbrella', name: 'Private Beach', description: '1.5 km of pristine white sand' },
    { icon: 'Waves', name: 'Infinity Pools', description: 'Three pools with ocean views' },
    { icon: 'Utensils', name: 'Fine Dining', description: 'Five world-class restaurants' },
    { icon: 'SparklesIcon', name: 'Luxury Spa', description: 'Full-service wellness center' },
    { icon: 'Dumbbell', name: 'Fitness Center', description: 'State-of-the-art equipment' },
    { icon: 'Wifi', name: 'Free WiFi', description: 'High-speed internet everywhere' },
    { icon: 'Palmtree', name: 'Tropical Gardens', description: '10 acres of landscaped beauty' },
    { icon: 'Gem', name: '24/7 Concierge', description: 'At your service always' },
];

const Amenities = () => {
    return (
        <section className="section-padding bg-white">
            <div className="container-custom">
                {/* Section Header */}
                <AnimatedSection className="text-center mb-12">
                    <p className="text-secondary-500 font-medium tracking-wider mb-3 uppercase">
                        World-Class Facilities
                    </p>
                    <h2 className="heading-lg text-neutral-800 mb-4">
                        Resort Amenities
                    </h2>
                    <p className="text-neutral-600 max-w-2xl mx-auto">
                        Indulge in our exceptional amenities designed to make your stay
                        unforgettable. Every detail crafted for your comfort and pleasure.
                    </p>
                </AnimatedSection>

                {/* Amenities Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {amenitiesData.map((amenity, index) => {
                        const Icon = iconMap[amenity.icon] || Gem;
                        return (
                            <AnimatedSection
                                key={index}
                                delay={index * 0.05}
                                className="group"
                            >
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="bg-gray-50 rounded-xl p-6 text-center hover:bg-primary-500 transition-colors duration-300 cursor-pointer h-full"
                                >
                                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary-100 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                                        <Icon className="w-7 h-7 text-primary-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <h3 className="font-semibold text-neutral-800 group-hover:text-white mb-2 transition-colors">
                                        {amenity.name}
                                    </h3>
                                    <p className="text-sm text-neutral-500 group-hover:text-white/80 transition-colors">
                                        {amenity.description}
                                    </p>
                                </motion.div>
                            </AnimatedSection>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Amenities;
