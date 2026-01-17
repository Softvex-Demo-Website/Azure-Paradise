import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, ChevronDown, Check } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import { restaurantsData } from '../data/restaurantsData';

const faqs = [
    {
        question: "What is the check-in and check-out time?",
        answer: "Check-in is from 2:00 PM and check-out is by 11:00 AM. Early check-in and late check-out can be arranged subject to availability."
    },
    {
        question: "Is airport transfer included?",
        answer: "Airport transfer is included for selected villa categories. For other rooms, we offer speedboat and seaplane transfers at additional cost."
    },
    {
        question: "Are children welcome at the resort?",
        answer: "Absolutely! We welcome guests of all ages. Our Kids Club offers supervised activities for children aged 4-12, and babysitting services are available."
    },
    {
        question: "What water sports are available?",
        answer: "We offer snorkeling, scuba diving, jet skiing, parasailing, kayaking, stand-up paddleboarding, and more. Equipment and lessons are available."
    },
    {
        question: "Is the resort all-inclusive?",
        answer: "We offer various meal plans including all-inclusive. Please contact us for package details and customization options."
    }
];

const Contact = () => {
    const [searchParams] = useSearchParams();
    const [expandedFaq, setExpandedFaq] = useState(null);
    const [submitStatus, setSubmitStatus] = useState('idle');
    const [showRestaurantField, setShowRestaurantField] = useState(false);

    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();

    // Watch subject to show/hide restaurant dropdown
    const watchSubject = watch('subject');

    // Pre-fill subject and restaurant from URL query parameters
    useEffect(() => {
        const subject = searchParams.get('subject');
        const restaurant = searchParams.get('restaurant');

        if (subject) {
            setValue('subject', subject);
            if (subject === 'restaurant-reservation') {
                setShowRestaurantField(true);
            }
        }
        if (restaurant) {
            setValue('restaurant', restaurant);
        }
    }, [searchParams, setValue]);

    // Show restaurant field when subject is restaurant-reservation
    useEffect(() => {
        if (watchSubject === 'restaurant-reservation') {
            setShowRestaurantField(true);
        } else {
            setShowRestaurantField(false);
        }
    }, [watchSubject]);

    const onSubmit = async (data) => {
        setSubmitStatus('loading');
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmitStatus('success');
        reset();
        setShowRestaurantField(false);
        setTimeout(() => setSubmitStatus('idle'), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Banner */}
            <section className="relative h-72 md:h-96 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920"
                    alt="Contact us"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
                <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="heading-xl text-white mb-4"
                        >
                            Contact Us
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-white/90 text-lg max-w-2xl"
                        >
                            We're here to help make your stay unforgettable
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Contact Info & Form */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Contact Information */}
                        <div className="lg:col-span-1">
                            <AnimatedSection>
                                <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
                                    <h2 className="font-heading text-2xl font-bold text-neutral-800 mb-6">
                                        Get in Touch
                                    </h2>

                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-5 h-5 text-primary-500" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-neutral-800 mb-1">Location</h3>
                                                <p className="text-neutral-600 text-sm">
                                                    123 Paradise Beach Road<br />
                                                    North Male Atoll<br />
                                                    Maldives, 20026
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Phone className="w-5 h-5 text-primary-500" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-neutral-800 mb-1">Phone</h3>
                                                <p className="text-neutral-600 text-sm">
                                                    +1 (234) 567-890<br />
                                                    +960 123-4567
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Mail className="w-5 h-5 text-primary-500" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-neutral-800 mb-1">Email</h3>
                                                <p className="text-neutral-600 text-sm">
                                                    info@azureparadise.com<br />
                                                    reservations@azureparadise.com
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Clock className="w-5 h-5 text-primary-500" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-neutral-800 mb-1">Reservation Hours</h3>
                                                <p className="text-neutral-600 text-sm">
                                                    24/7 Available<br />
                                                    Response within 24 hours
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <AnimatedSection delay={0.1}>
                                <div className="bg-white rounded-2xl p-8 shadow-lg">
                                    <h2 className="font-heading text-2xl font-bold text-neutral-800 mb-6">
                                        Send Us a Message
                                    </h2>

                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-neutral-600 mb-2">
                                                    First Name *
                                                </label>
                                                <input
                                                    {...register("firstName", { required: "First name is required" })}
                                                    className={`input-field ${errors.firstName ? 'border-red-400' : ''}`}
                                                    placeholder="John"
                                                />
                                                {errors.firstName && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-neutral-600 mb-2">
                                                    Last Name *
                                                </label>
                                                <input
                                                    {...register("lastName", { required: "Last name is required" })}
                                                    className={`input-field ${errors.lastName ? 'border-red-400' : ''}`}
                                                    placeholder="Doe"
                                                />
                                                {errors.lastName && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-neutral-600 mb-2">
                                                    Email *
                                                </label>
                                                <input
                                                    type="email"
                                                    {...register("email", {
                                                        required: "Email is required",
                                                        pattern: {
                                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                            message: "Invalid email address"
                                                        }
                                                    })}
                                                    className={`input-field ${errors.email ? 'border-red-400' : ''}`}
                                                    placeholder="john@example.com"
                                                />
                                                {errors.email && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-neutral-600 mb-2">
                                                    Phone
                                                </label>
                                                <input
                                                    type="tel"
                                                    {...register("phone")}
                                                    className="input-field"
                                                    placeholder="+1 (234) 567-890"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-neutral-600 mb-2">
                                                Subject *
                                            </label>
                                            <select
                                                {...register("subject", { required: "Please select a subject" })}
                                                className={`input-field ${errors.subject ? 'border-red-400' : ''}`}
                                            >
                                                <option value="">Select a subject</option>
                                                <option value="reservation">Room Reservation Inquiry</option>
                                                <option value="restaurant-reservation">Restaurant Table Reservation</option>
                                                <option value="spa-treatment">Spa Treatment Booking</option>
                                                <option value="activity-booking">Activity Booking</option>
                                                <option value="concierge">Concierge Services</option>
                                                <option value="special-request">Special Request</option>
                                                <option value="feedback">Feedback</option>
                                                <option value="other">Other</option>
                                            </select>
                                            {errors.subject && (
                                                <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                                            )}
                                        </div>

                                        {/* Restaurant Selection - Shows when restaurant reservation is selected */}
                                        {showRestaurantField && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                            >
                                                <label className="block text-sm font-medium text-neutral-600 mb-2">
                                                    Select Restaurant *
                                                </label>
                                                <select
                                                    {...register("restaurant", { required: showRestaurantField ? "Please select a restaurant" : false })}
                                                    className={`input-field ${errors.restaurant ? 'border-red-400' : ''}`}
                                                >
                                                    <option value="">Choose a restaurant</option>
                                                    {restaurantsData.map((restaurant) => (
                                                        <option key={restaurant.id} value={restaurant.name}>
                                                            {restaurant.name} - {restaurant.cuisine}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.restaurant && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.restaurant.message}</p>
                                                )}
                                            </motion.div>
                                        )}

                                        <div>
                                            <label className="block text-sm font-medium text-neutral-600 mb-2">
                                                Message *
                                            </label>
                                            <textarea
                                                {...register("message", { required: "Message is required" })}
                                                rows={5}
                                                className={`input-field resize-none ${errors.message ? 'border-red-400' : ''}`}
                                                placeholder="How can we help you?"
                                            />
                                            {errors.message && (
                                                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={submitStatus === 'loading' || submitStatus === 'success'}
                                            className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${submitStatus === 'success'
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
                                                    Message Sent!
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5" />
                                                    Send Message
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <AnimatedSection className="text-center mb-8">
                        <h2 className="heading-md text-neutral-800 mb-4">Find Us</h2>
                        <p className="text-neutral-600">Located in the heart of the Maldives</p>
                    </AnimatedSection>
                    <AnimatedSection delay={0.1}>
                        <div className="rounded-2xl overflow-hidden shadow-lg h-96">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255282.09937265636!2d73.36729595!3d4.1755391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b3f7e8e1e8e1e8e%3A0x0!2sMaldives!5e0!3m2!1sen!2s!4v1600000000000!5m2!1sen!2s"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Resort Location"
                            />
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom max-w-3xl">
                    <AnimatedSection className="text-center mb-12">
                        <p className="text-secondary-500 font-medium tracking-wider mb-3 uppercase">
                            Common Questions
                        </p>
                        <h2 className="heading-lg text-neutral-800 mb-4">
                            Frequently Asked Questions
                        </h2>
                    </AnimatedSection>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <AnimatedSection key={index} delay={index * 0.05}>
                                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                    <button
                                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                        className="w-full flex items-center justify-between p-6 text-left"
                                    >
                                        <span className="font-semibold text-neutral-800 pr-4">
                                            {faq.question}
                                        </span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform ${expandedFaq === index ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>
                                    {expandedFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            className="px-6 pb-6"
                                        >
                                            <p className="text-neutral-600 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
