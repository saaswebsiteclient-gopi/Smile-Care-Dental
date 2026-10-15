import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentStore } from '../../services/appointment-store';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between gap-8 h-20">
          
          <!-- Zone 1: Single text element wordmark -->
          <a href="#hero" class="flex items-center gap-2.5 text-slate-900 group whitespace-nowrap shrink-0">
            <span class="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-sm group-hover:bg-teal-700 transition-colors">
              <mat-icon class="text-xl">medical_services</mat-icon>
            </span>
            <span class="text-xl font-bold tracking-tight font-display">Smile Care Dental</span>
          </a>

          <!-- Zone 2: 4-5 clean single-line nav links -->
          <nav class="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#offer" class="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0">Free Checkup</a>
            <a href="#why-choose" class="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0">Why Choose Us</a>
            <a href="#services" class="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0">Services</a>
            <a href="#how-it-works" class="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0">How It Works</a>
            <a href="#location" class="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0">Location & Hours</a>
          </nav>

          <!-- Zone 3: 1 primary action (+ contact link) -->
          <div class="flex items-center gap-4 shrink-0">
            <a
              [href]="'tel:' + store.clinicInfo.phone"
              class="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-teal-700 transition-colors py-2 px-3 rounded-lg border border-slate-200 bg-slate-50"
            >
              <mat-icon class="text-base text-teal-600">call</mat-icon>
              <span>{{ store.clinicInfo.displayPhone }}</span>
            </a>

            <button
              (click)="scrollToBooking()"
              class="px-4 py-2.5 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 active:scale-[0.98] transition-all shadow-sm hover:shadow-md flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <mat-icon class="text-base">calendar_month</mat-icon>
              <span>Book Free Checkup</span>
            </button>

            <!-- Mobile menu button -->
            <button
              (click)="isMobileMenuOpen.set(!isMobileMenuOpen())"
              aria-label="Toggle Navigation Menu"
              class="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <mat-icon>{{ isMobileMenuOpen() ? 'close' : 'menu' }}</mat-icon>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile dropdown nav -->
      @if (isMobileMenuOpen()) {
        <div class="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 animate-in fade-in">
          <nav class="flex flex-col space-y-2 text-base font-medium text-slate-700">
            <a (click)="closeMobileMenu()" href="#offer" class="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors">Free Checkup Details</a>
            <a (click)="closeMobileMenu()" href="#why-choose" class="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors">Why Choose Smile Care</a>
            <a (click)="closeMobileMenu()" href="#services" class="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors">Dental Services</a>
            <a (click)="closeMobileMenu()" href="#how-it-works" class="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors">How It Works</a>
            <a (click)="closeMobileMenu()" href="#faq" class="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors">Frequently Asked Questions</a>
            <a (click)="closeMobileMenu()" href="#location" class="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors">Location & Contact</a>
          </nav>
          
          <div class="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              [href]="'tel:' + store.clinicInfo.phone"
              class="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-teal-700 bg-teal-50 rounded-xl"
            >
              <mat-icon class="text-base">call</mat-icon>
              <span>Call {{ store.clinicInfo.displayPhone }}</span>
            </a>
            <button
              (click)="closeMobileMenu(); scrollToBooking()"
              class="w-full py-2.5 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700"
            >
              Book My Free Checkup
            </button>
          </div>
        </div>
      }
    </header>
  `,
})
export class Navbar {
  store = inject(AppointmentStore);
  isMobileMenuOpen = signal<boolean>(false);

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  scrollToBooking(): void {
    const el = document.getElementById('booking-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // highlight or focus
      setTimeout(() => {
        const input = document.getElementById('patient-name-input');
        input?.focus();
      }, 500);
    }
  }
}
