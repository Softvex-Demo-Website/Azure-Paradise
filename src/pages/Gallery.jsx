import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';

const galleryImages = [
    { id: 1, src: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800", category: "resort", alt: "Overwater bungalows" },
    { id: 2, src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800", category: "rooms", alt: "Beachfront villa" },
    { id: 3, src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800", category: "pool", alt: "Infinity pool" },
    { id: 4, src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800", category: "activities", alt: "Snorkeling" },
    { id: 5, src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800", category: "resort", alt: "Aerial view" },
    { id: 6, src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800", category: "rooms", alt: "Luxury suite" },
    { id: 7, src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800", category: "beach", alt: "Beach sunset" },
    { id: 8, src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800", category: "spa", alt: "Spa treatment" },
    { id: 9, src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800", category: "dining", alt: "Fine dining" },
    { id: 10, src: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800", category: "beach", alt: "Palm trees" },
    { id: 11, src: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800", category: "rooms", alt: "Presidential suite" },
    { id: 12, src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800", category: "spa", alt: "Spa relaxation" }
];

const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'resort', label: 'Resort' },
    { id: 'rooms', label: 'Rooms' },
    { id: 'beach', label: 'Beach' },
    { id: 'pool', label: 'Pool' },
    { id: 'dining', label: 'Dining' },
    { id: 'spa', label: 'Spa' },
    { id: 'activities', label: 'Activities' },
];

const Gallery = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const filteredImages = activeCategory === 'all'
        ? galleryImages
        : galleryImages.filter(img => img.category === activeCategory);

    const openLightbox = (index) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = 'auto';
    };

    const goNext = () => {
        setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
    };

    const goPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
    };

    // Keyboard navigation
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') goNext();
        if (e.key === 'ArrowLeft') goPrev();
    };

    return (
        <div className="min-h-screen bg-gray-50" onKeyDown={handleKeyDown} tabIndex={0}>
            {/* Hero Banner */}
            <section className="relative h-72 md:h-96 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1920"
                    alt="Resort gallery"
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
                            Photo Gallery
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-white/90 text-lg max-w-2xl"
                        >
                            A visual journey through paradise
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Category Filters */}
            <section className="bg-white border-b border-gray-100 sticky top-16 z-20">
                <div className="container-custom">
                    <div className="flex overflow-x-auto gap-2 py-4 -mx-4 px-4 md:mx-0 md:px-0">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`whitespace-nowrap px-6 py-2.5 rounded-full font-medium transition-all ${activeCategory === category.id
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-gray-100 text-neutral-600 hover:bg-gray-200'
                                    }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="section-padding">
                <div className="container-custom">
                    <AnimatedSection className="text-center mb-8">
                        <p className="text-neutral-600">
                            Showing {filteredImages.length} photos
                        </p>
                    </AnimatedSection>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredImages.map((image, index) => (
                            <AnimatedSection
                                key={image.id}
                                delay={index * 0.03}
                                direction="scale"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => openLightbox(index)}
                                    className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                                >
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <ZoomIn className="w-8 h-8 text-white" />
                                    </div>
                                </motion.div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {/* Navigation */}
                        <button
                            onClick={goPrev}
                            className="absolute left-4 p-2 text-white/80 hover:text-white transition-colors"
                        >
                            <ChevronLeft className="w-10 h-10" />
                        </button>
                        <button
                            onClick={goNext}
                            className="absolute right-4 p-2 text-white/80 hover:text-white transition-colors"
                        >
                            <ChevronRight className="w-10 h-10" />
                        </button>

                        {/* Image */}
                        <motion.img
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            src={filteredImages[currentIndex]?.src.replace('w=800', 'w=1600')}
                            alt={filteredImages[currentIndex]?.alt}
                            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
                        />

                        {/* Counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
                            {currentIndex + 1} / {filteredImages.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
