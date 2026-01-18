import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Calendar, Check, Sparkles } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SpaBookingModal = ({ treatment, isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: null,
        time: '',
        guests: 1,
        specialRequests: ''
    });
    const [submitStatus, setSubmitStatus] = useState('idle');

    if (!treatment) return null;

    // Generate time slots for spa (10 AM - 7 PM)
    const generateTimeSlots = () => {
        const slots = [];
        for (let h = 10; h <= 18; h++) {
            slots.push(`${h}:00`);
            if (h < 18) slots.push(`${h}:30`);
        }
        return slots;
    };

    const timeSlots = generateTimeSlots();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus('loading');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setSubmitStatus('success');
        setTimeout(() => {
            setSubmitStatus('idle');
            setFormData({
                name: '',
                email: '',
                phone: '',
                date: null,
                time: '',
                guests: 1,
                specialRequests: ''
            });
            onClose();
        }, 2000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal Container - Flexbox centered */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="max-h-[85vh] overflow-y-auto">
                                {/* Header with Treatment Image */}
                                <div className="relative h-48 md:h-56">
                                    <img
                                        src={treatment.image}
                                        alt={treatment.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                                    {/* Close Button */}
                                    <button
                                        onClick={onClose}
                                        className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>

                                    {/* Treatment Info Overlay */}
                                    <div className="absolute bottom-4 left-4 right-4 text-white">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Sparkles className="w-5 h-5 text-secondary-400" />
                                            <span className="text-secondary-400 font-medium">Spa Treatment</span>
                                        </div>
                                        <h2 className="font-heading text-2xl md:text-3xl font-bold">
                                            {treatment.name}
                                        </h2>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 md:p-8">
                                    {/* Treatment Details */}
                                    <div className="flex flex-wrap items-center gap-6 mb-6 pb-6 border-b border-gray-100">
                                        <div className="flex items-center gap-2 text-neutral-600">
                                            <Clock className="w-5 h-5 text-primary-500" />
                                            <span className="font-medium">{treatment.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-bold text-primary-600">${treatment.price}</span>
                                            <span className="text-neutral-500">per person</span>
                                        </div>
                                    </div>

                                    <p className="text-neutral-600 mb-6 text-lg">{treatment.description}</p>

                                    {/* Booking Form */}
                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <h3 className="font-heading text-xl font-bold text-neutral-800 mb-4 flex items-center gap-2">
                                            <Calendar className="w-5 h-5 text-primary-500" />
                                            Book This Treatment
                                        </h3>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-neutral-600 mb-1">
                                                        Your Name *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                        className="input-field"
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-neutral-600 mb-1">
                                                        Email *
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                        className="input-field"
                                                        placeholder="john@example.com"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-neutral-600 mb-1">
                                                        Phone *
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        required
                                                        className="input-field"
                                                        placeholder="+1 234 567 890"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-neutral-600 mb-1">
                                                        Number of Guests *
                                                    </label>
                                                    <select
                                                        name="guests"
                                                        value={formData.guests}
                                                        onChange={handleChange}
                                                        required
                                                        className="input-field"
                                                    >
                                                        {[1, 2, 3, 4].map(num => (
                                                            <option key={num} value={num}>
                                                                {num} {num === 1 ? 'Guest' : 'Guests'}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-neutral-600 mb-1">
                                                        Preferred Date *
                                                    </label>
                                                    <DatePicker
                                                        selected={formData.date}
                                                        onChange={(date) => setFormData(prev => ({ ...prev, date }))}
                                                        minDate={new Date()}
                                                        dateFormat="MMMM d, yyyy"
                                                        placeholderText="Select date"
                                                        className="input-field w-full"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-neutral-600 mb-1">
                                                        Preferred Time *
                                                    </label>
                                                    <select
                                                        name="time"
                                                        value={formData.time}
                                                        onChange={handleChange}
                                                        required
                                                        className="input-field"
                                                    >
                                                        <option value="">Select time</option>
                                                        {timeSlots.map(slot => (
                                                            <option key={slot} value={slot}>{slot}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-neutral-600 mb-1">
                                                    Special Requests / Health Conditions
                                                </label>
                                                <textarea
                                                    name="specialRequests"
                                                    value={formData.specialRequests}
                                                    onChange={handleChange}
                                                    rows={3}
                                                    className="input-field resize-none"
                                                    placeholder="Any allergies, injuries, pregnancy, or preferences we should know about..."
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={submitStatus === 'loading' || submitStatus === 'success'}
                                                className={`w-full h-auto min-h-[3rem] py-3 rounded-lg font-semibold relative flex items-center justify-center gap-2 transition-all whitespace-normal text-center ${submitStatus === 'success'
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-primary-500 hover:bg-primary-600 text-white'
                                                    }`}
                                            >
                                                {submitStatus === 'loading' ? (
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                                    />
                                                ) : submitStatus === 'success' ? (
                                                    <>
                                                        <Check className="w-5 h-5" />
                                                        Booking Confirmed!
                                                    </>
                                                ) : (
                                                    <>
                                                        <Sparkles className="w-5 h-5 absolute left-4" />
                                                        <span>Book Treatment</span>
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SpaBookingModal;
