import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Star, Users, Maximize, Eye, Check,
    ChevronLeft, ChevronRight, Calendar,
    ArrowLeft
} from 'lucide-react';
import DatePicker from 'react-datepicker';
import AnimatedSection from '../components/ui/AnimatedSection';
import { getRoomById, roomsData } from '../data/roomsData';
import { useBooking } from '../context/BookingContext';
import 'react-datepicker/dist/react-datepicker.css';

const RoomDetails = () => {
    const { id } = useParams();
    const { bookingData, updateDates, updateGuests } = useBooking();
    const [room, setRoom] = useState(null);
    const [currentImage, setCurrentImage] = useState(0);
    const [checkIn, setCheckIn] = useState(bookingData.checkIn);
    const [checkOut, setCheckOut] = useState(bookingData.checkOut);
    const [guests, setGuests] = useState(bookingData.guests);

    useEffect(() => {
        const foundRoom = getRoomById(id);
        setRoom(foundRoom);
    }, [id]);

    // Keyboard navigation for image gallery
    useEffect(() => {
        if (!room) return;

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                setCurrentImage(prev => prev === 0 ? room.images.length - 1 : prev - 1);
            } else if (e.key === 'ArrowRight') {
                setCurrentImage(prev => prev === room.images.length - 1 ? 0 : prev + 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [room]);

    if (!room) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    const nights = checkIn && checkOut
        ? Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
        : 0;
    const totalPrice = nights * room.price;

    const similarRooms = roomsData
        .filter(r => r.id !== room.id && r.category === room.category)
        .slice(0, 3);

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Back Button */}
            <div className="bg-white border-b border-gray-100">
                <div className="container-custom py-4">
                    <Link
                        to="/rooms"
                        className="inline-flex items-center gap-2 text-neutral-600 hover:text-primary-600 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Rooms
                    </Link>
                </div>
            </div>

            <div className="container-custom py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Image Gallery */}
                        <AnimatedSection className="bg-white rounded-2xl overflow-hidden shadow-lg mb-8">
                            <div className="relative">
                                <motion.img
                                    key={currentImage}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    src={room.images[currentImage]}
                                    alt={room.name}
                                    className="w-full h-96 md:h-[500px] object-cover"
                                />

                                {/* Navigation Arrows */}
                                <button
                                    onClick={() => setCurrentImage(prev => prev === 0 ? room.images.length - 1 : prev - 1)}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setCurrentImage(prev => prev === room.images.length - 1 ? 0 : prev + 1)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>

                                {/* Image Counter */}
                                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                                    {currentImage + 1} / {room.images.length}
                                </div>
                            </div>

                            {/* Thumbnails */}
                            <div className="flex gap-2 p-4 overflow-x-auto">
                                {room.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImage(index)}
                                        className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${index === currentImage ? 'border-primary-500' : 'border-transparent'
                                            }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </AnimatedSection>

                        {/* Room Info */}
                        <AnimatedSection delay={0.1} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-8">
                            {/* Header */}
                            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                                <div>
                                    <span className="inline-block bg-primary-100 text-primary-600 text-sm font-medium px-3 py-1 rounded-full mb-3 capitalize">
                                        {room.category}
                                    </span>
                                    <h1 className="heading-lg text-neutral-800">{room.name}</h1>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-1 mb-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < Math.floor(room.rating)
                                                    ? 'text-accent-500 fill-current'
                                                    : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                        <span className="ml-2 font-medium">{room.rating}</span>
                                    </div>
                                    <p className="text-sm text-neutral-500">{room.reviews} reviews</p>
                                </div>
                            </div>

                            {/* Quick Info */}
                            <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-gray-100">
                                <div className="flex items-center gap-2 text-neutral-600">
                                    <Users className="w-5 h-5 text-primary-500" />
                                    <span>{room.maxGuests} Guests</span>
                                </div>
                                <div className="flex items-center gap-2 text-neutral-600">
                                    <Maximize className="w-5 h-5 text-primary-500" />
                                    <span>{room.size}</span>
                                </div>
                                <div className="flex items-center gap-2 text-neutral-600">
                                    <Eye className="w-5 h-5 text-primary-500" />
                                    <span className="capitalize">{room.view} View</span>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <h3 className="font-heading text-xl font-semibold mb-4">About This Room</h3>
                                <p className="text-neutral-600 leading-relaxed">
                                    {room.fullDescription}
                                </p>
                            </div>

                            {/* Amenities */}
                            <div className="mb-8">
                                <h3 className="font-heading text-xl font-semibold mb-4">Amenities</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {room.amenities.map((amenity, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-green-500" />
                                            <span className="text-neutral-600">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Features */}
                            <div>
                                <h3 className="font-heading text-xl font-semibold mb-4">What's Included</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {room.features.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2 bg-primary-50 p-3 rounded-lg">
                                            <Check className="w-4 h-4 text-primary-500" />
                                            <span className="text-neutral-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="lg:col-span-1">
                        <AnimatedSection delay={0.2} className="sticky top-24">
                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                {/* Price */}
                                <div className="text-center mb-6 pb-6 border-b border-gray-100">
                                    <span className="text-3xl font-bold text-primary-600">${room.price}</span>
                                    <span className="text-neutral-500"> / night</span>
                                </div>

                                {/* Date Pickers */}
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-600 mb-2">
                                            Check In
                                        </label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                            <DatePicker
                                                selected={checkIn}
                                                onChange={(date) => {
                                                    setCheckIn(date);
                                                    updateDates(date, checkOut);
                                                }}
                                                minDate={new Date()}
                                                placeholderText="Select date"
                                                dateFormat="MMM dd, yyyy"
                                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-600 mb-2">
                                            Check Out
                                        </label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                            <DatePicker
                                                selected={checkOut}
                                                onChange={(date) => {
                                                    setCheckOut(date);
                                                    updateDates(checkIn, date);
                                                }}
                                                minDate={checkIn || new Date()}
                                                placeholderText="Select date"
                                                dateFormat="MMM dd, yyyy"
                                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    {/* Guests */}
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-600 mb-2">
                                            Guests
                                        </label>
                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <p className="text-xs text-neutral-500 mb-1">Adults</p>
                                                <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2">
                                                    <button
                                                        onClick={() => {
                                                            const newAdults = Math.max(1, guests.adults - 1);
                                                            setGuests(g => ({ ...g, adults: newAdults }));
                                                            updateGuests(newAdults, guests.children, guests.rooms || 1);
                                                        }}
                                                        className="w-6 h-6 flex items-center justify-center text-neutral-500 hover:text-primary-500"
                                                    >
                                                        -
                                                    </button>
                                                    <span>{guests.adults}</span>
                                                    <button
                                                        onClick={() => {
                                                            const newAdults = Math.min(room.maxGuests, guests.adults + 1);
                                                            setGuests(g => ({ ...g, adults: newAdults }));
                                                            updateGuests(newAdults, guests.children, guests.rooms || 1);
                                                        }}
                                                        className="w-6 h-6 flex items-center justify-center text-neutral-500 hover:text-primary-500"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs text-neutral-500 mb-1">Children</p>
                                                <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2">
                                                    <button
                                                        onClick={() => {
                                                            const newChildren = Math.max(0, guests.children - 1);
                                                            setGuests(g => ({ ...g, children: newChildren }));
                                                            updateGuests(guests.adults, newChildren, guests.rooms || 1);
                                                        }}
                                                        className="w-6 h-6 flex items-center justify-center text-neutral-500 hover:text-primary-500"
                                                    >
                                                        -
                                                    </button>
                                                    <span>{guests.children}</span>
                                                    <button
                                                        onClick={() => {
                                                            const newChildren = Math.min(4, guests.children + 1);
                                                            setGuests(g => ({ ...g, children: newChildren }));
                                                            updateGuests(guests.adults, newChildren, guests.rooms || 1);
                                                        }}
                                                        className="w-6 h-6 flex items-center justify-center text-neutral-500 hover:text-primary-500"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Price Summary */}
                                {nights > 0 && (
                                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-neutral-600">
                                                ${room.price} × {nights} nights
                                            </span>
                                            <span className="font-medium">${totalPrice}</span>
                                        </div>
                                        <div className="flex justify-between mb-2 text-sm text-neutral-500">
                                            <span>Taxes & fees</span>
                                            <span>${Math.round(totalPrice * 0.12)}</span>
                                        </div>
                                        <div className="border-t border-gray-200 pt-2 mt-2">
                                            <div className="flex justify-between font-semibold text-lg">
                                                <span>Total</span>
                                                <span className="text-primary-600">
                                                    ${Math.round(totalPrice * 1.12)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Book Button */}
                                <button className="w-full btn-primary mb-4">
                                    Reserve Now
                                </button>

                                <p className="text-center text-sm text-neutral-500">
                                    You won't be charged yet
                                </p>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>

                {/* Similar Rooms */}
                {similarRooms.length > 0 && (
                    <section className="mt-16">
                        <AnimatedSection>
                            <h2 className="heading-md text-neutral-800 mb-8">Similar Rooms</h2>
                        </AnimatedSection>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {similarRooms.map((r, index) => (
                                <AnimatedSection key={r.id} delay={index * 0.1}>
                                    <Link to={`/rooms/${r.id}`} className="block group">
                                        <div className="card overflow-hidden">
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={r.image}
                                                    alt={r.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute top-4 right-4 bg-white/95 px-3 py-1 rounded-full">
                                                    <span className="font-semibold text-primary-600">${r.price}</span>
                                                    <span className="text-sm text-neutral-500">/night</span>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-heading font-semibold text-lg text-neutral-800">
                                                    {r.name}
                                                </h3>
                                                <p className="text-sm text-neutral-500 line-clamp-1">
                                                    {r.description}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </AnimatedSection>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default RoomDetails;
