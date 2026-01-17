import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';

const instagramImages = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400",
        likes: 2453,
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400",
        likes: 1892,
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
        likes: 3124,
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400",
        likes: 2087,
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400",
        likes: 1654,
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
        likes: 2891,
    },
    {
        id: 7,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400",
        likes: 1432,
    },
    {
        id: 8,
        image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400",
        likes: 2234,
    },
];

const InstagramFeed = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container-custom">
                {/* Section Header */}
                <AnimatedSection className="text-center mb-10">
                    <p className="text-secondary-500 font-medium tracking-wider mb-3 uppercase">
                        Follow Our Journey
                    </p>
                    <h2 className="heading-lg text-neutral-800 mb-4">
                        @AzureParadiseResort
                    </h2>
                    <p className="text-neutral-600 max-w-2xl mx-auto">
                        Share your paradise moments with us. Tag us in your photos and
                        get featured on our feed.
                    </p>
                </AnimatedSection>

                {/* Instagram Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {instagramImages.map((item, index) => (
                        <AnimatedSection
                            key={item.id}
                            delay={index * 0.05}
                            direction="scale"
                        >
                            <motion.a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                className="relative block aspect-square overflow-hidden rounded-lg group"
                            >
                                <img
                                    src={item.image}
                                    alt={`Instagram post ${item.id}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-primary-600/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="text-center text-white">
                                        <Instagram className="w-8 h-8 mx-auto mb-2" />
                                        <span className="text-sm font-medium">
                                            {item.likes.toLocaleString()} likes
                                        </span>
                                    </div>
                                </div>
                            </motion.a>
                        </AnimatedSection>
                    ))}
                </div>

                {/* Follow Button */}
                <AnimatedSection className="text-center mt-10">
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-semibold py-3 px-8 rounded-full hover:shadow-lg transition-shadow"
                    >
                        <Instagram className="w-5 h-5" />
                        Follow on Instagram
                    </a>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default InstagramFeed;
