export const restaurantsData = [
    {
        id: 1,
        name: "Azure Ocean",
        cuisine: "Fine Dining",
        description: "Our signature restaurant offering contemporary fusion cuisine with stunning ocean views. Featuring fresh seafood, premium cuts, and innovative dishes crafted by our Michelin-starred chef.",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
        hours: "6:30 PM - 10:30 PM",
        dressCode: "Smart Casual",
        priceRange: "$$$$",
        features: ["Ocean View", "Wine Pairing", "Tasting Menu", "Romantic Setting"],
        menu: [
            { category: "Starters", items: ["Tuna Tartare", "Lobster Bisque", "Wagyu Carpaccio"] },
            { category: "Mains", items: ["Grilled Maldivian Lobster", "Pan-Seared Sea Bass", "Prime Ribeye"] },
            { category: "Desserts", items: ["Chocolate Sphere", "Mango Pavlova", "Cheese Selection"] }
        ]
    },
    {
        id: 2,
        name: "Spice Garden",
        cuisine: "Asian Fusion",
        description: "Experience the vibrant flavors of Asia in our open-air restaurant surrounded by tropical gardens. From Japanese sushi to Thai curries and Indian delicacies.",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
        hours: "12:00 PM - 10:00 PM",
        dressCode: "Casual",
        priceRange: "$$$",
        features: ["Garden Setting", "Live Cooking", "Vegan Options", "Chef's Table"],
        menu: [
            { category: "Japanese", items: ["Sashimi Platter", "Dragon Roll", "Wagyu Tataki"] },
            { category: "Thai", items: ["Tom Yum", "Pad Thai", "Green Curry"] },
            { category: "Indian", items: ["Butter Chicken", "Biryani", "Naan Selection"] }
        ]
    },
    {
        id: 3,
        name: "Beach Grill",
        cuisine: "Seafood & BBQ",
        description: "Casual beachfront dining with your feet in the sand. Fresh catches of the day grilled to perfection alongside premium meats and tropical cocktails.",
        image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800",
        hours: "11:00 AM - 9:00 PM",
        dressCode: "Beach Casual",
        priceRange: "$$",
        features: ["Beachfront", "Fresh Seafood", "Live Music", "Sunset Views"],
        menu: [
            { category: "Grilled", items: ["Whole Snapper", "Jumbo Prawns", "BBQ Ribs"] },
            { category: "Sides", items: ["Grilled Vegetables", "Coconut Rice", "Island Slaw"] },
            { category: "Drinks", items: ["Fresh Coconut", "Tropical Cocktails", "Local Beer"] }
        ]
    },
    {
        id: 4,
        name: "The Terrace",
        cuisine: "International Buffet",
        description: "All-day dining featuring extensive breakfast, lunch, and dinner buffets. Global cuisines, live cooking stations, and a dedicated kids' corner.",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
        hours: "6:30 AM - 10:00 PM",
        dressCode: "Casual",
        priceRange: "$$",
        features: ["Buffet Style", "Kids Corner", "Gluten-Free Options", "Terrace Seating"],
        menu: [
            { category: "Breakfast", items: ["Continental", "American", "Asian", "Healthy Corner"] },
            { category: "Lunch", items: ["Salad Bar", "Hot Dishes", "Pasta Station", "Dessert Bar"] },
            { category: "Dinner", items: ["Carving Station", "Seafood Bar", "International Mains"] }
        ]
    },
    {
        id: 5,
        name: "Sunset Bar",
        cuisine: "Cocktails & Light Bites",
        description: "The perfect spot to watch the sun dip below the horizon. Award-winning mixologists craft signature cocktails paired with gourmet bar snacks.",
        image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800",
        hours: "4:00 PM - 12:00 AM",
        dressCode: "Smart Casual",
        priceRange: "$$$",
        features: ["Sunset Views", "Live DJ", "Signature Cocktails", "Cigar Lounge"],
        menu: [
            { category: "Signature Cocktails", items: ["Azure Sunset", "Tropical Paradise", "Ocean Breeze"] },
            { category: "Bar Bites", items: ["Truffle Fries", "Sliders", "Sashimi Tacos"] },
            { category: "Wines", items: ["Champagne Selection", "World Wines", "Local Spirits"] }
        ]
    }
];

export default restaurantsData;
