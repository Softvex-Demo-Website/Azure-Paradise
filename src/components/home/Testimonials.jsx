import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import { testimonialsData } from '../../data/testimonialsData';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Testimonials = () => {
    return (
        <section className="section-padding bg-gray-50">
            <div className="container-custom">
                {/* Section Header */}
                <AnimatedSection className="text-center mb-12">
                    <p className="text-secondary-500 font-medium tracking-wider mb-3 uppercase">
                        Guest Reviews
                    </p>
                    <h2 className="heading-lg text-neutral-800 mb-4">
                        What Our Guests Say
                    </h2>
                    <p className="text-neutral-600 max-w-2xl mx-auto">
                        Don't just take our word for it. Hear from guests who've experienced
                        the magic of Azure Paradise Resort.
                    </p>
                </AnimatedSection>

                {/* Testimonials Slider */}
                <AnimatedSection>
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        spaceBetween={30}
                        slidesPerView={1}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        navigation
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="pb-12"
                    >
                        {testimonialsData.map((testimonial) => (
                            <SwiperSlide key={testimonial.id}>
                                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow h-full">
                                    {/* Quote Icon */}
                                    <Quote className="w-10 h-10 text-primary-200 mb-4" />

                                    {/* Review Text */}
                                    <p className="text-neutral-600 italic mb-6 leading-relaxed">
                                        "{testimonial.text}"
                                    </p>

                                    {/* Rating */}
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < testimonial.rating
                                                        ? 'text-accent-500 fill-current'
                                                        : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    {/* Guest Info */}
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-14 h-14 rounded-full object-cover border-2 border-primary-100"
                                        />
                                        <div>
                                            <h4 className="font-semibold text-neutral-800">
                                                {testimonial.name}
                                            </h4>
                                            <p className="text-sm text-neutral-500">
                                                {testimonial.location}
                                            </p>
                                            <p className="text-xs text-primary-500">
                                                {testimonial.roomType} • {testimonial.date}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default Testimonials;
