import {
    Waves,
    Utensils,
    Dumbbell,
    SparklesIcon,
    Wifi,
    Car,
    Palmtree,
    Umbrella,
    Coffee,
    Plane,
    Baby,
    Gem
} from 'lucide-react';

export const amenitiesData = [
    {
        id: 1,
        name: "Private Beach",
        description: "1.5 km of pristine white sand beach exclusive to our guests",
        icon: "Umbrella",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600"
    },
    {
        id: 2,
        name: "Infinity Pools",
        description: "Three stunning infinity pools with ocean views and poolside service",
        icon: "Waves",
        image: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=600"
    },
    {
        id: 3,
        name: "Fine Dining",
        description: "Five world-class restaurants featuring international and local cuisine",
        icon: "Utensils",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600"
    },
    {
        id: 4,
        name: "Luxury Spa",
        description: "Full-service spa offering massages, facials, and wellness treatments",
        icon: "SparklesIcon",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600"
    },
    {
        id: 5,
        name: "Fitness Center",
        description: "State-of-the-art gym with ocean views and personal trainers",
        icon: "Dumbbell",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600"
    },
    {
        id: 6,
        name: "Free WiFi",
        description: "High-speed wireless internet throughout the resort",
        icon: "Wifi",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600"
    },
    {
        id: 7,
        name: "Valet Parking",
        description: "Complimentary valet parking for all guests",
        icon: "Car",
        image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600"
    },
    {
        id: 8,
        name: "Tropical Gardens",
        description: "10 acres of beautifully landscaped tropical gardens",
        icon: "Palmtree",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600"
    },
    {
        id: 9,
        name: "Coffee Lounge",
        description: "Artisanal coffee bar with fresh pastries and light bites",
        icon: "Coffee",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600"
    },
    {
        id: 10,
        name: "Airport Transfer",
        description: "Luxury speedboat or seaplane transfers available",
        icon: "Plane",
        image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600"
    },
    {
        id: 11,
        name: "Kids Club",
        description: "Supervised activities and entertainment for children ages 4-12",
        icon: "Baby",
        image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600"
    },
    {
        id: 12,
        name: "Concierge",
        description: "24/7 concierge service for all your needs",
        icon: "Gem",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600"
    }
];

export const getAmenityIcon = (iconName) => {
    const icons = {
        Waves,
        Utensils,
        Dumbbell,
        SparklesIcon,
        Wifi,
        Car,
        Palmtree,
        Umbrella,
        Coffee,
        Plane,
        Baby,
        Gem
    };
    return icons[iconName] || Gem;
};

export default amenitiesData;
