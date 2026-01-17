import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* 404 Number */}
                    <motion.h1
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="text-9xl md:text-[12rem] font-bold text-primary-500/20 leading-none mb-4"
                    >
                        404
                    </motion.h1>

                    {/* Message */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-800 mb-4">
                            Page Not Found
                        </h2>
                        <p className="text-neutral-600 text-lg mb-8 max-w-md mx-auto">
                            Sorry, we couldn't find the page you're looking for.
                            Perhaps you've mistyped the URL or the page has been moved.
                        </p>
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link
                            to="/"
                            className="flex items-center gap-2 px-8 py-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-semibold"
                        >
                            <Home className="w-5 h-5" />
                            Go to Homepage
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center gap-2 px-8 py-4 bg-white text-neutral-800 rounded-lg hover:bg-gray-100 transition-colors font-semibold border border-gray-200"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Go Back
                        </button>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-12 pt-8 border-t border-gray-200"
                    >
                        <p className="text-sm text-neutral-500 mb-4">Quick Links:</p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            {[
                                { name: 'Rooms', path: '/rooms' },
                                { name: 'Dining', path: '/dining' },
                                { name: 'Spa', path: '/spa' },
                                { name: 'Activities', path: '/activities' },
                                { name: 'Contact', path: '/contact' }
                            ].map(link => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="text-primary-600 hover:text-primary-700 hover:underline"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound;
