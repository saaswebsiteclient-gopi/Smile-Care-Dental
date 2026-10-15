import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentStore } from '../../services/appointment-store';

@Component({
  selector: 'app-offer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="offer" class="py-20 bg-slate-50 border-b border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-14">
          <div class="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 mb-3">
            <span>The Complimentary Care Package</span>
            <span aria-hidden="true">·</span>
            <span>All New Patients Welcome</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
            What Your Free Dental Checkup Includes
          </h2>
          <p class="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Our complimentary initial appointment is comprehensive and designed to give you an objective, clear picture of your oral wellness with zero pressure.
          </p>
        </div>

        <!-- 4 Key Offer Inclusions Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (item of store.offerInclusions; track item.id; let i = $index) {
            <div class="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
              <div>
                <!-- Icon & Step Index -->
                <div class="flex items-center justify-between mb-5">
                  <div class="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    <mat-icon class="text-2xl">{{ item.icon }}</mat-icon>
                  </div>
                  <span class="text-xs font-bold text-slate-400 tabular-nums">0{{ i + 1 }}</span>
                </div>

                <!-- Card Content -->
                <div class="text-xs font-medium text-teal-700 uppercase tracking-wide mb-1">{{ item.tag }}</div>
                <h3 class="text-lg font-bold text-slate-900 font-display mb-2">{{ item.title }}</h3>
                <p class="text-sm text-slate-600 leading-relaxed">{{ item.description }}</p>
              </div>

              <!-- Included Indicator -->
              <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span class="font-medium text-teal-700 flex items-center gap-1">
                  <mat-icon class="text-sm">done</mat-icon>
                  <span>100% Included</span>
                </span>
                <span>$0 Cost</span>
              </div>
            </div>
          }
        </div>

        <!-- Transparent Assurance Box -->
        <div class="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-teal-200 shadow-sm">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                <mat-icon class="text-2xl">verified</mat-icon>
              </div>
              <div class="space-y-1">
                <h4 class="text-base font-bold text-slate-900">Our Honest Care Guarantee</h4>
                <p class="text-sm text-slate-600 leading-relaxed max-w-3xl">
                  The initial checkup and dental examination are <strong>completely complimentary</strong>. If any further care, dental filling, or procedure is advised, our dentist will explain all clinical reasons and exact transparent pricing before proceeding. You retain total freedom to decide.
                </p>
              </div>
            </div>

            <button
              (click)="scrollToBooking()"
              class="shrink-0 w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <mat-icon class="text-base">calendar_today</mat-icon>
              <span>Claim Free Checkup</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  `,
})
export class Offer {
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
