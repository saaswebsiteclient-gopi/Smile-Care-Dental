import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentStore } from '../../services/appointment-store';

@Component({
  selector: 'app-location-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="location" class="py-20 bg-white border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <!-- Contact Details & Hours (7 cols) -->
          <div class="lg:col-span-7 space-y-8">
            <div>
              <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 mb-2">
                <span>Find Our Practice</span>
                <span aria-hidden="true">·</span>
                <span>Convenient Access</span>
              </div>
              <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
                Location, Hours & Direct Contact
              </h2>
              <p class="mt-3 text-base text-slate-600 leading-relaxed">
                Visit our modern clinic designed for your comfort and dental well-being. Conveniently situated with free parking directly in front of the building.
              </p>
            </div>

            <!-- Detail Cards Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <!-- Address -->
              <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div class="flex items-center gap-2.5 text-teal-700 font-bold text-sm mb-2">
                  <mat-icon class="text-xl">location_on</mat-icon>
                  <span>Clinic Address</span>
                </div>
                <p class="text-sm font-semibold text-slate-900">{{ store.clinicInfo.address }}</p>
                <p class="text-xs text-slate-500 mt-0.5">{{ store.clinicInfo.cityStateZip }}</p>
                <p class="text-xs text-teal-700 mt-2 font-medium flex items-center gap-1">
                  <mat-icon class="text-xs">local_parking</mat-icon>
                  <span>Free patient parking available</span>
                </p>
              </div>

              <!-- Phone & Direct Call -->
              <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div class="flex items-center gap-2.5 text-teal-700 font-bold text-sm mb-2">
                  <mat-icon class="text-xl">phone</mat-icon>
                  <span>Phone Inquiries</span>
                </div>
                <a [href]="'tel:' + store.clinicInfo.phone" class="text-sm font-bold text-slate-900 hover:text-teal-700 transition-colors">
                  {{ store.clinicInfo.displayPhone }}
                </a>
                <p class="text-xs text-slate-500 mt-0.5">Call or text for immediate scheduling</p>
                <div class="mt-2 text-xs text-slate-600 flex items-center gap-1">
                  <mat-icon class="text-xs text-teal-600">mail</mat-icon>
                  <span>{{ store.clinicInfo.email }}</span>
                </div>
              </div>

            </div>

            <!-- Operating Hours Panel -->
            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div class="flex items-center gap-2.5 text-slate-900 font-bold text-sm mb-4">
                <mat-icon class="text-xl text-teal-700">schedule</mat-icon>
                <span>Clinic Opening Hours</span>
              </div>
              <div class="space-y-2.5 text-sm">
                <div class="flex items-center justify-between pb-2 border-b border-slate-200/70">
                  <span class="text-slate-600">Monday – Friday</span>
                  <span class="font-semibold text-slate-900">{{ store.clinicInfo.openingHours.weekdays }}</span>
                </div>
                <div class="flex items-center justify-between pb-2 border-b border-slate-200/70">
                  <span class="text-slate-600">Saturday</span>
                  <span class="font-semibold text-slate-900">{{ store.clinicInfo.openingHours.saturday }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-slate-600">Sunday</span>
                  <span class="text-slate-500 italic">{{ store.clinicInfo.openingHours.sunday }}</span>
                </div>
              </div>
            </div>

            <!-- Direction Actions -->
            <div class="flex flex-wrap items-center gap-4">
              <a
                [href]="store.clinicInfo.googleMapsUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors"
              >
                <mat-icon class="text-sm text-teal-400">directions</mat-icon>
                <span>Open in Google Maps</span>
              </a>

              <a
                [href]="'tel:' + store.clinicInfo.phone"
                class="px-5 py-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <mat-icon class="text-sm">call</mat-icon>
                <span>Call Clinic Reception</span>
              </a>
            </div>

          </div>

          <!-- Interactive Google Maps View & Card (5 cols) -->
          <div class="lg:col-span-5">
            <div class="rounded-3xl border border-slate-200 overflow-hidden shadow-lg bg-slate-100 relative group">
              
              <!-- Clean styled Map graphic simulation with actual coordinates pin -->
              <div class="w-full h-80 bg-slate-200 relative overflow-hidden flex items-center justify-center">
                <!-- Abstract stylized map grid -->
                <div class="absolute inset-0 opacity-40 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                <!-- Stylized streets -->
                <div class="absolute w-full h-4 bg-white/70 top-1/3 -rotate-3"></div>
                <div class="absolute w-4 h-full bg-white/70 left-1/2 -rotate-3"></div>
                <div class="absolute w-full h-3 bg-teal-100/60 bottom-1/4 rotate-12"></div>

                <!-- Clinic Pin Centerpiece -->
                <div class="relative z-10 flex flex-col items-center animate-bounce">
                  <div class="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-xl border-2 border-white">
                    <mat-icon class="text-2xl">medical_services</mat-icon>
                  </div>
                  <div class="mt-2 bg-slate-900/90 text-white px-3 py-1 rounded-md text-xs font-bold tracking-tight shadow-md backdrop-blur-sm">
                    Smile Care Dental Clinic
                  </div>
                </div>

                <!-- Map corner badge -->
                <div class="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-700 shadow-sm border border-slate-200 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-teal-500"></span>
                  <span>1420 Wellness Blvd, Suite 200</span>
                </div>
              </div>

              <!-- Map Footer Details -->
              <div class="p-5 bg-white border-t border-slate-200 space-y-3">
                <div class="flex items-center justify-between text-xs text-slate-600">
                  <span class="font-medium text-slate-900">Suite 200 · 2nd Floor</span>
                  <span>Elevator & ADA Accessible</span>
                </div>
                <p class="text-xs text-slate-500 leading-relaxed">
                  Located in the Metro Wellness Plaza, conveniently right off the main boulevard. Dedicated visitor stalls marked "Smile Care Patient".
                </p>
                <a
                  [href]="store.clinicInfo.googleMapsUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-full py-2.5 px-4 text-xs font-semibold text-center text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-xl transition-colors block"
                >
                  Get Turn-by-Turn Driving Directions
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  `,
})
export class LocationContact {
  store = inject(AppointmentStore);
}
