import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentStore } from '../../services/appointment-store';
import { ServiceItem } from '../../models/clinic.model';

@Component({
  selector: 'app-services-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="services" class="py-20 bg-slate-50 border-b border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="max-w-3xl mx-auto text-center mb-14">
          <div class="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 mb-3">
            <span>Clinical Capabilities</span>
            <span aria-hidden="true">·</span>
            <span>Comprehensive Family Care</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
            Complete Dental Services at Smile Care
          </h2>
          <p class="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Whether you need routine preventive cleaning or specialized cosmetic and restorative care, our clinic offers gentle, evidence-based treatments under one roof.
          </p>
        </div>

        <!-- Services Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          @for (service of store.services; track service.id) {
            <div class="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-teal-200 transition-all flex flex-col justify-between group">
              <div>
                <!-- Top Header: Category & Icon -->
                <div class="flex items-center justify-between mb-4">
                  <div class="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 group-hover:bg-teal-50 group-hover:text-teal-700 transition-colors flex items-center justify-center">
                    <mat-icon class="text-2xl">{{ service.icon }}</mat-icon>
                  </div>
                  <span class="text-xs font-medium text-slate-600 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                    {{ service.category }}
                  </span>
                </div>

                <!-- Service Title & Description -->
                <h3 class="text-xl font-bold text-slate-900 font-display group-hover:text-teal-800 transition-colors">
                  {{ service.title }}
                </h3>
                <p class="mt-2.5 text-sm text-slate-600 leading-relaxed">
                  {{ service.description }}
                </p>

                <!-- Key Benefits List -->
                <div class="mt-4 pt-4 border-t border-slate-100 space-y-2">
                  @for (benefit of service.keyBenefits; track benefit) {
                    <div class="flex items-center gap-2 text-xs text-slate-600">
                      <mat-icon class="text-teal-600 text-sm shrink-0">check</mat-icon>
                      <span>{{ benefit }}</span>
                    </div>
                  }
                </div>
              </div>

              <!-- Quick action linking service to Free Checkup -->
              <div class="mt-6 pt-4 border-t border-slate-100">
                <button
                  (click)="selectServiceAndBook(service)"
                  class="w-full py-2.5 px-4 text-xs font-semibold text-teal-700 hover:text-white bg-teal-50 hover:bg-teal-600 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Discuss in Free Checkup</span>
                  <mat-icon class="text-sm">arrow_forward</mat-icon>
                </button>
              </div>
            </div>
          }
        </div>

        <!-- Banner connecting services to Free Initial Checkup -->
        <div class="mt-12 text-center text-sm text-slate-500">
          <span>Unsure which service is right for your smile?</span>
          <button (click)="scrollToBooking()" class="ml-1.5 font-semibold text-teal-700 hover:underline inline-flex items-center gap-0.5">
            <span>Book our free assessment to discuss your goals with the dentist</span>
            <mat-icon class="text-sm">arrow_forward</mat-icon>
          </button>
        </div>

      </div>
    </section>
  `,
})
export class ServicesList {
  store = inject(AppointmentStore);

  selectServiceAndBook(service: ServiceItem): void {
    this.store.prefilledConcern.set(service.title);
    this.scrollToBooking();
  }

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
