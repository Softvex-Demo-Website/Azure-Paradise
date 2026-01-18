import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Users, Heart, Eye } from 'lucide-react';
import { useState } from 'react';

const RoomCard = ({ room }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="card group h-full flex flex-col"
        >
            {/* Image */}
            <div className="relative overflow-hidden">
                <img
                    src={room.image}
                    alt={room.name}
                    loading="lazy"
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                    <span className="text-primary-600 font-bold">${room.price}</span>
                    <span className="text-neutral-500 text-sm">/night</span>
                </div>

                {/* Favorite Button */}
                <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                    <Heart
                        className={`w-5 h-5 transition-colors ${isFavorite ? 'text-red-500 fill-current' : 'text-neutral-400'
                            }`}
                    />
                </button>

                {/* Category Badge */}
                <div className="absolute bottom-4 left-4 bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    {room.category}
                </div>

                {/* Quick View on Hover */}
                <Link
                    to={`/rooms/${room.id}`}
                    className="absolute bottom-4 right-4 flex items-center gap-2 bg-white text-primary-600 font-medium px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 hover:bg-primary-600 hover:text-white"
                >
                    <Eye className="w-4 h-4" />
                    Quick View
                </Link>
            </div>

            {/* Content */}
            <div className="p-5 flex-grow flex flex-col">
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
                        {room.rating} ({room.reviews})
                    </span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl font-semibold text-neutral-800 mb-2">
                    {room.name}
                </h3>

                {/* Description */}
                <p className="text-neutral-600 text-sm mb-4 line-clamp-2 flex-grow">
                    {room.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500 mb-4 pb-4 border-b border-gray-100">
                    <span className="flex items-center gap-1 whitespace-nowrap">
                        <Users className="w-4 h-4" />
                        {room.maxGuests} Guests
                    </span>
                    <span>•</span>
                    <span>{room.beds}</span>
                    <span>•</span>
                    <span>{room.size}</span>
                </div>

                {/* Amenities Preview */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities.slice(0, 4).map((amenity, index) => (
                        <span
                            key={index}
                            className="text-xs bg-gray-100 text-neutral-600 px-2 py-1 rounded"
                        >
                            {amenity}
                        </span>
                    ))}
                    {room.amenities.length > 4 && (
                        <span className="text-xs text-primary-500 px-2 py-1">
                            +{room.amenities.length - 4} more
                        </span>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-auto">
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
        </motion.div>
    );
};

export default RoomCard;
