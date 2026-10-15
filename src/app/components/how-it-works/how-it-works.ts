import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentStore } from '../../services/appointment-store';

@Component({
  selector: 'app-how-it-works',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="how-it-works" class="py-20 bg-white border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="max-w-3xl mx-auto text-center mb-16">
          <div class="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 mb-3">
            <span>Simple 3-Step Journey</span>
            <span aria-hidden="true">·</span>
            <span>Easy & Hassle-Free</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
            How to Claim Your Free Dental Checkup
          </h2>
          <p class="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            From online request to receiving your personalized oral assessment, getting started takes just a few moments.
          </p>
        </div>

        <!-- 3 Steps Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          <!-- Subtle connector line on desktop -->
          <div class="hidden md:block absolute top-1/4 left-[15%] right-[15%] h-0.5 bg-slate-200 -z-0"></div>

          @for (step of store.steps; track step.number; let i = $index) {
            <div class="relative z-10 bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <!-- Step Badge & Icon -->
                <div class="flex items-center justify-between mb-6">
                  <span class="w-10 h-10 rounded-xl bg-teal-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
                    {{ step.number }}
                  </span>
                  <div class="w-12 h-12 rounded-xl bg-slate-50 text-teal-700 flex items-center justify-center border border-slate-200">
                    <mat-icon class="text-2xl">{{ step.icon }}</mat-icon>
                  </div>
                </div>

                <div class="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-1">{{ step.subtitle }}</div>
                <h3 class="text-xl font-bold text-slate-900 font-display mb-3">{{ step.title }}</h3>
                <p class="text-sm text-slate-600 leading-relaxed">{{ step.description }}</p>
              </div>

              <!-- Action hint -->
              <div class="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                <span>{{ i === 0 ? 'Takes 60 seconds' : i === 1 ? 'Free parking on-site' : 'No obligation' }}</span>
                <mat-icon class="text-slate-400 text-sm">check_circle_outline</mat-icon>
              </div>
            </div>
          }
        </div>

        <!-- Conversion Callout below steps -->
        <div class="mt-14 text-center">
          <button
            (click)="scrollToBooking()"
            class="px-8 py-4 text-base font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Start Step 1: Book Your Checkup</span>
            <mat-icon class="text-lg">arrow_forward</mat-icon>
          </button>
        </div>

      </div>
    </section>
  `,
})
export class HowItWorks {
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
