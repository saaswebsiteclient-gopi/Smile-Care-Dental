import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentStore } from '../../services/appointment-store';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <footer class="bg-slate-900 text-slate-300">
      
      <!-- Final High-Conversion Action Banner -->
      <div class="border-b border-slate-800 bg-gradient-to-r from-teal-900/60 via-slate-900 to-teal-950/60 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div class="inline-flex items-center gap-2 text-xs font-semibold text-teal-400 uppercase tracking-widest bg-teal-950/80 px-3 py-1 rounded-full border border-teal-800">
            <span>Special Promotional Campaign</span>
          </div>

          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display max-w-3xl mx-auto text-balance">
            Book Your Free Dental Checkup Today
          </h2>

          <p class="text-slate-300 max-w-xl mx-auto text-base sm:text-lg">
            Experience modern, compassionate dentistry with no upfront charge. Our friendly team is ready to welcome you.
          </p>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              (click)="scrollToBooking()"
              class="w-full sm:w-auto px-8 py-4 text-base font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <mat-icon class="text-teal-700">event_available</mat-icon>
              <span>Book My Free Checkup</span>
            </button>

            <a
              [href]="'tel:' + store.clinicInfo.phone"
              class="w-full sm:w-auto px-7 py-4 text-base font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <mat-icon class="text-teal-400">call</mat-icon>
              <span>Call: {{ store.clinicInfo.displayPhone }}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Main Footer Columns -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          <!-- Column 1: Brand Info -->
          <div class="space-y-4">
            <div class="flex items-center gap-2.5">
              <span class="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center">
                <mat-icon class="text-lg">medical_services</mat-icon>
              </span>
              <span class="text-lg font-bold text-white font-display">Smile Care Dental</span>
            </div>
            <p class="text-sm text-slate-400 leading-relaxed">
              Patient-centered dental care focused on oral wellness, gentle treatments, and modern clinical clarity.
            </p>
            <div class="pt-2 text-xs text-slate-400 space-y-1">
              <p>1420 Wellness Blvd, Suite 200</p>
              <p>Metro City, CA 90210</p>
            </div>
          </div>

          <!-- Column 2: Quick Navigation -->
          <div>
            <h3 class="text-xs font-bold uppercase tracking-wider text-white mb-4">Quick Navigation</h3>
            <ul class="space-y-2.5 text-sm">
              <li><a href="#hero" class="hover:text-white transition-colors">Home & Campaign</a></li>
              <li><a href="#offer" class="hover:text-white transition-colors">Free Checkup Inclusions</a></li>
              <li><a href="#why-choose" class="hover:text-white transition-colors">Why Choose Us</a></li>
              <li><a href="#how-it-works" class="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#booking-section" class="hover:text-white transition-colors">Book Free Checkup</a></li>
              <li><a href="#faq" class="hover:text-white transition-colors">Frequently Asked Questions</a></li>
            </ul>
          </div>

          <!-- Column 3: Services -->
          <div>
            <h3 class="text-xs font-bold uppercase tracking-wider text-white mb-4">Services</h3>
            <ul class="space-y-2.5 text-sm text-slate-400">
              <li><button type="button" (click)="prefillService('Preventive Care & Hygiene')" class="hover:text-teal-400 cursor-pointer text-left">Preventive & Oral Hygiene</button></li>
              <li><button type="button" (click)="prefillService('Cosmetic Dentistry & Whitening')" class="hover:text-teal-400 cursor-pointer text-left">Teeth Whitening & Aesthetics</button></li>
              <li><button type="button" (click)="prefillService('Restorative Care & Fillings')" class="hover:text-teal-400 cursor-pointer text-left">Tooth-Colored Fillings</button></li>
              <li><button type="button" (click)="prefillService('Orthodontics & Clear Aligners')" class="hover:text-teal-400 cursor-pointer text-left">Clear Aligners & Ortho</button></li>
              <li><button type="button" (click)="prefillService('Dental Implants & Crowns')" class="hover:text-teal-400 cursor-pointer text-left">Dental Implants & Crowns</button></li>
              <li><button type="button" (click)="prefillService('Gentle Emergency Care')" class="hover:text-teal-400 cursor-pointer text-left">Emergency Toothache Care</button></li>
            </ul>
          </div>

          <!-- Column 4: Contact & Hours -->
          <div class="space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-white mb-4">Clinic Hours & Contact</h3>
            <p class="text-xs text-slate-400">Mon–Fri: 8:00 AM – 6:00 PM</p>
            <p class="text-xs text-slate-400">Saturday: 9:00 AM – 2:00 PM</p>
            <p class="text-xs text-slate-500">Sunday: Closed</p>
            
            <div class="pt-2 space-y-1 text-xs">
              <a [href]="'tel:' + store.clinicInfo.phone" class="text-teal-400 hover:underline block font-semibold">
                {{ store.clinicInfo.displayPhone }}
              </a>
              <a [href]="'mailto:' + store.clinicInfo.email" class="text-slate-400 hover:text-white block">
                {{ store.clinicInfo.email }}
              </a>
            </div>
          </div>

        </div>

        <!-- Bottom Legal & Staff Access Bar -->
        <div class="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span>&copy; 2026 Smile Care Dental Clinic. All rights reserved.</span>
          </div>

          <div class="flex items-center gap-6">
            <button
              (click)="store.showPrivacyModal.set(true)"
              class="hover:text-slate-300 underline-offset-4 hover:underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              (click)="store.showTermsModal.set(true)"
              class="hover:text-slate-300 underline-offset-4 hover:underline cursor-pointer"
            >
              Terms of Offer
            </button>
            <button
              (click)="store.showStaffModal.set(true)"
              class="text-teal-400 hover:text-teal-300 flex items-center gap-1 cursor-pointer font-medium"
            >
              <mat-icon class="text-sm">admin_panel_settings</mat-icon>
              <span>Clinic Leads Portal</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  `,
})
export class Footer {
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

  prefillService(serviceName: string): void {
    this.store.prefilledConcern.set(serviceName);
    this.scrollToBooking();
  }
}
