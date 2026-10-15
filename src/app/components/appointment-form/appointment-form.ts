import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentStore } from '../../services/appointment-store';

@Component({
  selector: 'app-appointment-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatIconModule],
  template: `
    <section id="booking-section" class="py-20 bg-gradient-to-b from-slate-50 via-teal-50/30 to-slate-50 border-b border-slate-200">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-10">
          <div class="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 mb-2">
            <span>Instant Reservation</span>
            <span aria-hidden="true">·</span>
            <span>Takes Under 60 Seconds</span>
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
            Book Your Free Dental Checkup
          </h2>
          <p class="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Fill in your preferred details below. Our clinic coordinator will contact you to confirm your time slot and welcome you to Smile Care.
          </p>
        </div>

        <div class="bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden">
          
          <!-- Top Reassurance Strip -->
          <div class="bg-teal-700 text-white px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-medium">
            <div class="flex items-center gap-2">
              <mat-icon class="text-base text-teal-200">verified</mat-icon>
              <span>100% Free Initial Checkup · Zero Financial Obligation</span>
            </div>
            <div class="flex items-center gap-2">
              <mat-icon class="text-base text-teal-200">lock</mat-icon>
              <span>Confidential & HIPAA-Compliant Privacy</span>
            </div>
          </div>

          <div class="p-6 sm:p-10">

            @if (store.submissionSuccess() && store.lastLead(); as lead) {
              <!-- Success State Confirmation View -->
              <div class="py-6 space-y-6 text-center animate-in fade-in">
                <div class="w-16 h-16 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
                  <mat-icon class="text-4xl">check_circle</mat-icon>
                </div>

                <div class="space-y-2">
                  <span class="text-xs font-bold text-teal-700 uppercase tracking-widest">Request Received</span>
                  <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                    Thank You, {{ lead.fullName }}!
                  </h3>
                  <p class="text-slate-600 max-w-lg mx-auto text-sm sm:text-base">
                    Your complimentary dental checkup request has been registered. Your confirmation reference number is:
                  </p>
                  <div class="inline-block px-5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 font-mono font-bold text-lg tabular-nums">
                    {{ lead.referenceCode }}
                  </div>
                </div>

                <!-- Summary Receipt Card -->
                <div class="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left max-w-xl mx-auto space-y-3 text-xs sm:text-sm">
                  <div class="flex justify-between py-1 border-b border-slate-200/60">
                    <span class="text-slate-500">Patient:</span>
                    <span class="font-semibold text-slate-900">{{ lead.fullName }}</span>
                  </div>
                  <div class="flex justify-between py-1 border-b border-slate-200/60">
                    <span class="text-slate-500">Contact:</span>
                    <span class="font-semibold text-slate-900">{{ lead.phoneNumber }} · {{ lead.email }}</span>
                  </div>
                  <div class="flex justify-between py-1 border-b border-slate-200/60">
                    <span class="text-slate-500">Preferred Date & Time:</span>
                    <span class="font-semibold text-slate-900">{{ lead.preferredDate }} ({{ lead.preferredTime }})</span>
                  </div>
                  <div class="flex justify-between py-1">
                    <span class="text-slate-500">Primary Concern:</span>
                    <span class="font-semibold text-slate-900">{{ lead.dentalConcern }}</span>
                  </div>
                </div>

                <!-- What happens next box -->
                <div class="bg-teal-50/70 border border-teal-200 rounded-2xl p-6 max-w-xl mx-auto text-left space-y-3">
                  <h4 class="text-sm font-bold text-teal-900 flex items-center gap-1.5">
                    <mat-icon class="text-teal-700 text-base">forward_to_inbox</mat-icon>
                    <span>What Happens Next?</span>
                  </h4>
                  <ol class="space-y-2 text-xs sm:text-sm text-slate-700 list-decimal list-inside leading-relaxed">
                    <li>Our clinic coordinator will review your preferred slot within 1 business day.</li>
                    <li>You will receive a phone call or text message at <strong>{{ lead.phoneNumber }}</strong> to confirm the exact time.</li>
                    <li>Arrive at <strong>{{ store.clinicInfo.address }}</strong>. Free parking is available right in front of Suite 200.</li>
                  </ol>
                </div>

                <!-- Action buttons -->
                <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
                  <button
                    (click)="store.downloadCalendarEvent(lead)"
                    class="px-5 py-3 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <mat-icon class="text-teal-600 text-base">calendar_add_on</mat-icon>
                    <span>Add to Calendar (.ics)</span>
                  </button>

                  <a
                    [href]="store.clinicInfo.googleMapsUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-5 py-3 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2"
                  >
                    <mat-icon class="text-teal-600 text-base">directions</mat-icon>
                    <span>Get Directions</span>
                  </a>

                  <button
                    (click)="onResetForm()"
                    class="px-5 py-3 text-sm font-semibold text-teal-700 hover:text-teal-800 bg-teal-50 rounded-xl cursor-pointer"
                  >
                    <span>Book Another Appointment</span>
                  </button>
                </div>
              </div>

            } @else {
              
              <!-- Lead Generation Form -->
              <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()" class="space-y-6">

                @if (store.submissionError(); as err) {
                  <div class="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                    <mat-icon class="text-base text-red-500">error_outline</mat-icon>
                    <span>{{ err }}</span>
                  </div>
                }

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  <!-- Full Name -->
                  <div>
                    <label for="patient-name-input" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Full Name <span class="text-teal-600">*</span>
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <mat-icon class="text-xl">person_outline</mat-icon>
                      </div>
                      <input
                        id="patient-name-input"
                        type="text"
                        formControlName="fullName"
                        placeholder="e.g. Alex Johnson"
                        autocomplete="name"
                        class="w-full pl-11 pr-4 py-3.5 rounded-xl border text-sm text-slate-900 bg-white transition-all focus:outline-none focus:ring-2 focus:ring-teal-500"
                        [class.border-red-300]="isFieldInvalid('fullName')"
                        [class.border-slate-200]="!isFieldInvalid('fullName')"
                      />
                    </div>
                    @if (isFieldInvalid('fullName')) {
                      <p class="text-xs text-red-600 mt-1">Please enter your full name.</p>
                    }
                  </div>

                  <!-- Phone Number -->
                  <div>
                    <label for="patient-phone-input" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Phone Number <span class="text-teal-600">*</span>
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <mat-icon class="text-xl">phone_iphone</mat-icon>
                      </div>
                      <input
                        id="patient-phone-input"
                        type="tel"
                        formControlName="phoneNumber"
                        placeholder="(555) 000-0000"
                        autocomplete="tel"
                        class="w-full pl-11 pr-4 py-3.5 rounded-xl border text-sm text-slate-900 bg-white transition-all focus:outline-none focus:ring-2 focus:ring-teal-500"
                        [class.border-red-300]="isFieldInvalid('phoneNumber')"
                        [class.border-slate-200]="!isFieldInvalid('phoneNumber')"
                      />
                    </div>
                    @if (isFieldInvalid('phoneNumber')) {
                      <p class="text-xs text-red-600 mt-1">Please enter a valid contact phone number.</p>
                    }
                  </div>

                  <!-- Email Address -->
                  <div>
                    <label for="patient-email-input" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address <span class="text-teal-600">*</span>
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <mat-icon class="text-xl">mail_outline</mat-icon>
                      </div>
                      <input
                        id="patient-email-input"
                        type="email"
                        formControlName="email"
                        placeholder="alex@example.com"
                        autocomplete="email"
                        class="w-full pl-11 pr-4 py-3.5 rounded-xl border text-sm text-slate-900 bg-white transition-all focus:outline-none focus:ring-2 focus:ring-teal-500"
                        [class.border-red-300]="isFieldInvalid('email')"
                        [class.border-slate-200]="!isFieldInvalid('email')"
                      />
                    </div>
                    @if (isFieldInvalid('email')) {
                      <p class="text-xs text-red-600 mt-1">Please provide a valid email address.</p>
                    }
                  </div>

                  <!-- Preferred Date -->
                  <div>
                    <label for="patient-date-input" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Preferred Date <span class="text-teal-600">*</span>
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <mat-icon class="text-xl">calendar_today</mat-icon>
                      </div>
                      <input
                        id="patient-date-input"
                        type="date"
                        [min]="todayDate"
                        formControlName="preferredDate"
                        class="w-full pl-11 pr-4 py-3.5 rounded-xl border text-sm text-slate-900 bg-white transition-all focus:outline-none focus:ring-2 focus:ring-teal-500"
                        [class.border-red-300]="isFieldInvalid('preferredDate')"
                        [class.border-slate-200]="!isFieldInvalid('preferredDate')"
                      />
                    </div>
                    <!-- Quick Date Presets -->
                    <div class="flex items-center gap-1.5 mt-2">
                      <button
                        type="button"
                        (click)="setQuickDate(1)"
                        class="px-2.5 py-1 text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors"
                      >
                        Tomorrow
                      </button>
                      <button
                        type="button"
                        (click)="setQuickDate(3)"
                        class="px-2.5 py-1 text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors"
                      >
                        In 3 Days
                      </button>
                      <button
                        type="button"
                        (click)="setQuickDate(7)"
                        class="px-2.5 py-1 text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors"
                      >
                        Next Week
                      </button>
                    </div>
                  </div>

                </div>

                <!-- Preferred Time Slot -->
                <div>
                  <span class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Preferred Time Slot <span class="text-teal-600">*</span>
                  </span>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    @for (slot of timeSlots; track slot.id) {
                      <button
                        type="button"
                        (click)="selectTimeSlot(slot.label)"
                        class="p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer"
                        [class.border-teal-600]="bookingForm.get('preferredTime')?.value === slot.label"
                        [class.bg-teal-50]="bookingForm.get('preferredTime')?.value === slot.label"
                        [class.text-teal-900]="bookingForm.get('preferredTime')?.value === slot.label"
                        [class.border-slate-200]="bookingForm.get('preferredTime')?.value !== slot.label"
                        [class.bg-white]="bookingForm.get('preferredTime')?.value !== slot.label"
                      >
                        <div class="flex items-center gap-2.5">
                          <mat-icon class="text-lg text-teal-600">{{ slot.icon }}</mat-icon>
                          <div>
                            <p class="text-xs font-bold">{{ slot.label }}</p>
                            <p class="text-[11px] text-slate-500">{{ slot.hours }}</p>
                          </div>
                        </div>
                        @if (bookingForm.get('preferredTime')?.value === slot.label) {
                          <mat-icon class="text-teal-600 text-sm">check_circle</mat-icon>
                        }
                      </button>
                    }
                  </div>
                </div>

                <!-- Dental Concern / Message -->
                <div>
                  <label for="dental-concern-input" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Primary Dental Concern or Reason for Visit <span class="text-teal-600">*</span>
                  </label>
                  
                  <!-- Quick Concern Options -->
                  <div class="flex flex-wrap gap-2 mb-2.5">
                    @for (c of popularConcerns; track c) {
                      <button
                        type="button"
                        (click)="selectConcern(c)"
                        class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer"
                        [class.bg-teal-600]="bookingForm.get('dentalConcern')?.value === c"
                        [class.text-white]="bookingForm.get('dentalConcern')?.value === c"
                        [class.bg-slate-100]="bookingForm.get('dentalConcern')?.value !== c"
                        [class.text-slate-700]="bookingForm.get('dentalConcern')?.value !== c"
                        [class.hover:bg-slate-200]="bookingForm.get('dentalConcern')?.value !== c"
                      >
                        {{ c }}
                      </button>
                    }
                  </div>

                  <input
                    id="dental-concern-input"
                    type="text"
                    formControlName="dentalConcern"
                    placeholder="e.g. Routine checkup, sensitivity in upper molar, or cosmetic inquiry..."
                    class="w-full px-4 py-3 rounded-xl border text-sm text-slate-900 bg-white transition-all focus:outline-none focus:ring-2 focus:ring-teal-500"
                    [class.border-red-300]="isFieldInvalid('dentalConcern')"
                    [class.border-slate-200]="!isFieldInvalid('dentalConcern')"
                  />
                  @if (isFieldInvalid('dentalConcern')) {
                    <p class="text-xs text-red-600 mt-1">Please describe your dental concern or select a chip.</p>
                  }
                </div>

                <!-- Optional Additional Notes -->
                <div>
                  <label for="patient-notes-input" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Additional Notes or Medical Preferences <span class="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <textarea
                    id="patient-notes-input"
                    formControlName="notes"
                    rows="2"
                    placeholder="Any specific requests, accessibility needs, or previous dental notes..."
                    class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white transition-all focus:outline-none focus:ring-2 focus:ring-teal-500"
                  ></textarea>
                </div>

                <!-- Primary Submit CTA -->
                <div class="pt-2">
                  <button
                    type="submit"
                    [disabled]="store.isSubmitting()"
                    class="w-full py-4 px-6 text-base font-bold text-white bg-teal-600 hover:bg-teal-700 active:scale-[0.99] rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    @if (store.isSubmitting()) {
                      <mat-icon class="animate-spin text-xl">refresh</mat-icon>
                      <span>Securing Your Free Checkup...</span>
                    } @else {
                      <mat-icon class="text-xl">event_available</mat-icon>
                      <span>Book My Free Checkup</span>
                    }
                  </button>
                  <p class="text-center text-xs text-slate-500 mt-3">
                    Complimentary initial checkup for new patients · No credit card required · Instant confirmation
                  </p>
                </div>

              </form>
            }

          </div>
        </div>

      </div>
    </section>
  `,
})
export class AppointmentForm {
  store = inject(AppointmentStore);

  todayDate = new Date().toISOString().split('T')[0];

  timeSlots = [
    { id: 'morning', label: 'Morning Slot', hours: '9:00 AM – 12:00 PM', icon: 'wb_sunny' },
    { id: 'afternoon', label: 'Midday Slot', hours: '12:00 PM – 3:00 PM', icon: 'wb_twilight' },
    { id: 'evening', label: 'Late Afternoon', hours: '3:00 PM – 6:00 PM', icon: 'bedtime' },
  ];

  popularConcerns = [
    'Routine Dental Checkup',
    'Tooth Sensitivity or Pain',
    'Teeth Whitening / Aesthetic',
    'Gum Health & Bleeding',
    'Orthodontics / Aligners',
    'Second Opinion Consultation',
  ];

  bookingForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(7)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    preferredDate: new FormControl(this.todayDate, [Validators.required]),
    preferredTime: new FormControl('Morning Slot', [Validators.required]),
    dentalConcern: new FormControl('Routine Dental Checkup', [Validators.required]),
    notes: new FormControl(''),
  });

  constructor() {
    // Synchronize prefilled concern if set from services section
    effect(() => {
      const concern = this.store.prefilledConcern();
      if (concern) {
        this.bookingForm.patchValue({ dentalConcern: concern });
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.bookingForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  selectTimeSlot(slotLabel: string): void {
    this.bookingForm.patchValue({ preferredTime: slotLabel });
  }

  selectConcern(concern: string): void {
    this.bookingForm.patchValue({ dentalConcern: concern });
  }

  setQuickDate(daysInFuture: number): void {
    const target = new Date();
    target.setDate(target.getDate() + daysInFuture);
    const dateStr = target.toISOString().split('T')[0];
    this.bookingForm.patchValue({ preferredDate: dateStr });
  }

  onResetForm(): void {
    this.store.resetBookingForm();
    this.bookingForm.reset({
      fullName: '',
      phoneNumber: '',
      email: '',
      preferredDate: this.todayDate,
      preferredTime: 'Morning Slot',
      dentalConcern: 'Routine Dental Checkup',
      notes: '',
    });
  }

  onSubmit(): void {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    const val = this.bookingForm.value;
    this.store.submitAppointment({
      fullName: val.fullName || '',
      phoneNumber: val.phoneNumber || '',
      email: val.email || '',
      preferredDate: val.preferredDate || this.todayDate,
      preferredTime: val.preferredTime || 'Morning Slot',
      dentalConcern: val.dentalConcern || 'Routine Checkup',
      notes: val.notes || '',
    });
  }
}
