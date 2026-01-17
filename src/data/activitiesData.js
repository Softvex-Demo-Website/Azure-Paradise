export const activitiesData = [
    {
        id: 1,
        name: "Snorkeling Adventure",
        category: "water",
        price: 75,
        duration: "2 hours",
        difficulty: "Easy",
        description: "Explore vibrant coral reefs and swim alongside tropical fish in crystal-clear waters.",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
        includes: ["Equipment", "Guide", "Photos", "Refreshments"],
        schedule: "9:00 AM, 2:00 PM"
    },
    {
        id: 2,
        name: "Sunset Dolphin Cruise",
        category: "water",
        price: 120,
        duration: "3 hours",
        difficulty: "Easy",
        description: "Sail into the sunset aboard a luxury catamaran while dolphins play in our wake.",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
        includes: ["Champagne", "Canapes", "Photos", "Blankets"],
        schedule: "4:30 PM daily"
    },
    {
        id: 3,
        name: "Scuba Diving",
        category: "water",
        price: 150,
        duration: "3 hours",
        difficulty: "Intermediate",
        description: "Discover underwater wonders with PADI-certified instructors. Beginners welcome.",
        image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800",
        includes: ["Full Equipment", "Instructor", "2 Dives", "Certificate"],
        schedule: "8:00 AM, 1:00 PM"
    },
    {
        id: 4,
        name: "Jet Ski Safari",
        category: "water",
        price: 95,
        duration: "1 hour",
        difficulty: "Moderate",
        description: "Race across the lagoon and explore hidden beaches on a thrilling jet ski adventure.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
        includes: ["Jet Ski", "Life Jacket", "Guide", "Water"],
        schedule: "10:00 AM, 3:00 PM"
    },
    {
        id: 5,
        name: "Stand Up Paddleboarding",
        category: "water",
        price: 45,
        duration: "1.5 hours",
        difficulty: "Easy",
        description: "Glide across calm waters at sunrise for a peaceful and invigorating experience.",
        image: "https://images.unsplash.com/photo-1499971856191-1a420a42b498?w=800",
        includes: ["Board", "Paddle", "Lesson", "Photos"],
        schedule: "6:30 AM, 5:00 PM"
    },
    {
        id: 6,
        name: "Sunset Yoga",
        category: "wellness",
        price: 35,
        duration: "1 hour",
        difficulty: "All Levels",
        description: "Practice yoga on the beach as the sun sets, connecting body, mind, and spirit.",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
        includes: ["Mat", "Instructor", "Herbal Tea", "Meditation"],
        schedule: "5:30 PM daily"
    },
    {
        id: 7,
        name: "Cooking Class",
        category: "land",
        price: 85,
        duration: "2.5 hours",
        difficulty: "All Levels",
        description: "Learn to prepare authentic Maldivian dishes with our expert chefs.",
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800",
        includes: ["Ingredients", "Recipe Book", "Wine", "Full Meal"],
        schedule: "10:00 AM, 4:00 PM"
    },
    {
        id: 8,
        name: "Night Fishing",
        category: "water",
        price: 110,
        duration: "4 hours",
        difficulty: "Easy",
        description: "Experience traditional Maldivian line fishing under the stars with local fishermen.",
        image: "https://images.unsplash.com/photo-1545816250-e12bedba42ba?w=800",
        includes: ["Equipment", "Guide", "BBQ Dinner", "Drinks"],
        schedule: "6:00 PM daily"
    },
    {
        id: 9,
        name: "Island Hopping",
        category: "land",
        price: 180,
        duration: "Full Day",
        difficulty: "Easy",
        description: "Visit neighboring islands, local villages, and uninhabited sandbanks.",
        image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800",
        includes: ["Boat Transfer", "Lunch", "Snorkeling", "Guide"],
        schedule: "9:00 AM daily"
    },
    {
        id: 10,
        name: "Kids Ocean Camp",
        category: "kids",
        price: 60,
        duration: "Half Day",
        difficulty: "Kids 5-12",
        description: "Fun-filled marine education program with games, crafts, and beach activities.",
        image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800",
        includes: ["Activities", "Snacks", "Crafts", "Certificate"],
        schedule: "9:00 AM - 1:00 PM"
    },
    {
        id: 11,
        name: "Spa Journey",
        category: "wellness",
        price: 250,
        duration: "4 hours",
        difficulty: "All Levels",
        description: "Complete wellness experience with massage, facial, body wrap, and meditation.",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
        includes: ["4 Treatments", "Lunch", "Pool Access", "Relaxation"],
        schedule: "By Appointment"
    },
    {
        id: 12,
        name: "Parasailing",
        category: "water",
        price: 130,
        duration: "30 minutes",
        difficulty: "Moderate",
        description: "Soar 150 meters above the ocean for breathtaking aerial views of the islands.",
        image: "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=800",
        includes: ["Equipment", "Photos", "Video", "Certificate"],
        schedule: "10:00 AM - 4:00 PM"
    }
];

export const getActivitiesByCategory = (category) => {
    if (category === 'all') return activitiesData;
    return activitiesData.filter(activity => activity.category === category);
};

export const activityCategories = [
    { id: 'all', name: 'All Activities' },
    { id: 'water', name: 'Water Sports' },
    { id: 'land', name: 'Land Activities' },
    { id: 'wellness', name: 'Wellness' },
    { id: 'kids', name: 'Kids' }
];

export default activitiesData;
