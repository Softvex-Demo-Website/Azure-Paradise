import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Users, ArrowRight } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import { roomsData } from '../../data/roomsData';

const RoomPreview = () => {
    // Get first 3 featured rooms
    const featuredRooms = roomsData.slice(0, 3);

    return (
        <section className="section-padding bg-gray-50">
            <div className="container-custom">
                {/* Section Header */}
                <AnimatedSection className="text-center mb-12">
                    <p className="text-secondary-500 font-medium tracking-wider mb-3 uppercase">
                        Accommodations
                    </p>
                    <h2 className="heading-lg text-neutral-800 mb-4">
                        Luxurious Rooms & Villas
                    </h2>
                    <p className="text-neutral-600 max-w-2xl mx-auto">
                        Choose from our collection of elegantly designed rooms and private villas,
                        each offering stunning views and world-class amenities.
                    </p>
                </AnimatedSection>

                {/* Room Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredRooms.map((room, index) => (
                        <AnimatedSection
                            key={room.id}
                            delay={index * 0.1}
                            className="group"
                        >
                            <div className="card h-full flex flex-col">
                                {/* Image */}
                                <div className="relative overflow-hidden">
                                    <img
                                        src={room.image}
                                        alt={room.name}
                                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* Price Badge */}
                                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full">
                                        <span className="text-primary-600 font-bold">${room.price}</span>
                                        <span className="text-neutral-500 text-sm">/night</span>
                                    </div>

                                    {/* Quick View on Hover */}
                                    <Link
                                        to={`/rooms/${room.id}`}
                                        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-primary-600 font-semibold px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 hover:bg-primary-600 hover:text-white"
                                    >
                                        Quick View
                                    </Link>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-grow flex flex-col">
                                    {/* Rating */}
                                    <div className="flex items-center gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < Math.floor(room.rating)
                                                        ? 'text-accent-500 fill-current'
                                                        : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                        <span className="text-sm text-neutral-500 ml-1">
                                            ({room.reviews} reviews)
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-heading text-xl font-semibold text-neutral-800 mb-2">
                                        {room.name}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-neutral-600 text-sm mb-4 flex-grow">
                                        {room.description}
                                    </p>

                                    {/* Features */}
                                    <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
                                        <span className="flex items-center gap-1">
                                            <Users className="w-4 h-4" />
                                            {room.maxGuests} Guests
                                        </span>
                                        <span>•</span>
                                        <span>{room.size}</span>
                                        <span>•</span>
                                        <span className="capitalize">{room.view} View</span>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex gap-3">
                                        <Link
                                            to={`/rooms/${room.id}`}
                                            className="flex-1 text-center py-2.5 border-2 border-primary-500 text-primary-500 rounded-lg font-medium hover:bg-primary-500 hover:text-white transition-colors"
                                        >
                                            View Details
                                        </Link>
                                        <Link
                                            to={`/rooms/${room.id}`}
                                            className="flex-1 text-center py-2.5 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
                                        >
                                            Book Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>

                {/* View All Button */}
                <AnimatedSection className="text-center mt-12">
                    <Link
                        to="/rooms"
                        className="inline-flex items-center gap-2 btn-outline group"
                    >
                        View All Rooms
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default RoomPreview;
