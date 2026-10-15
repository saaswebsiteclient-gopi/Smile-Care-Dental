import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentStore } from '../../services/appointment-store';

@Component({
  selector: 'app-why-choose',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="why-choose" class="py-20 bg-white border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <!-- Left Column: Modern Clinic Consultation Visual -->
          <div class="lg:col-span-5 order-2 lg:order-1">
            <div class="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-100 aspect-[4/3] group">
              <img
                src="/images/dental_consultation.jpg"
                alt="Smile Care dentist reviewing digital imaging with a patient"
                referrerpolicy="no-referrer"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
              
              <div class="absolute bottom-4 left-4 right-4 text-white">
                <p class="text-xs uppercase tracking-wider text-teal-300 font-semibold">Patient-Centered Dentistry</p>
                <p class="text-sm font-medium mt-0.5">Every diagnosis is clearly explained on digital screens before any action is taken.</p>
              </div>
            </div>

            <!-- Second supportive environment image -->
            <div class="mt-4 grid grid-cols-2 gap-4">
              <div class="rounded-xl overflow-hidden border border-slate-200 aspect-[4/3] relative">
                <img
                  src="/images/clinic_interior_lounge.jpg"
                  alt="Smile Care boutique clinic reception and lounge"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover"
                />
                <div class="absolute bottom-2 left-2 text-[11px] font-semibold text-white bg-slate-900/70 px-2 py-0.5 rounded backdrop-blur-sm">
                  Welcoming Lounge
                </div>
              </div>

              <div class="rounded-xl p-4 bg-slate-50 border border-slate-200 flex flex-col justify-center">
                <div class="text-xs font-semibold text-teal-700 uppercase tracking-wide">Clinic Hours</div>
                <div class="text-sm font-bold text-slate-900 mt-1">Monday – Saturday</div>
                <div class="text-xs text-slate-500 mt-0.5">Flexible morning & evening slots</div>
                <button
                  type="button"
                  (click)="scrollToBooking()"
                  class="text-xs font-semibold text-teal-700 hover:text-teal-800 mt-3 inline-flex items-center gap-1 cursor-pointer text-left"
                >
                  <span>View available slots</span>
                  <mat-icon class="text-xs">arrow_forward</mat-icon>
                </button>
              </div>
            </div>
          </div>

          <!-- Right Column: Trust Principles -->
          <div class="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div>
              <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 mb-2">
                <span>The Smile Care Difference</span>
                <span aria-hidden="true">·</span>
                <span>Factual Care Standards</span>
              </div>
              <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
                Why Patients Choose Smile Care Dental Clinic
              </h2>
              <p class="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
                We believe exceptional oral healthcare begins with authentic trust, comfortable surroundings, and medical transparency.
              </p>
            </div>

            <!-- Trust Points List -->
            <div class="space-y-4 pt-2">
              @for (point of store.trustPoints; track point.title) {
                <div class="p-4 rounded-xl border border-slate-200/80 bg-slate-50 hover:bg-white hover:border-teal-200 transition-colors flex items-start gap-4">
                  <div class="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                    <mat-icon class="text-xl">{{ point.icon }}</mat-icon>
                  </div>
                  <div>
                    <h3 class="text-base font-bold text-slate-900">{{ point.title }}</h3>
                    <p class="text-sm text-slate-600 mt-1 leading-relaxed">{{ point.description }}</p>
                  </div>
                </div>
              }
            </div>

            <!-- Action Prompt -->
            <div class="pt-2 flex items-center gap-4">
              <button
                (click)="scrollToBooking()"
                class="px-6 py-3 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-colors shadow-sm flex items-center gap-2"
              >
                <span>Experience Our Care for Free</span>
                <mat-icon class="text-base">arrow_forward</mat-icon>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  `,
})
export class WhyChoose {
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
