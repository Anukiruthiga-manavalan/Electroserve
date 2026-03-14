export interface Electrician {
    electricianId: number;
    name: string;
    photo: string;
    rating: number;
    reviewCount: number;
    specialization: string;
    location: string;
    distance: string;
    hourlyRate: number;
    experienceYears: number;
    verified: boolean;
    availabilityStatus: string;
    bio: string;
    phone: string;
    email: string;
    certifications: string;
    servicesOffered: string;
    reviews: Review[];
}

export interface ServiceItem {
    name: string;
    price: string;
    description: string;
}

export interface Review {
    reviewId?: number;
    name?: string;
    rating: number;
    date?: string;
    reviewDate?: string;
    comment: string;
    avatar?: string;
}

export interface ServiceCategory {
    id: number;
    name: string;
    icon: string;
    description: string;
    startingPrice: string;
    image: string;
}

export interface Booking {
    electricianId: number;
    serviceType: string;
    issueDescription: string;
    date: string;
    timeSlot: string;
    address: string;
    city: string;
    phone: string;
    name: string;
}

export interface AuthResponse {
    token: string;
    role: string;
    userId: number;
    name: string;
    email: string;
}

export interface ServiceRequest {
    requestId: number;
    serviceType: string;
    problemDescription: string;
    requestDate: string;
    serviceStatus: string;
    address: string;
    phone: string;
    customerName: string;
    timeSlot: string;
    electrician?: Electrician;
}

export interface ChatMessage {
    message: string;
}
