import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentStore } from '../../services/appointment-store';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="hero" class="relative overflow-hidden bg-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Clean unboxed campaign kicker -->
        <div class="flex items-center gap-2 text-xs sm:text-sm font-medium text-teal-800 mb-4 tracking-wide uppercase">
          <span>Complimentary New Patient Offer</span>
          <span aria-hidden="true" class="text-slate-300">·</span>
          <span>Limited Monthly Availability</span>
          <span aria-hidden="true" class="text-slate-300">·</span>
          <span>Zero Obligation</span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <!-- Left Column: Compelling Conversion Proposition -->
          <div class="lg:col-span-7 space-y-6">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] text-balance font-display">
              Get Your <span class="text-teal-700 underline decoration-teal-300 decoration-wavy decoration-2 underline-offset-8">Free Dental</span> Checkup
            </h1>

            <p class="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl font-normal">
              New patients are invited to experience Smile Care Dental Clinic with a complimentary initial checkup. Receive a thorough dental examination, preventative oral assessment, and dedicated one-on-one dentist consultation at zero upfront cost.
            </p>

            <!-- Key checkup takeaways as clean unboxed list -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 pb-1">
              <div class="flex items-start gap-2.5 text-slate-700 text-sm">
                <mat-icon class="text-teal-600 shrink-0 text-xl">check_circle</mat-icon>
                <span>Full physical tooth & gum exam</span>
              </div>
              <div class="flex items-start gap-2.5 text-slate-700 text-sm">
                <mat-icon class="text-teal-600 shrink-0 text-xl">check_circle</mat-icon>
                <span>Preventative oral health screening</span>
              </div>
              <div class="flex items-start gap-2.5 text-slate-700 text-sm">
                <mat-icon class="text-teal-600 shrink-0 text-xl">check_circle</mat-icon>
                <span>Private consultation with our dentist</span>
              </div>
              <div class="flex items-start gap-2.5 text-slate-700 text-sm">
                <mat-icon class="text-teal-600 shrink-0 text-xl">check_circle</mat-icon>
                <span>Zero hidden fees or forced treatments</span>
              </div>
            </div>

            <!-- Conversion Action CTAs -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
              <button
                (click)="scrollToBooking()"
                class="px-7 py-4 text-base font-bold text-white bg-teal-600 hover:bg-teal-700 active:scale-[0.99] rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <mat-icon class="text-xl group-hover:translate-x-0.5 transition-transform">event_available</mat-icon>
                <span>Book My Free Checkup</span>
              </button>

              <a
                [href]="'tel:' + store.clinicInfo.phone"
                class="px-6 py-4 text-base font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-200"
              >
                <mat-icon class="text-xl text-teal-600">phone_in_talk</mat-icon>
                <span>Call Now: {{ store.clinicInfo.displayPhone }}</span>
              </a>
            </div>

            <!-- Supporting trust quote / reassuring statement -->
            <div class="pt-2 flex items-center gap-3 text-xs text-slate-500">
              <mat-icon class="text-slate-400 text-lg">info_outline</mat-icon>
              <span>100% complimentary initial visit. Any future treatment options are always quoted upfront with zero obligation.</span>
            </div>

          </div>

          <!-- Right Column: Visual Anchor (Modern operatory photography) -->
          <div class="lg:col-span-5 relative">
            <div class="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-100 aspect-[4/3] lg:aspect-[5/4] group">
              <img
                src="/images/hero_dental_clinic.jpg"
                alt="Smile Care Dental Clinic modern clean operatory room"
                referrerpolicy="no-referrer"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              <!-- Subtle gradient vignette for contrast -->
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>

              <!-- Floating reassurance card embedded within media -->
              <div class="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3.5 border border-white/60 shadow-md">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <mat-icon class="text-2xl">sanitizer</mat-icon>
                  </div>
                  <div>
                    <p class="text-xs font-semibold text-slate-900">Hospital-Grade Sterilization & Comfort</p>
                    <p class="text-[11px] text-slate-600">Calming ergonomic treatment suites designed for patient ease</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Decorative clinic status text below visual -->
            <div class="mt-3 flex items-center justify-between text-xs text-slate-500 px-1">
              <div class="flex items-center gap-1.5">
                <mat-icon class="text-teal-600 text-sm">schedule</mat-icon>
                <span>Open Mon–Sat: 8:00 AM – 6:00 PM</span>
              </div>
              <div class="flex items-center gap-1.5">
                <mat-icon class="text-teal-600 text-sm">location_on</mat-icon>
                <span>1420 Wellness Blvd, Suite 200</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  `,
})
export class Hero {
  store = inject(AppointmentStore);

  scrollToBooking(): void {
    const el = document.getElementById('booking-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const input = document.getElementById('patient-name-input');
        input?.focus();
      }, 500);
    }
  }
}
