import { motion } from 'framer-motion';
import { Award, Heart, Leaf, Shield, Users, Star, Check } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';

const About = () => {
    const values = [
        {
            icon: Heart,
            title: "Heartfelt Hospitality",
            description: "We believe in creating genuine connections with our guests, treating everyone like family."
        },
        {
            icon: Leaf,
            title: "Environmental Stewardship",
            description: "Committed to sustainable practices that preserve our pristine island paradise for future generations."
        },
        {
            icon: Shield,
            title: "Excellence & Quality",
            description: "Uncompromising standards in every detail, from accommodations to dining and service."
        },
        {
            icon: Users,
            title: "Community Impact",
            description: "Supporting local communities and creating meaningful employment opportunities."
        }
    ];

    const awards = [
        { year: "2025", title: "World's Leading Beach Resort", org: "World Travel Awards" },
        { year: "2024", title: "Best Luxury Resort - Maldives", org: "Luxury Travel Magazine" },
        { year: "2024", title: "Excellence in Sustainability", org: "Green Globe Certification" },
        { year: "2023", title: "Top Spa Resort", org: "Spa Excellence Awards" }
    ];

    const stats = [
        { number: "500+", label: "Luxury Suites" },
        { number: "50+", label: "Countries Served" },
        { number: "98%", label: "Guest Satisfaction" },
        { number: "15+", label: "Years of Excellence" }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920"
                    alt="About Azure Paradise Resort"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
                <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                    <div className="max-w-4xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="heading-xl text-white mb-6"
                        >
                            Welcome to Azure Paradise
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-white/90 text-xl max-w-2xl mx-auto"
                        >
                            Where luxury meets nature, and every moment becomes a cherished memory
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="bg-primary-500 py-12">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <AnimatedSection key={index} delay={index * 0.1}>
                                <div className="text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="text-4xl md:text-5xl font-bold text-white mb-2"
                                    >
                                        {stat.number}
                                    </motion.div>
                                    <div className="text-white/80">{stat.label}</div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <AnimatedSection>
                            <img
                                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"
                                alt="Resort view"
                                className="rounded-2xl shadow-2xl"
                            />
                        </AnimatedSection>
                        <AnimatedSection delay={0.2}>
                            <h2 className="heading-lg text-neutral-800 mb-6">Our Story</h2>
                            <div className="space-y-4 text-neutral-600 leading-relaxed">
                                <p>
                                    Founded in 2009, Azure Paradise Resort was born from a dream to create an
                                    unparalleled luxury destination that celebrates the natural beauty of the Maldives
                                    while providing world-class hospitality.
                                </p>
                                <p>
                                    What began as a boutique collection of overwater villas has blossomed into one of
                                    the region's most prestigious resorts, offering 500+ suites, award-winning dining,
                                    and experiences that captivate the hearts of travelers from around the globe.
                                </p>
                                <p>
                                    Today, we continue to innovate and elevate the guest experience while staying true
                                    to our founding principles: exceptional service, environmental responsibility, and
                                    creating magical moments that last a lifetime.
                                </p>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <AnimatedSection className="text-center mb-12">
                        <h2 className="heading-lg text-neutral-800 mb-4">Our Core Values</h2>
                        <p className="text-neutral-600 max-w-2xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <AnimatedSection key={index} delay={index * 0.1}>
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="text-center p-6 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors"
                                >
                                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <value.icon className="w-8 h-8 text-primary-600" />
                                    </div>
                                    <h3 className="font-heading text-xl font-semibold text-neutral-800 mb-3">
                                        {value.title}
                                    </h3>
                                    <p className="text-neutral-600 text-sm">{value.description}</p>
                                </motion.div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <AnimatedSection>
                            <h2 className="heading-lg text-neutral-800 mb-6">Why Choose Azure Paradise?</h2>
                            <div className="space-y-4">
                                {[
                                    "Prime beachfront location with crystal-clear turquoise waters",
                                    "Award-winning restaurants featuring world-class cuisine",
                                    "Luxurious overwater and beachfront accommodations",
                                    "World-class spa and wellness facilities",
                                    "Extensive water sports and adventure activities",
                                    "Personalized concierge service available 24/7",
                                    "Commitment to sustainability and environmental conservation",
                                    "Family-friendly amenities and kids' programs"
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        className="flex items-start gap-3"
                                    >
                                        <Check className="w-6 h-6 text-primary-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-neutral-600">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </AnimatedSection>
                        <AnimatedSection delay={0.2}>
                            <img
                                src="https://images.unsplash.com/photo-1596178060810-4dd9cf1e0e1f?w=800"
                                alt="Luxury resort amenities"
                                className="rounded-2xl shadow-2xl"
                            />
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Awards & Recognition */}
            <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-500">
                <div className="container-custom">
                    <AnimatedSection className="text-center mb-12">
                        <Award className="w-12 h-12 text-white/80 mx-auto mb-4" />
                        <h2 className="heading-lg text-white mb-4">Awards & Recognition</h2>
                        <p className="text-white/80 max-w-2xl mx-auto">
                            Honored to be recognized by leading travel organizations worldwide
                        </p>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {awards.map((award, index) => (
                            <AnimatedSection key={index} delay={index * 0.1}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
                                >
                                    <Star className="w-8 h-8 text-secondary-400 mx-auto mb-3" />
                                    <div className="text-secondary-400 font-bold text-lg mb-2">{award.year}</div>
                                    <h4 className="font-semibold text-white mb-2">{award.title}</h4>
                                    <p className="text-white/70 text-sm">{award.org}</p>
                                </motion.div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Commitment to Sustainability */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                        <AnimatedSection>
                            <Leaf className="w-12 h-12 text-green-600 mx-auto mb-6" />
                            <h2 className="heading-lg text-neutral-800 mb-6">Commitment to Sustainability</h2>
                            <p className="text-neutral-600 text-lg leading-relaxed mb-8">
                                We believe luxury and sustainability go hand in hand. Our resort operates on 100%
                                renewable energy, implements comprehensive waste reduction programs, and actively
                                supports coral reef restoration projects. Every stay with us contributes to preserving
                                the natural beauty that makes the Maldives so special.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                <div>
                                    <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
                                    <div className="text-neutral-600">Renewable Energy</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-green-600 mb-2">Zero</div>
                                    <div className="text-neutral-600">Single-Use Plastics</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
                                    <div className="text-neutral-600">Coral Restoration Sites</div>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-neutral-800">
                <div className="container-custom text-center">
                    <AnimatedSection>
                        <h2 className="heading-md text-white mb-4">Experience Azure Paradise</h2>
                        <p className="text-white/80 mb-8 max-w-xl mx-auto">
                            Discover the perfect blend of luxury, nature, and unforgettable experiences
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/rooms"
                                className="btn-primary inline-block"
                            >
                                Explore Accommodations
                            </a>
                            <a
                                href="/contact"
                                className="inline-block bg-white text-neutral-800 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors"
                            >
                                Contact Us
                            </a>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
};

export default About;
