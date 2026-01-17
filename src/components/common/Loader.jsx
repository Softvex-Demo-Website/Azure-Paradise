import { motion } from 'framer-motion';

const Loader = ({ size = 'md', color = 'primary' }) => {
    const sizes = {
        sm: 'w-6 h-6',
        md: 'w-10 h-10',
        lg: 'w-16 h-16',
    };

    const colors = {
        primary: 'border-primary-500',
        secondary: 'border-secondary-500',
        white: 'border-white',
    };

    return (
        <div className="flex items-center justify-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className={`${sizes[size]} border-4 ${colors[color]} border-t-transparent rounded-full`}
            />
        </div>
    );
};

// Full page loader
export const PageLoader = () => {
    return (
        <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="text-center">
                <Loader size="lg" />
                <p className="mt-4 text-neutral-600 font-medium">Loading...</p>
            </div>
        </div>
    );
};

// Skeleton loader for cards
export const CardSkeleton = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-48 bg-gray-200 animate-pulse" />
            <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-3 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-5/6" />
                <div className="flex gap-2 pt-2">
                    <div className="h-8 bg-gray-200 rounded animate-pulse flex-1" />
                    <div className="h-8 bg-gray-200 rounded animate-pulse flex-1" />
                </div>
            </div>
        </div>
    );
};

export default Loader;
