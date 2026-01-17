import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Waves,
    MapPin,
    Phone,
    Mail,
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    ArrowUp,
    Send
} from 'lucide-react';
import { useState } from 'react';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail('');
            setTimeout(() => setIsSubscribed(false), 3000);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const quickLinks = [
        { name: 'About Us', path: '/about' },
        { name: 'Rooms & Suites', path: '/rooms' },
        { name: 'Dining', path: '/dining' },
        { name: 'Spa & Wellness', path: '/spa' },
        { name: 'Activities', path: '/activities' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Contact', path: '/contact' },
    ];

    const policies = [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms & Conditions', path: '/terms' },
        { name: 'Cancellation Policy', path: '/cancellation' },
        { name: 'FAQ', path: '/faq' },
    ];

    return (
        <footer className="bg-neutral-500 text-white">
            {/* Main Footer */}
            <div className="container-custom py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* About Column */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <Waves className="w-8 h-8 text-secondary-400" />
                            <span className="font-heading text-2xl font-bold">Azure Paradise</span>
                        </Link>
                        <p className="text-white/70 mb-6 leading-relaxed">
                            Experience the ultimate beachfront luxury at Azure Paradise Resort.
                            Where turquoise waters meet golden sands and exceptional hospitality
                            creates unforgettable memories.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { Icon: Facebook, href: '#' },
                                { Icon: Instagram, href: '#' },
                                { Icon: Twitter, href: '#' },
                                { Icon: Youtube, href: '#' },
                            ].map(({ Icon, href }, index) => (
                                <motion.a
                                    key={index}
                                    href={href}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary-500 transition-colors"
                                >
                                    <Icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-heading text-xl font-semibold mb-6 text-white">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-white/70 hover:text-secondary-400 transition-colors inline-block"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-heading text-xl font-semibold mb-6 text-white">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-secondary-400 mt-1 flex-shrink-0" />
                                <span className="text-white/70">
                                    123 Paradise Beach Road,<br />
                                    Maldives Islands, 20026
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-secondary-400 flex-shrink-0" />
                                <a href="tel:+1234567890" className="text-white/70 hover:text-secondary-400 transition-colors">
                                    +1 (234) 567-890
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-secondary-400 flex-shrink-0" />
                                <a href="mailto:info@azureparadise.com" className="text-white/70 hover:text-secondary-400 transition-colors">
                                    info@azureparadise.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-heading text-xl font-semibold mb-6 text-white">Newsletter</h4>
                        <p className="text-white/70 mb-4">
                            Subscribe to receive special offers and exclusive updates.
                        </p>
                        <form onSubmit={handleSubscribe} className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email address"
                                className="w-full py-3 px-4 pr-12 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-secondary-400 transition-colors"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-secondary-400 hover:text-secondary-300 transition-colors"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                        {isSubscribed && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-green-400 text-sm mt-2"
                            >
                                Thank you for subscribing!
                            </motion.p>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container-custom py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-white/60 text-sm text-center md:text-left">
                            © 2026 Azure Paradise Resort. All rights reserved.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            {policies.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="text-white/60 hover:text-white transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-6 right-6 w-12 h-12 bg-secondary-500 hover:bg-secondary-600 text-white rounded-full shadow-lg flex items-center justify-center z-40"
            >
                <ArrowUp className="w-5 h-5" />
            </motion.button>
        </footer>
    );
};

export default Footer;
