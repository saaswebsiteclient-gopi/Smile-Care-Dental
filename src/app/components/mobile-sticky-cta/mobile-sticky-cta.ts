import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentStore } from '../../services/appointment-store';

@Component({
  selector: 'app-mobile-sticky-cta',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <!-- Floating Bottom Bar on Mobile & Tablet (Under 15% Viewport Cap) -->
    <div class="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-xl px-4 py-2.5">
      <div class="max-w-md mx-auto flex items-center justify-between gap-3">
        
        <!-- Offer Summary Pill -->
        <div class="flex flex-col min-w-0">
          <div class="flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
            <span class="text-xs font-bold text-slate-900 truncate">Free Checkup</span>
          </div>
          <span class="text-[11px] text-teal-700 font-semibold">$0 Complimentary</span>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <!-- Quick Call Dial -->
          <a
            [href]="'tel:' + store.clinicInfo.phone"
            aria-label="Call clinic directly"
            class="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 transition-colors"
          >
            <mat-icon class="text-xl">call</mat-icon>
          </a>

          <!-- Primary Book CTA Button -->
          <button
            (click)="scrollToBooking()"
            class="px-4 py-2.5 rounded-xl bg-teal-600 text-white font-bold text-xs shadow-sm hover:bg-teal-700 active:scale-[0.98] transition-all flex items-center gap-1.5"
          >
            <mat-icon class="text-sm">calendar_month</mat-icon>
            <span>Book Free Checkup</span>
          </button>
        </div>

      </div>
    </div>
  `,
})
export class MobileStickyCta {
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
