import { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within BookingProvider');
    }
    return context;
};

export const BookingProvider = ({ children }) => {
    const [bookingData, setBookingData] = useState(() => {
        // Load from localStorage on initial mount
        const saved = localStorage.getItem('bookingData');
        if (saved) {
            const parsed = JSON.parse(saved);
            return {
                ...parsed,
                checkIn: parsed.checkIn ? new Date(parsed.checkIn) : null,
                checkOut: parsed.checkOut ? new Date(parsed.checkOut) : null,
            };
        }
        return {
            checkIn: null,
            checkOut: null,
            guests: { adults: 2, children: 0, rooms: 1 },
            roomType: '',
            selectedRoom: null,
            addons: [],
            totalPrice: 0,
        };
    });

    // Save to localStorage whenever bookingData changes
    useEffect(() => {
        localStorage.setItem('bookingData', JSON.stringify(bookingData));
    }, [bookingData]);

    const updateBooking = (data) => {
        setBookingData(prev => ({ ...prev, ...data }));
    };

    const updateDates = (checkIn, checkOut) => {
        setBookingData(prev => ({ ...prev, checkIn, checkOut }));
    };

    const updateGuests = (adults, children, rooms = 1) => {
        setBookingData(prev => ({
            ...prev,
            guests: { adults, children, rooms },
        }));
    };

    const selectRoom = (room) => {
        setBookingData(prev => ({ ...prev, selectedRoom: room }));
    };

    const addAddon = (addon) => {
        setBookingData(prev => ({
            ...prev,
            addons: [...prev.addons, addon],
        }));
    };

    const removeAddon = (addonId) => {
        setBookingData(prev => ({
            ...prev,
            addons: prev.addons.filter(a => a.id !== addonId),
        }));
    };

    const calculateTotal = () => {
        if (!bookingData.checkIn || !bookingData.checkOut || !bookingData.selectedRoom) {
            return 0;
        }
        const nights = Math.ceil(
            (bookingData.checkOut - bookingData.checkIn) / (1000 * 60 * 60 * 24)
        );
        const roomTotal = bookingData.selectedRoom.price * nights;
        const addonsTotal = bookingData.addons.reduce((sum, addon) => sum + addon.price, 0);
        const total = roomTotal + addonsTotal;
        setBookingData(prev => ({ ...prev, totalPrice: total }));
        return total;
    };

    const clearBooking = () => {
        const initial = {
            checkIn: null,
            checkOut: null,
            guests: { adults: 2, children: 0 },
            roomType: '',
            selectedRoom: null,
            addons: [],
            totalPrice: 0,
        };
        setBookingData(initial);
        localStorage.removeItem('bookingData');
    };

    const value = {
        bookingData,
        updateBooking,
        updateDates,
        updateGuests,
        selectRoom,
        addAddon,
        removeAddon,
        calculateTotal,
        clearBooking,
    };

    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    );
};

export default BookingContext;
