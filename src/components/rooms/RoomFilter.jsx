import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, SlidersHorizontal, ChevronDown } from 'lucide-react';

const RoomFilter = ({ filters, onFilterChange, onReset, isOpen, onToggle }) => {
    const [localFilters, setLocalFilters] = useState(filters);
    const [expandedSections, setExpandedSections] = useState({
        price: true,
        type: true,
        view: true,
        guests: true,
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleLocalChange = (key, value) => {
        setLocalFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleApply = () => {
        onFilterChange(localFilters);
        if (window.innerWidth < 1024) onToggle();
    };

    const handleReset = () => {
        const resetFilters = {
            priceRange: [0, 2000],
            roomTypes: [],
            viewTypes: [],
            minGuests: 1,
        };
        setLocalFilters(resetFilters);
        onReset();
    };

    const roomTypes = [
        { value: 'suite', label: 'Suite' },
        { value: 'villa', label: 'Villa' },
        { value: 'bungalow', label: 'Bungalow' },
    ];

    const viewTypes = [
        { value: 'ocean', label: 'Ocean View' },
        { value: 'garden', label: 'Garden View' },
        { value: 'pool', label: 'Pool View' },
    ];

    const content = (
        <div className="space-y-6">
            {/* Price Range */}
            <div>
                <button
                    onClick={() => toggleSection('price')}
                    className="flex items-center justify-between w-full text-left"
                >
                    <h4 className="font-semibold text-neutral-800">Price Range</h4>
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                    {expandedSections.price && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-4">
                                <input
                                    type="range"
                                    min="0"
                                    max="2000"
                                    step="50"
                                    value={localFilters.priceRange[1]}
                                    onChange={(e) => handleLocalChange('priceRange', [0, parseInt(e.target.value)])}
                                    className="w-full accent-primary-500"
                                />
                                <div className="flex justify-between text-sm text-neutral-500 mt-2">
                                    <span>$0</span>
                                    <span className="font-medium text-primary-600">
                                        Up to ${localFilters.priceRange[1]}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Room Type */}
            <div className="border-t border-gray-100 pt-6">
                <button
                    onClick={() => toggleSection('type')}
                    className="flex items-center justify-between w-full text-left"
                >
                    <h4 className="font-semibold text-neutral-800">Room Type</h4>
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.type ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                    {expandedSections.type && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="space-y-2 pt-4">
                                {roomTypes.map((type) => (
                                    <label key={type.value} className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={localFilters.roomTypes.includes(type.value)}
                                            onChange={(e) => {
                                                const newTypes = e.target.checked
                                                    ? [...localFilters.roomTypes, type.value]
                                                    : localFilters.roomTypes.filter(t => t !== type.value);
                                                handleLocalChange('roomTypes', newTypes);
                                            }}
                                            className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                                        />
                                        <span className="text-neutral-600">{type.label}</span>
                                    </label>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* View Type */}
            <div className="border-t border-gray-100 pt-6">
                <button
                    onClick={() => toggleSection('view')}
                    className="flex items-center justify-between w-full text-left"
                >
                    <h4 className="font-semibold text-neutral-800">View Type</h4>
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.view ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                    {expandedSections.view && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="space-y-2 pt-4">
                                {viewTypes.map((type) => (
                                    <label key={type.value} className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={localFilters.viewTypes.includes(type.value)}
                                            onChange={(e) => {
                                                const newTypes = e.target.checked
                                                    ? [...localFilters.viewTypes, type.value]
                                                    : localFilters.viewTypes.filter(t => t !== type.value);
                                                handleLocalChange('viewTypes', newTypes);
                                            }}
                                            className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                                        />
                                        <span className="text-neutral-600">{type.label}</span>
                                    </label>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Guests */}
            <div className="border-t border-gray-100 pt-6">
                <button
                    onClick={() => toggleSection('guests')}
                    className="flex items-center justify-between w-full text-left"
                >
                    <h4 className="font-semibold text-neutral-800">Minimum Guests</h4>
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.guests ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                    {expandedSections.guests && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-4">
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5, 6].map((num) => (
                                        <button
                                            key={num}
                                            onClick={() => handleLocalChange('minGuests', num)}
                                            className={`w-10 h-10 rounded-lg border-2 font-medium transition-colors ${localFilters.minGuests === num
                                                ? 'border-primary-500 bg-primary-500 text-white'
                                                : 'border-gray-200 text-neutral-600 hover:border-primary-300'
                                                }`}
                                        >
                                            {num}+
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                    onClick={handleReset}
                    className="flex-1 py-2.5 border border-gray-300 text-neutral-600 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                    Reset
                </button>
                <button
                    onClick={handleApply}
                    className="flex-1 py-2.5 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Filter Panel */}
            <div className="hidden lg:block sticky top-24 bg-white rounded-xl shadow-lg p-6 max-h-[calc(100vh-120px)] overflow-y-auto">
                <div className="flex items-center gap-2 mb-6">
                    <SlidersHorizontal className="w-5 h-5 text-primary-500" />
                    <h3 className="font-heading text-lg font-semibold">Filters</h3>
                </div>
                {content}
            </div>

            {/* Mobile Filter Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onToggle}
                            className="fixed inset-0 bg-black/50 z-[200] lg:hidden"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween' }}
                            className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-[201] lg:hidden overflow-y-auto"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2">
                                        <SlidersHorizontal className="w-5 h-5 text-primary-500" />
                                        <h3 className="font-heading text-lg font-semibold">Filters</h3>
                                    </div>
                                    <button onClick={onToggle} className="p-2 hover:bg-gray-100 rounded-lg">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                {content}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default RoomFilter;
