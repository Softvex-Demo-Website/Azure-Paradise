import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Utensils, Sparkles, Activity, Check, Plus, Minus,
    Calendar, ChevronRight, Gift, X, ArrowLeft
} from 'lucide-react';
import DatePicker from 'react-datepicker';
import AnimatedSection from '../components/ui/AnimatedSection';
import { restaurantsData } from '../data/restaurantsData';
import { activitiesData } from '../data/activitiesData';
import 'react-datepicker/dist/react-datepicker.css';

// Spa treatments data (inline since it's in the Spa page)
const treatments = [
    { id: 1, name: "Signature Maldivian Massage", duration: "90 min", price: 220, image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400" },
    { id: 2, name: "Ocean Stone Therapy", duration: "75 min", price: 180, image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400" },
    { id: 3, name: "Tropical Body Wrap", duration: "60 min", price: 150, image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400" },
    { id: 4, name: "Couples Harmony Ritual", duration: "120 min", price: 450, image: "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=400" },
    { id: 5, name: "Anti-Aging Facial", duration: "60 min", price: 160, image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400" },
    { id: 6, name: "Full Day Retreat", duration: "6 hours", price: 550, image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=400" }
];

const CustomPackage = () => {
    const [step, setStep] = useState(1);
    const [selectedDining, setSelectedDining] = useState([]);
    const [selectedSpa, setSelectedSpa] = useState([]);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [bookingModalOpen, setBookingModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: null,
        guests: 2,
        specialRequests: ''
    });
    const [submitStatus, setSubmitStatus] = useState('idle');

    // Calculate totals
    const diningTotal = selectedDining.reduce((sum, id) => {
        const item = restaurantsData.find(r => r.id === id);
        return sum + (item ? 100 : 0); // Base price per dining experience
    }, 0);

    const spaTotal = selectedSpa.reduce((sum, id) => {
        const item = treatments.find(t => t.id === id);
        return sum + (item?.price || 0);
    }, 0);

    const activitiesTotal = selectedActivities.reduce((sum, id) => {
        const item = activitiesData.find(a => a.id === id);
        return sum + (item?.price || 0);
    }, 0);

    const subtotal = diningTotal + spaTotal + activitiesTotal;
    const discount = subtotal > 500 ? Math.round(subtotal * 0.15) : subtotal > 300 ? Math.round(subtotal * 0.10) : 0;
    const total = subtotal - discount;

    const toggleSelection = (id, type) => {
        switch (type) {
            case 'dining':
                setSelectedDining(prev =>
                    prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
                );
                break;
            case 'spa':
                setSelectedSpa(prev =>
                    prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
                );
                break;
            case 'activities':
                setSelectedActivities(prev =>
                    prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
                );
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus('loading');
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmitStatus('success');
        setTimeout(() => {
            setBookingModalOpen(false);
            setSubmitStatus('idle');
        }, 2000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const totalSelections = selectedDining.length + selectedSpa.length + selectedActivities.length;

    return (
        <>
            {/* Booking Modal */}
            <AnimatePresence>
                {bookingModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setBookingModalOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        />
                        <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 overflow-y-auto">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="max-h-[85vh] overflow-y-auto">
                                    {/* Modal Header */}
                                    <div className="relative h-32 bg-gradient-to-r from-secondary-600 to-secondary-500">
                                        <button
                                            onClick={() => setBookingModalOpen(false)}
                                            className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                        <div className="absolute bottom-4 left-6 right-6 text-white">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Gift className="w-5 h-5" />
                                                <span className="font-medium">Your Custom Package</span>
                                            </div>
                                            <p className="text-2xl font-bold">${total} <span className="text-sm font-normal text-white/80">(Save ${discount})</span></p>
                                        </div>
                                    </div>

                                    {/* Summary */}
                                    <div className="p-6 border-b border-gray-100">
                                        <h4 className="font-semibold text-neutral-800 mb-3">Package Summary</h4>
                                        <div className="space-y-2 text-sm">
                                            {selectedDining.length > 0 && (
                                                <div className="flex items-center gap-2">
                                                    <Utensils className="w-4 h-4 text-amber-500" />
                                                    <span>{selectedDining.length} Dining Experience(s)</span>
                                                </div>
                                            )}
                                            {selectedSpa.length > 0 && (
                                                <div className="flex items-center gap-2">
                                                    <Sparkles className="w-4 h-4 text-purple-500" />
                                                    <span>{selectedSpa.length} Spa Treatment(s)</span>
                                                </div>
                                            )}
                                            {selectedActivities.length > 0 && (
                                                <div className="flex items-center gap-2">
                                                    <Activity className="w-4 h-4 text-blue-500" />
                                                    <span>{selectedActivities.length} Activity(s)</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Form */}
                                    <div className="p-6">
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-neutral-600 mb-1">Name *</label>
                                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input-field" placeholder="John Doe" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-neutral-600 mb-1">Email *</label>
                                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="input-field" placeholder="john@example.com" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-neutral-600 mb-1">Phone *</label>
                                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="input-field" placeholder="+1 234 567 890" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-neutral-600 mb-1">Guests *</label>
                                                    <select name="guests" value={formData.guests} onChange={handleChange} className="input-field">
                                                        {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-neutral-600 mb-1">Preferred Date *</label>
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
                                                <label className="block text-sm font-medium text-neutral-600 mb-1">Special Requests</label>
                                                <textarea name="specialRequests" value={formData.specialRequests} onChange={handleChange} rows={3} className="input-field resize-none" placeholder="Any special requirements..." />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={submitStatus !== 'idle'}
                                                className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${submitStatus === 'success' ? 'bg-green-500 text-white' : 'bg-secondary-500 hover:bg-secondary-600 text-white'
                                                    }`}
                                            >
                                                {submitStatus === 'loading' ? (
                                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                                                ) : submitStatus === 'success' ? (
                                                    <><Check className="w-5 h-5" /> Booking Confirmed!</>
                                                ) : (
                                                    <><Gift className="w-5 h-5" /> Book Custom Package - ${total}</>
                                                )}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>

            <div className="min-h-screen bg-gray-50">
                {/* Hero */}
                <section className="relative h-56 md:h-72 overflow-hidden bg-gradient-to-r from-secondary-600 to-primary-600">
                    <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                        <div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 mb-4">
                                <Gift className="w-8 h-8 text-white/80" />
                            </motion.div>
                            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="heading-xl text-white mb-2">
                                Build Your Perfect Package
                            </motion.h1>
                            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/80 max-w-xl mx-auto">
                                Select from dining, spa, and activities to create your personalized experience
                            </motion.p>
                        </div>
                    </div>
                </section>

                {/* Progress Steps */}
                <section className="bg-white border-b border-gray-100 sticky top-16 z-20">
                    <div className="container-custom">
                        <div className="flex items-center justify-center gap-2 py-4">
                            {[
                                { num: 1, label: 'Dining', icon: Utensils },
                                { num: 2, label: 'Spa', icon: Sparkles },
                                { num: 3, label: 'Activities', icon: Activity },
                                { num: 4, label: 'Review', icon: Check }
                            ].map((s, i) => (
                                <button
                                    key={s.num}
                                    onClick={() => setStep(s.num)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${step === s.num ? 'bg-primary-500 text-white' : step > s.num ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-neutral-500'
                                        }`}
                                >
                                    <s.icon className="w-4 h-4" />
                                    <span className="hidden md:inline">{s.label}</span>
                                    {step > s.num && <Check className="w-4 h-4" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="section-padding">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                <AnimatePresence mode="wait">
                                    {/* Step 1: Dining */}
                                    {step === 1 && (
                                        <motion.div key="dining" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                            <h2 className="heading-md text-neutral-800 mb-2">Select Dining Experiences</h2>
                                            <p className="text-neutral-600 mb-6">Choose restaurants for your perfect dining experience</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {restaurantsData.map(restaurant => (
                                                    <motion.div
                                                        key={restaurant.id}
                                                        whileHover={{ scale: 1.02 }}
                                                        onClick={() => toggleSelection(restaurant.id, 'dining')}
                                                        className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${selectedDining.includes(restaurant.id) ? 'border-primary-500 ring-2 ring-primary-200' : 'border-gray-200 hover:border-primary-300'
                                                            }`}
                                                    >
                                                        <div className="relative h-32">
                                                            <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
                                                            {selectedDining.includes(restaurant.id) && (
                                                                <div className="absolute top-2 right-2 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                                                                    <Check className="w-5 h-5 text-white" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="p-4">
                                                            <h4 className="font-semibold text-neutral-800">{restaurant.name}</h4>
                                                            <p className="text-sm text-neutral-500">{restaurant.cuisine}</p>
                                                            <p className="text-sm font-medium text-primary-600 mt-1">$100 per experience</p>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 2: Spa */}
                                    {step === 2 && (
                                        <motion.div key="spa" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                            <h2 className="heading-md text-neutral-800 mb-2">Select Spa Treatments</h2>
                                            <p className="text-neutral-600 mb-6">Add relaxing treatments to your package</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {treatments.map(treatment => (
                                                    <motion.div
                                                        key={treatment.id}
                                                        whileHover={{ scale: 1.02 }}
                                                        onClick={() => toggleSelection(treatment.id, 'spa')}
                                                        className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${selectedSpa.includes(treatment.id) ? 'border-purple-500 ring-2 ring-purple-200' : 'border-gray-200 hover:border-purple-300'
                                                            }`}
                                                    >
                                                        <div className="relative h-32">
                                                            <img src={treatment.image} alt={treatment.name} className="w-full h-full object-cover" />
                                                            {selectedSpa.includes(treatment.id) && (
                                                                <div className="absolute top-2 right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                                                    <Check className="w-5 h-5 text-white" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="p-4">
                                                            <h4 className="font-semibold text-neutral-800">{treatment.name}</h4>
                                                            <p className="text-sm text-neutral-500">{treatment.duration}</p>
                                                            <p className="text-sm font-medium text-purple-600 mt-1">${treatment.price}</p>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 3: Activities */}
                                    {step === 3 && (
                                        <motion.div key="activities" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                            <h2 className="heading-md text-neutral-800 mb-2">Select Activities</h2>
                                            <p className="text-neutral-600 mb-6">Choose adventures for your package</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {activitiesData.slice(0, 8).map(activity => (
                                                    <motion.div
                                                        key={activity.id}
                                                        whileHover={{ scale: 1.02 }}
                                                        onClick={() => toggleSelection(activity.id, 'activities')}
                                                        className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${selectedActivities.includes(activity.id) ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300'
                                                            }`}
                                                    >
                                                        <div className="relative h-32">
                                                            <img src={activity.image} alt={activity.name} className="w-full h-full object-cover" />
                                                            {selectedActivities.includes(activity.id) && (
                                                                <div className="absolute top-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                                                    <Check className="w-5 h-5 text-white" />
                                                                </div>
                                                            )}
                                                            <div className="absolute top-2 left-2 bg-white/90 text-xs font-medium px-2 py-1 rounded capitalize">{activity.category}</div>
                                                        </div>
                                                        <div className="p-4">
                                                            <h4 className="font-semibold text-neutral-800">{activity.name}</h4>
                                                            <p className="text-sm text-neutral-500">{activity.duration}</p>
                                                            <p className="text-sm font-medium text-blue-600 mt-1">${activity.price}</p>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 4: Review */}
                                    {step === 4 && (
                                        <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                            <h2 className="heading-md text-neutral-800 mb-2">Review Your Package</h2>
                                            <p className="text-neutral-600 mb-6">Confirm your selections before booking</p>

                                            <div className="space-y-6">
                                                {selectedDining.length > 0 && (
                                                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                                                        <h3 className="font-semibold text-neutral-800 mb-4 flex items-center gap-2">
                                                            <Utensils className="w-5 h-5 text-amber-500" /> Dining ({selectedDining.length})
                                                        </h3>
                                                        <div className="space-y-3">
                                                            {selectedDining.map(id => {
                                                                const r = restaurantsData.find(x => x.id === id);
                                                                return r && (
                                                                    <div key={id} className="flex items-center justify-between">
                                                                        <span>{r.name}</span>
                                                                        <span className="font-medium">$100</span>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                )}

                                                {selectedSpa.length > 0 && (
                                                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                                                        <h3 className="font-semibold text-neutral-800 mb-4 flex items-center gap-2">
                                                            <Sparkles className="w-5 h-5 text-purple-500" /> Spa ({selectedSpa.length})
                                                        </h3>
                                                        <div className="space-y-3">
                                                            {selectedSpa.map(id => {
                                                                const t = treatments.find(x => x.id === id);
                                                                return t && (
                                                                    <div key={id} className="flex items-center justify-between">
                                                                        <span>{t.name}</span>
                                                                        <span className="font-medium">${t.price}</span>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                )}

                                                {selectedActivities.length > 0 && (
                                                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                                                        <h3 className="font-semibold text-neutral-800 mb-4 flex items-center gap-2">
                                                            <Activity className="w-5 h-5 text-blue-500" /> Activities ({selectedActivities.length})
                                                        </h3>
                                                        <div className="space-y-3">
                                                            {selectedActivities.map(id => {
                                                                const a = activitiesData.find(x => x.id === id);
                                                                return a && (
                                                                    <div key={id} className="flex items-center justify-between">
                                                                        <span>{a.name}</span>
                                                                        <span className="font-medium">${a.price}</span>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                )}

                                                {totalSelections === 0 && (
                                                    <div className="text-center py-12 text-neutral-500">
                                                        <Gift className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                                        <p>No items selected. Go back and add some experiences!</p>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Navigation Buttons */}
                                <div className="flex justify-between mt-8">
                                    <button
                                        onClick={() => setStep(Math.max(1, step - 1))}
                                        disabled={step === 1}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${step === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-neutral-700 hover:bg-gray-300'
                                            }`}
                                    >
                                        <ArrowLeft className="w-4 h-4" /> Back
                                    </button>
                                    {step < 4 ? (
                                        <button
                                            onClick={() => setStep(step + 1)}
                                            className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-all"
                                        >
                                            Continue <ChevronRight className="w-4 h-4" />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setBookingModalOpen(true)}
                                            disabled={totalSelections === 0}
                                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${totalSelections === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-secondary-500 text-white hover:bg-secondary-600'
                                                }`}
                                        >
                                            <Gift className="w-4 h-4" /> Book Package - ${total}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Sidebar - Package Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-40">
                                    <h3 className="font-heading text-xl font-bold text-neutral-800 mb-4">Your Package</h3>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center gap-2 text-neutral-600">
                                                <Utensils className="w-4 h-4 text-amber-500" /> Dining
                                            </span>
                                            <span className="font-medium">{selectedDining.length} selected</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center gap-2 text-neutral-600">
                                                <Sparkles className="w-4 h-4 text-purple-500" /> Spa
                                            </span>
                                            <span className="font-medium">{selectedSpa.length} selected</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center gap-2 text-neutral-600">
                                                <Activity className="w-4 h-4 text-blue-500" /> Activities
                                            </span>
                                            <span className="font-medium">{selectedActivities.length} selected</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 pt-4 space-y-2">
                                        <div className="flex justify-between text-neutral-600">
                                            <span>Subtotal</span>
                                            <span>${subtotal}</span>
                                        </div>
                                        {discount > 0 && (
                                            <div className="flex justify-between text-green-600">
                                                <span>Bundle Discount</span>
                                                <span>-${discount}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-xl font-bold text-neutral-800 pt-2 border-t border-gray-100">
                                            <span>Total</span>
                                            <span>${total}</span>
                                        </div>
                                    </div>

                                    {discount > 0 && (
                                        <div className="mt-4 bg-green-50 text-green-700 text-sm p-3 rounded-lg">
                                            🎉 You're saving ${discount} with bundle pricing!
                                        </div>
                                    )}

                                    {subtotal > 0 && subtotal < 300 && (
                                        <div className="mt-4 bg-amber-50 text-amber-700 text-sm p-3 rounded-lg">
                                            💡 Add ${300 - subtotal} more to unlock 10% discount!
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default CustomPackage;
