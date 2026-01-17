// Experience Packages - Curated bundles of dining, spa, and activities

export const packagesData = [
    {
        id: 1,
        name: "Romantic Escape",
        tagline: "Perfect for couples seeking intimate moments",
        description: "A romantic journey designed for two, featuring candlelit dining, couples massage, and a sunset cruise. Create unforgettable memories in paradise.",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
        duration: "Full Day",
        price: 850,
        originalPrice: 1050,
        savings: 200,
        includes: [
            {
                type: "dining",
                name: "Romantic Beach Dinner",
                description: "Private candlelit dinner on the beach with champagne"
            },
            {
                type: "spa",
                name: "Couples Harmony Ritual",
                description: "2-hour couples massage in private overwater pavilion"
            },
            {
                type: "activity",
                name: "Sunset Dolphin Cruise",
                description: "Private yacht cruise with dolphins and champagne"
            }
        ],
        highlights: ["Private Beach Setup", "Champagne & Wine", "Rose Petal Turndown", "Photographer"],
        bestFor: ["Honeymoon", "Anniversary", "Proposals"]
    },
    {
        id: 2,
        name: "Adventure Seeker",
        tagline: "For thrill-seekers craving excitement",
        description: "An adrenaline-packed day of water sports, island exploration, and gourmet dining. Push your limits while surrounded by natural beauty.",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
        duration: "Full Day",
        price: 650,
        originalPrice: 820,
        savings: 170,
        includes: [
            {
                type: "activity",
                name: "Jet Ski Safari",
                description: "1-hour guided jet ski adventure through the lagoon"
            },
            {
                type: "activity",
                name: "Scuba Diving",
                description: "2-dive experience with PADI instructor"
            },
            {
                type: "dining",
                name: "Seafood Grill Lunch",
                description: "Fresh catch grilled at the beachside restaurant"
            },
            {
                type: "spa",
                name: "Muscle Recovery Massage",
                description: "60-minute deep tissue massage"
            }
        ],
        highlights: ["All Equipment Included", "Professional Photos", "Energy Snacks", "Free Refreshments"],
        bestFor: ["Couples", "Friends", "Solo Travelers"]
    },
    {
        id: 3,
        name: "Wellness Retreat",
        tagline: "Restore your mind, body, and spirit",
        description: "A holistic wellness journey featuring yoga, spa treatments, healthy cuisine, and meditation. Find your inner peace in our island sanctuary.",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
        duration: "Full Day",
        price: 580,
        originalPrice: 720,
        savings: 140,
        includes: [
            {
                type: "activity",
                name: "Sunrise Yoga Session",
                description: "Beach yoga with ocean views"
            },
            {
                type: "spa",
                name: "Full Body Massage",
                description: "90-minute signature Maldivian massage"
            },
            {
                type: "spa",
                name: "Detox Body Wrap",
                description: "Purifying seaweed and mineral treatment"
            },
            {
                type: "dining",
                name: "Wellness Lunch",
                description: "Organic plant-based gourmet meal"
            }
        ],
        highlights: ["Meditation Session", "Healthy Snacks", "Wellness Consultation", "Take-home Kit"],
        bestFor: ["Solo Travelers", "Wellness Enthusiasts", "Couples"]
    },
    {
        id: 4,
        name: "Family Discovery",
        tagline: "Adventures the whole family will love",
        description: "Create lasting family memories with kid-friendly activities, delicious dining, and relaxing experiences that parents and children can enjoy together.",
        image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800",
        duration: "Full Day",
        price: 750,
        originalPrice: 950,
        savings: 200,
        includes: [
            {
                type: "activity",
                name: "Snorkeling Adventure",
                description: "Family snorkeling with marine life discovery"
            },
            {
                type: "activity",
                name: "Island Hopping Tour",
                description: "Visit sandbanks and local villages"
            },
            {
                type: "dining",
                name: "International Buffet",
                description: "All-day dining with kids menu"
            },
            {
                type: "activity",
                name: "Kids Ocean Camp",
                description: "Fun marine education for children"
            }
        ],
        highlights: ["Kids Club Access", "Family Photos", "Ice Cream Treats", "Souvenir Gifts"],
        bestFor: ["Families", "Multi-generation Groups"]
    },
    {
        id: 5,
        name: "Ultimate Indulgence",
        tagline: "The pinnacle of luxury experiences",
        description: "Our most exclusive package featuring private chef dining, premium spa treatments, and exclusive experiences. The ultimate luxury retreat.",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
        duration: "Full Day",
        price: 1500,
        originalPrice: 2100,
        savings: 600,
        includes: [
            {
                type: "dining",
                name: "Private Chef Experience",
                description: "Personal chef prepares 7-course tasting menu"
            },
            {
                type: "spa",
                name: "Full Day Retreat",
                description: "6-hour complete wellness journey"
            },
            {
                type: "activity",
                name: "Private Yacht Charter",
                description: "Half-day private yacht with crew"
            },
            {
                type: "dining",
                name: "Champagne Breakfast",
                description: "In-villa breakfast with premium champagne"
            }
        ],
        highlights: ["Butler Service", "Premium Champagne", "Exclusive Access", "Limousine Transfer"],
        bestFor: ["Luxury Seekers", "Special Celebrations", "VIP Guests"]
    }
];

export const getPackageById = (id) => {
    return packagesData.find(pkg => pkg.id === parseInt(id));
};

export default packagesData;
