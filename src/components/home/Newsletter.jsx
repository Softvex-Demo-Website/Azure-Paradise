import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [errorMessage, setErrorMessage] = useState('');

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setStatus('error');
            setErrorMessage('Please enter your email address');
            return;
        }

        if (!validateEmail(email)) {
            setStatus('error');
            setErrorMessage('Please enter a valid email address');
            return;
        }

        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setEmail('');
            // Reset after 3 seconds
            setTimeout(() => setStatus('idle'), 3000);
        }, 1000);
    };

    return (
        <section className="relative py-20 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920"
                    alt="Beautiful beach sunset"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary-600/85" />
            </div>

            <div className="container-custom relative z-10">
                <div className="max-w-2xl mx-auto text-center">
                    <AnimatedSection>
                        <h2 className="heading-lg text-white mb-4">
                            Stay Updated with Exclusive Offers
                        </h2>
                        <p className="text-white/80 mb-8">
                            Subscribe to our newsletter and be the first to know about special
                            promotions, new experiences, and insider tips for your perfect getaway.
                        </p>
                    </AnimatedSection>

                    <AnimatedSection delay={0.2}>
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-grow relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (status === 'error') setStatus('idle');
                                    }}
                                    placeholder="Enter your email address"
                                    className={`w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border-2 
                    ${status === 'error' ? 'border-red-400' : 'border-white/30'} 
                    text-white placeholder:text-white/60 focus:outline-none focus:border-white transition-colors`}
                                    disabled={status === 'loading' || status === 'success'}
                                />
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
                                whileTap={{ scale: status === 'idle' ? 0.98 : 1 }}
                                disabled={status === 'loading' || status === 'success'}
                                className={`px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all
                  ${status === 'success'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-secondary-500 hover:bg-secondary-600 text-white'
                                    }`}
                            >
                                {status === 'loading' ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                    />
                                ) : status === 'success' ? (
                                    <>
                                        <Check className="w-5 h-5" />
                                        Subscribed!
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Subscribe
                                    </>
                                )}
                            </motion.button>
                        </form>

                        {/* Error Message */}
                        {status === 'error' && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-300 text-sm mt-3"
                            >
                                {errorMessage}
                            </motion.p>
                        )}

                        {/* Success Message */}
                        {status === 'success' && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-green-300 text-sm mt-3"
                            >
                                Thank you for subscribing! Check your inbox for a welcome surprise.
                            </motion.p>
                        )}
                    </AnimatedSection>

                    {/* Privacy Note */}
                    <AnimatedSection delay={0.3}>
                        <p className="text-white/50 text-sm mt-6">
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
