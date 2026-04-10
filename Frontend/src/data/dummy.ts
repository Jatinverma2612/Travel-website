export const packages = [
  {
    id: "pkg-1",
    title: "Golden Triangle Tour",
    duration: "5 Days / 4 Nights",
    price: 15000,
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=1000",
    description: "Explore the magical cities of Delhi, Agra, and Jaipur in this classic Indian tour.",
    itinerary: [
      "Day 1: Arrival in Delhi, Half-day city tour",
      "Day 2: Drive to Agra, Taj Mahal visit",
      "Day 3: Drive to Jaipur via Fatehpur Sikri",
      "Day 4: Amber Fort & Jaipur city tour",
      "Day 5: Drive back to Delhi for departure"
    ]
  },
  {
    id: "pkg-2",
    title: "Kerala Backwaters & Hills",
    duration: "7 Days / 6 Nights",
    price: 22000,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Experience the tranquil backwaters, lush tea gardens, and spice plantations of Kerala.",
    itinerary: [
      "Day 1: Arrival in Kochi",
      "Day 2: Drive to Munnar, Tea Gardens",
      "Day 3: Eravikulam National Park",
      "Day 4: Drive to Thekkady, Periyar Wildlife",
      "Day 5: Drive to Alleppey, Houseboat stay",
      "Day 6: Drive to Kovalam, Beach relaxation",
      "Day 7: Departure from Trivandrum"
    ]
  },
  {
    id: "pkg-3",
    title: "Majestic Kashmir Valley",
    duration: "6 Days / 5 Nights",
    price: 18500,
    image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=80&w=1000",
    description: "Discover the breathtaking beauty of Srinagar, Gulmarg, and Pahalgam in the heaven on earth.",
    itinerary: [
      "Day 1: Arrival in Srinagar, Shikara Ride",
      "Day 2: Day excursion to Sonamarg",
      "Day 3: Drive to Gulmarg, Gondola Ride",
      "Day 4: Drive to Pahalgam",
      "Day 5: Pahalgam Sightseeing, Return to Srinagar",
      "Day 6: Departure from Srinagar"
    ]
  },
  {
    id: "pkg-4",
    title: "Goa Beach Delights",
    duration: "4 Days / 3 Nights",
    price: 12000,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=1000",
    description: "Enjoy sun, sand, and sea with our vibrant Goa beach tour package.",
    itinerary: [
      "Day 1: Arrival in Goa, Check-in and relax",
      "Day 2: North Goa sightseeing (Beaches & Forts)",
      "Day 3: South Goa sightseeing (Churches & Temples)",
      "Day 4: Departure from Goa"
    ]
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Business Traveler",
    text: "Bharat Yaatra Travels provided an exceptionally smooth corporate booking experience. Their attention to detail is commendable.",
    rating: 5
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Family Vacation",
    text: "Our family trip to Kerala was perfectly organized. The accommodations were top-notch and the itinerary was well-balanced.",
    rating: 5
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Solo Traveler",
    text: "Great value for money. The Kashmir trip was unforgettable. Highly recommend their professional services.",
    rating: 4
  }
];

export const stats = {
  totalPackages: packages.length,
  totalBookings: 124,
  totalEnquiries: 45
};

export const enquiries = [
  { id: 1, name: "Suresh", email: "suresh@example.com", message: "Looking for a 3-day package to Goa in December." },
  { id: 2, name: "Anita", email: "anita@example.com", message: "Can you customize the Golden Triangle tour?" },
];

export const bookings = [
  { id: "BKG-001", name: "Rajesh Kumar", package: "Kerala Backwaters & Hills", date: "2026-05-15", status: "Confirmed" },
  { id: "BKG-002", name: "Amit Patel", package: "Majestic Kashmir Valley", date: "2026-06-02", status: "Pending" },
];
