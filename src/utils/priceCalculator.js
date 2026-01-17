/**
 * Price calculation utilities for booking
 */

const TAX_RATE = 0.12; // 12% taxes and fees
const SERVICE_CHARGE = 0.10; // 10% service charge

export const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;
    return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
};

export const calculateRoomTotal = (pricePerNight, nights) => {
    return pricePerNight * nights;
};

export const calculateTaxes = (subtotal) => {
    return Math.round(subtotal * TAX_RATE);
};

export const calculateServiceCharge = (subtotal) => {
    return Math.round(subtotal * SERVICE_CHARGE);
};

export const calculateGrandTotal = (bookingData) => {
    const { selectedRoom, checkIn, checkOut, addons = [] } = bookingData;

    if (!selectedRoom || !checkIn || !checkOut) {
        return { subtotal: 0, taxes: 0, serviceCharge: 0, addonsTotal: 0, grandTotal: 0, nights: 0 };
    }

    const nights = calculateNights(checkIn, checkOut);
    const roomTotal = calculateRoomTotal(selectedRoom.price, nights);
    const addonsTotal = addons.reduce((sum, addon) => sum + addon.price, 0);
    const subtotal = roomTotal + addonsTotal;
    const taxes = calculateTaxes(subtotal);
    const serviceCharge = calculateServiceCharge(subtotal);
    const grandTotal = subtotal + taxes + serviceCharge;

    return {
        nights,
        roomTotal,
        addonsTotal,
        subtotal,
        taxes,
        serviceCharge,
        grandTotal
    };
};

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

export default {
    calculateNights,
    calculateRoomTotal,
    calculateTaxes,
    calculateServiceCharge,
    calculateGrandTotal,
    formatCurrency
};
