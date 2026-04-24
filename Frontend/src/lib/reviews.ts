import axiosInstance from "@/lib/axiosInstance";

export interface Review {
  id: string | number;
  name: string;
  role?: string;
  message?: string;
  text?: string;
  rating: number;
  created_at?: string;
}

const dummyReviews: Review[] = [
  {
    id: "dummy_1",
    name: "Rahul Sharma",
    role: "Verified Traveller",
    message: "Amazing experience! Everything was perfectly managed. The itinerary was customized just the way we wanted, and our driver was fantastic.",
    rating: 5,
    created_at: new Date().toISOString()
  },
  {
    id: "dummy_2",
    name: "Priya Verma",
    role: "Family Traveller",
    message: "Best travel service, highly recommended! They took care of our entire family trip seamlessly from hotels to sightseeing.",
    rating: 5,
    created_at: new Date().toISOString()
  },
  {
    id: "dummy_3",
    name: "Amit Singh",
    role: "Frequent Traveller",
    message: "Great trip, smooth booking and support. The team was always available on call which brought a lot of peace of mind.",
    rating: 4,
    created_at: new Date().toISOString()
  },
  {
    id: "dummy_4",
    name: "Kavita Nair",
    role: "Honeymoon Couple",
    message: "Our Goa honeymoon was magical. Every detail was perfectly arranged — from the private beach dinner to the luxury resort. Couldn't have asked for more!",
    rating: 5,
    created_at: new Date().toISOString()
  }
];

export async function getAllReviews(): Promise<Review[]> {
  try {
    let dbReviews: Review[] = [];
    
    // Fetch DB Reviews
    try {
      const res = await axiosInstance.get(`/api/reviews`);
      if (Array.isArray(res.data)) {
        dbReviews = res.data;
      }
    } catch (e) {
      console.warn("Could not fetch DB reviews:", e);
    }

    // Prepare structure for future Google Reviews integration
    const googleReviews: Review[] = [];
    // googleReviews = await fetchGoogleReviews(); // TODO in future
    
    const combined = [...dbReviews, ...googleReviews];

    if (combined.length === 0) {
      return dummyReviews;
    }

    return combined;
  } catch (error) {
    console.warn("getAllReviews completely failed, using fallback:", error);
    return dummyReviews;
  }
}
