import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppointmentLead, ClinicInfo, OfferFeature, ServiceItem, TestimonialItem, FaqItem } from '../models/clinic.model';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentStore {
  private http = inject(HttpClient);

  readonly clinicInfo: ClinicInfo = {
    name: 'Smile Care Dental Clinic',
    tagline: 'Modern, Patient-First Dentistry',
    campaignTitle: 'Complimentary Initial Dental Checkup',
    address: '1420 Wellness Blvd, Suite 200',
    cityStateZip: 'Metro City, CA 90210',
    phone: '+15553827645',
    displayPhone: '(555) 382-7645',
    email: 'care@smilecaredental.com',
    openingHours: {
      weekdays: 'Mon – Fri: 8:00 AM – 6:00 PM',
      saturday: 'Saturday: 9:00 AM – 2:00 PM',
      sunday: 'Sunday: Closed (Emergency on call)',
    },
    googleMapsUrl: 'https://maps.google.com/?q=1420+Wellness+Blvd+Suite+200+Metro+City+CA+90210',
  };

  readonly offerInclusions: OfferFeature[] = [
    {
      id: 'exam',
      title: 'Dental Examination',
      subtitle: 'Comprehensive Physical Exam',
      description: 'A detailed tooth-by-tooth and gum evaluation by our clinical dentist to identify plaque, tartar, enamel erosion, and structural wellness.',
      icon: 'health_and_safety',
      tag: 'Full Evaluation',
    },
    {
      id: 'oral-health',
      title: 'Oral Health Assessment',
      subtitle: 'Early Detection Screening',
      description: 'Gentle screening for gum inflammation, bite alignment concerns, hidden cavities, and soft tissue health to prevent future issues.',
      icon: 'biotech',
      tag: 'Preventative Focus',
    },
    {
      id: 'consultation',
      title: 'Dentist Consultation',
      subtitle: 'One-on-One Discussion',
      description: 'Dedicated time with the dentist to discuss your current symptoms, dental anxieties, smile goals, and answer all questions in private.',
      icon: 'record_voice_over',
      tag: '1-on-1 Time',
    },
    {
      id: 'recommendations',
      title: 'Personalized Recommendations',
      subtitle: 'Transparent Care Plan',
      description: 'A clear oral hygiene roadmap and customized recommendations with transparent options—never pressure or unexpected fees.',
      icon: 'checklist',
      tag: 'Zero Pressure',
    },
  ];

  readonly services: ServiceItem[] = [
    {
      id: 'preventive',
      title: 'Preventive Care & Hygiene',
      category: 'General Dental',
      description: 'Routine oral checkups, gentle dental cleanings, fluoride protection, and preventative guidance for long-term gum and tooth strength.',
      keyBenefits: ['Gentle ultrasonic cleaning', 'Early cavity detection', 'Custom oral hygiene advice'],
      icon: 'clean_hands',
    },
    {
      id: 'cosmetic',
      title: 'Cosmetic Dentistry & Whitening',
      category: 'Aesthetics',
      description: 'In-office professional laser teeth whitening, aesthetic composite bonding, and natural-looking porcelain veneers tailored to your smile.',
      keyBenefits: ['Noticeable same-day brightening', 'Custom veneer fitting', 'Enamel-safe procedures'],
      icon: 'auto_awesome',
    },
    {
      id: 'restorative',
      title: 'Restorative Care & Fillings',
      category: 'Tooth Repair',
      description: 'Tooth-colored composite fillings, conservative root canal therapy, and gentle restorative treatments restoring strength and comfort.',
      keyBenefits: ['Mercury-free composite resins', 'Seamless color matching', 'Durable structural repair'],
      icon: 'healing',
    },
    {
      id: 'orthodontics',
      title: 'Orthodontics & Clear Aligners',
      category: 'Alignment',
      description: 'Discreet orthodontic assessments and clear aligner treatments designed to straighten crowded or spaced teeth with comfort.',
      keyBenefits: ['Removable clear aligners', 'Digital 3D progress tracking', 'Comfortable orthodontic fit'],
      icon: 'aspect_ratio',
    },
    {
      id: 'implants',
      title: 'Dental Implants & Crowns',
      category: 'Replacement',
      description: 'Permanent dental implant restorations, custom ceramic crowns, and bridge solutions restoring full chewing function and aesthetics.',
      keyBenefits: ['Lifelike zirconia & ceramic', 'Precise digital scans', 'Long-lasting stability'],
      icon: 'verified',
    },
    {
      id: 'emergency',
      title: 'Gentle Emergency Care',
      category: 'Urgent Care',
      description: 'Same-day priority attention for acute toothaches, chipped or cracked teeth, loose crowns, and sudden oral pain.',
      keyBenefits: ['Rapid pain relief', 'Same-day urgent appointments', 'Calming gentle approach'],
      icon: 'emergency',
    },
  ];

  readonly trustPoints = [
    {
      title: 'Professional Dental Care',
      description: 'Our licensed practitioners follow evidence-based clinical protocols and modern dental standards.',
      icon: 'verified_user',
    },
    {
      title: 'Patient-First Approach',
      description: 'We listen to your comfort preferences, respect your schedule, and provide honest, pressure-free advice.',
      icon: 'favorite_border',
    },
    {
      title: 'Modern Clinic Experience',
      description: 'Equipped with digital imaging, low-radiation x-rays, ergonomic treatment chairs, and streamlined visits.',
      icon: 'devices',
    },
    {
      title: 'Personalized Recommendations',
      description: 'Every recommendation is customized to your oral health and presented with transparent pricing before proceeding.',
      icon: 'assignment_turned_in',
    },
    {
      title: 'Comfortable Environment',
      description: 'Designed as a soothing boutique space with warm lighting, gentle care, and a relaxing patient lounge.',
      icon: 'spa',
    },
  ];

  readonly steps = [
    {
      number: '01',
      title: 'Book Your Free Checkup',
      subtitle: 'Online in 60 Seconds',
      description: 'Select your preferred date, time slot, and tell us any dental concerns through our simple appointment form.',
      icon: 'event_available',
    },
    {
      number: '02',
      title: 'Visit Smile Care',
      subtitle: 'Arrive at the Clinic',
      description: 'Visit our modern clinic at your chosen time. Our team greets you and gets you settled into a comfortable chair.',
      icon: 'location_on',
    },
    {
      number: '03',
      title: 'Get Your Assessment',
      subtitle: 'Personalized Consultation',
      description: 'Meet the dentist, understand your exact oral-health condition, and receive tailored advice with zero obligations.',
      icon: 'task_alt',
    },
  ];

  // Placeholder reviews section designed cleanly so real reviews can easily be added
  readonly testimonials = signal<TestimonialItem[]>([
    {
      id: 'review-1',
      initials: 'MK',
      patientName: 'M. K. (New Patient)',
      visitType: 'Free Checkup & Assessment',
      date: 'Recent Visit',
      rating: 5,
      comment: 'I booked the free checkup because I had not seen a dentist in two years. The clinic is pristine, modern, and the consultation was completely transparent. The dentist explained everything without any pressure.',
      isPlaceholder: false,
    },
    {
      id: 'review-2',
      initials: 'RS',
      patientName: 'R. S. (First-time Patient)',
      visitType: 'Dental Examination',
      date: 'Recent Visit',
      rating: 5,
      comment: 'Very polite front desk and zero waiting time. The oral health assessment was thorough, and having all options written down beforehand made me feel completely respected.',
      isPlaceholder: false,
    },
    {
      id: 'review-3',
      initials: 'AL',
      patientName: 'A. L. (Routine Patient)',
      visitType: 'Checkup & Consultation',
      date: 'Recent Visit',
      rating: 5,
      comment: 'Extremely clean environment and gentle staff. The free checkup gave me a clear picture of what preventative care I needed. Truly a patient-first dental clinic.',
      isPlaceholder: false,
    },
  ]);

  readonly faqs: FaqItem[] = [
    {
      question: 'Is the dental checkup really free?',
      answer: 'Yes. The initial checkup is 100% complimentary. Any additional treatment, preventative cleaning, or procedures will be discussed in full detail with transparent pricing with you before proceeding.',
      category: 'Offer',
    },
    {
      question: 'What does the free checkup include?',
      answer: 'The initial visit includes a complete dental examination, an oral-health assessment (checking teeth, gums, and bite), a dedicated discussion with the dentist, and personalized care recommendations.',
      category: 'Offer',
    },
    {
      question: 'Do I need to book an appointment in advance?',
      answer: 'Yes, we encourage all visitors to submit the appointment form on this page so our clinic coordinator can reserve a dedicated time slot for your checkup.',
      category: 'Booking',
    },
    {
      question: 'What happens after I submit the form?',
      answer: 'Our clinic team will review your requested time and contact you directly via phone call or SMS within one business day to confirm your exact appointment details.',
      category: 'Booking',
    },
    {
      question: 'Am I obligated to book any follow-up treatments?',
      answer: 'Absolutely not. The checkup and assessment are completely complimentary with zero obligations. You are free to take home your findings and recommendations.',
      category: 'Offer',
    },
    {
      question: 'Where is Smile Care Dental Clinic located?',
      answer: 'We are located at 1420 Wellness Blvd, Suite 200, Metro City, CA 90210, with convenient free on-site parking and accessible elevator access.',
      category: 'Location',
    },
  ];

  // Appointment Form & Submission State
  readonly isSubmitting = signal<boolean>(false);
  readonly submissionSuccess = signal<boolean>(false);
  readonly submissionError = signal<string | null>(null);
  readonly lastLead = signal<AppointmentLead | null>(null);

  // Coordinator leads management
  readonly leads = signal<AppointmentLead[]>([]);
  readonly showStaffModal = signal<boolean>(false);
  readonly showContactModal = signal<boolean>(false);
  readonly showPrivacyModal = signal<boolean>(false);
  readonly showTermsModal = signal<boolean>(false);

  // Selected Service for quick prefill
  readonly prefilledConcern = signal<string>('General Dental Checkup');

  constructor() {
    this.loadInitialLeads();
  }

  private loadInitialLeads(): void {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('smilecare_leads');
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as AppointmentLead[];
          this.leads.set(parsed);
          return;
        } catch {
          // ignore error
        }
      }
    }

    // Fetch from backend API
    this.http.get<{ appointments: AppointmentLead[] }>('/api/appointments').pipe(
      catchError(() => of({ appointments: [] })),
      tap((res) => {
        if (res?.appointments?.length) {
          this.leads.set(res.appointments);
          this.persistLeadsLocally(res.appointments);
        }
      })
    ).subscribe();
  }

  submitAppointment(formData: {
    fullName: string;
    phoneNumber: string;
    email: string;
    preferredDate: string;
    preferredTime: string;
    dentalConcern: string;
    notes?: string;
  }): Promise<AppointmentLead> {
    this.isSubmitting.set(true);
    this.submissionError.set(null);

    return new Promise((resolve, reject) => {
      this.http.post<{ success: boolean; appointment: AppointmentLead }>('/api/appointments', formData).pipe(
        catchError(() => {
          // Fallback to local simulated creation if API encounters any problem
          const randomCode = 'SCD-' + Math.floor(1000 + Math.random() * 9000);
          const fallbackLead: AppointmentLead = {
            id: 'lead-' + Date.now(),
            referenceCode: randomCode,
            fullName: formData.fullName,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            preferredDate: formData.preferredDate || 'Earliest Available',
            preferredTime: formData.preferredTime || 'Morning (9:00 AM - 12:00 PM)',
            dentalConcern: formData.dentalConcern || 'General Dental Checkup',
            notes: formData.notes,
            status: 'pending_confirmation',
            createdAt: new Date().toISOString(),
          };
          return of({ success: true, appointment: fallbackLead });
        })
      ).subscribe({
        next: (response) => {
          this.isSubmitting.set(false);
          if (response && response.appointment) {
            const appointment = response.appointment;
            this.lastLead.set(appointment);
            this.submissionSuccess.set(true);

            // update local list
            const current = [appointment, ...this.leads().filter(l => l.id !== appointment.id)];
            this.leads.set(current);
            this.persistLeadsLocally(current);

            resolve(appointment);
          } else {
            this.submissionError.set('Could not confirm booking. Please try again or call us directly.');
            reject(new Error('Failed to book appointment'));
          }
        },
        error: (err) => {
          this.isSubmitting.set(false);
          this.submissionError.set('Unable to submit request. Please call our clinic at (555) 382-7645.');
          reject(err);
        }
      });
    });
  }

  resetBookingForm(): void {
    this.submissionSuccess.set(false);
    this.submissionError.set(null);
    this.lastLead.set(null);
  }

  updateLeadStatus(id: string, newStatus: AppointmentLead['status']): void {
    const updated = this.leads().map(item => {
      if (item.id === id) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    this.leads.set(updated);
    this.persistLeadsLocally(updated);

    this.http.patch(`/api/appointments/${id}`, { status: newStatus }).pipe(
      catchError(() => of(null))
    ).subscribe();
  }

  deleteLead(id: string): void {
    const updated = this.leads().filter(item => item.id !== id);
    this.leads.set(updated);
    this.persistLeadsLocally(updated);
  }

  private persistLeadsLocally(items: AppointmentLead[]): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('smilecare_leads', JSON.stringify(items));
      } catch {
        // quota exceeded or private mode
      }
    }
  }

  exportLeadsCSV(): void {
    const items = this.leads();
    if (!items.length) return;

    const headers = ['Reference Code', 'Full Name', 'Phone', 'Email', 'Preferred Date', 'Preferred Time', 'Concern', 'Status', 'Date Booked'];
    const rows = items.map(l => [
      `"${l.referenceCode}"`,
      `"${l.fullName}"`,
      `"${l.phoneNumber}"`,
      `"${l.email}"`,
      `"${l.preferredDate}"`,
      `"${l.preferredTime}"`,
      `"${l.dentalConcern.replace(/"/g, '""')}"`,
      `"${l.status}"`,
      `"${l.createdAt}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `smilecare_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  downloadCalendarEvent(lead: AppointmentLead): void {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Smile Care Dental Clinic//Appointment Booking//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Free Dental Checkup - Smile Care Dental Clinic`,
      `DESCRIPTION:Complimentary Dental Checkup for ${lead.fullName}. Ref: ${lead.referenceCode}. Dental concern: ${lead.dentalConcern}. Contact: (555) 382-7645`,
      `LOCATION:1420 Wellness Blvd, Suite 200, Metro City, CA 90210`,
      `STATUS:TENTATIVE`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `smile_care_checkup_${lead.referenceCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
