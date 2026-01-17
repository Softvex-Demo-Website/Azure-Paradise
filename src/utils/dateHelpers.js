/**
 * Date helper utilities for booking functionality
 */

export const formatDate = (date) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).format(date);
};

export const formatShortDate = (date) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric'
    }).format(date);
};

export const getDaysBetween = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

export const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

export const isValidDateRange = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return false;
    return checkOut > checkIn;
};

export const getMinCheckoutDate = (checkInDate) => {
    if (!checkInDate) return new Date();
    return addDays(checkInDate, 1);
};

export default {
    formatDate,
    formatShortDate,
    getDaysBetween,
    addDays,
    isValidDateRange,
    getMinCheckoutDate
};
