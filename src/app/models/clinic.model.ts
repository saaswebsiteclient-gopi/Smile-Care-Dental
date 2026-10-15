export interface AppointmentLead {
  id: string;
  referenceCode: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  dentalConcern: string;
  notes?: string;
  status: 'pending_confirmation' | 'confirmed' | 'rescheduled' | 'cancelled';
  createdAt: string;
}

export interface OfferFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  tag: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  keyBenefits: string[];
  icon: string;
}

export interface TestimonialItem {
  id: string;
  initials: string;
  patientName: string;
  visitType: string;
  date: string;
  rating: number;
  comment: string;
  isPlaceholder?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface ClinicInfo {
  name: string;
  tagline: string;
  campaignTitle: string;
  address: string;
  cityStateZip: string;
  phone: string;
  displayPhone: string;
  email: string;
  openingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  googleMapsUrl: string;
}
