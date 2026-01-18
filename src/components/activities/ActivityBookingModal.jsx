import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Users, Calendar, Check, MapPin } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ActivityBookingModal = ({ activity, isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: null,
        time: '',
        participants: 1,
        specialRequests: ''
    });
    const [submitStatus, setSubmitStatus] = useState('idle');

    if (!activity) return null;

    // Parse schedule to get time slots
    const getTimeSlots = () => {
        const schedule = activity.schedule;
        // Extract times from schedule string
        const timePattern = /(\d{1,2}:\d{2}\s*(?:AM|PM))/gi;
        const matches = schedule.match(timePattern);
        if (matches && matches.length > 0) {
            return matches;
        }
        // Default times if can't parse
        return ['9:00 AM', '2:00 PM', '4:00 PM'];
    };

    const timeSlots = getTimeSlots();

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
                participants: 1,
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

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="max-h-[85vh] overflow-y-auto">
                                {/* Header with Activity Image */}
                                <div className="relative h-48 md:h-56">
                                    <img
                                        src={activity.image}
                                        alt={activity.name}
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

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4 bg-primary-500 text-white text-sm font-semibold px-3 py-1 rounded-full capitalize">
                                        {activity.category}
                                    </div>

                                    {/* Price Badge */}
                                    <div className="absolute top-4 left-24 bg-white text-primary-600 font-bold px-3 py-1 rounded-full text-sm">
                                        ${activity.price} per person
                                    </div>

                                    {/* Activity Info Overlay */}
                                    <div className="absolute bottom-4 left-4 right-4 text-white">
                                        <h2 className="font-heading text-2xl md:text-3xl font-bold">
                                            {activity.name}
                                        </h2>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 md:p-8">
                                    {/* Activity Details */}
                                    <div className="flex flex-wrap items-center gap-6 mb-6 pb-6 border-b border-gray-100">
                                        <div className="flex items-center gap-2 text-neutral-600">
                                            <Clock className="w-5 h-5 text-primary-500" />
                                            <span className="font-medium">{activity.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-neutral-600">
                                            <Users className="w-5 h-5 text-primary-500" />
                                            <span className="font-medium">{activity.difficulty}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-neutral-600">
                                            <MapPin className="w-5 h-5 text-primary-500" />
                                            <span className="font-medium">{activity.schedule}</span>
                                        </div>
                                    </div>

                                    <p className="text-neutral-600 mb-6 text-lg">{activity.description}</p>

                                    {/* What's Included */}
                                    <div className="mb-6">
                                        <h4 className="font-semibold text-neutral-800 mb-3">What's Included:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {activity.includes.map((item, i) => (
                                                <span
                                                    key={i}
                                                    className="flex items-center gap-1 text-sm bg-primary-50 text-primary-600 px-3 py-1.5 rounded-full"
                                                >
                                                    <Check className="w-3 h-3" />
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Booking Form */}
                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <h3 className="font-heading text-xl font-bold text-neutral-800 mb-4 flex items-center gap-2">
                                            <Calendar className="w-5 h-5 text-primary-500" />
                                            Book This Activity
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
                                                        Number of Participants *
                                                    </label>
                                                    <select
                                                        name="participants"
                                                        value={formData.participants}
                                                        onChange={handleChange}
                                                        required
                                                        className="input-field"
                                                    >
                                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                                            <option key={num} value={num}>
                                                                {num} {num === 1 ? 'Person' : 'People'} - ${activity.price * num}
                                                            </option>
                                                        ))}
                                                        <option value="group">Group (10+) - Contact for pricing</option>
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
                                                    Special Requests / Requirements
                                                </label>
                                                <textarea
                                                    name="specialRequests"
                                                    value={formData.specialRequests}
                                                    onChange={handleChange}
                                                    rows={3}
                                                    className="input-field resize-none"
                                                    placeholder="Any special requirements, skill level, or preferences..."
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
                                                        <Check className="w-5 h-5 flex-shrink-0" />
                                                        <span>Booking Confirmed!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Calendar className="w-5 h-5 absolute left-4" />
                                                        <span>Book Activity</span>
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

export default ActivityBookingModal;
