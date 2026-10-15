import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentStore } from '../../services/appointment-store';

@Component({
  selector: 'app-faq',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="faq" class="py-20 bg-slate-50 border-b border-slate-200/80">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-14">
          <div class="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 mb-2">
            <span>Clear Answers</span>
            <span aria-hidden="true">·</span>
            <span>Zero Surprises</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
            Frequently Asked Questions
          </h2>
          <p class="mt-3 text-base text-slate-600">
            Have questions about our complimentary dental checkup campaign? Here are direct, straightforward answers.
          </p>
        </div>

        <!-- FAQ Accordion -->
        <div class="space-y-4">
          @for (faq of store.faqs; track faq.question; let idx = $index) {
            <div class="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-colors">
              <button
                type="button"
                (click)="toggleFaq(idx)"
                class="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-display font-bold text-slate-900 text-base sm:text-lg hover:text-teal-700 transition-colors cursor-pointer"
              >
                <span>{{ faq.question }}</span>
                <span class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <mat-icon class="text-xl transition-transform duration-200" [class.rotate-180]="openIndex() === idx">
                    expand_more
                  </mat-icon>
                </span>
              </button>

              @if (openIndex() === idx) {
                <div class="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in">
                  {{ faq.answer }}
                </div>
              }
            </div>
          }
        </div>

        <!-- Need Help Callout -->
        <div class="mt-12 bg-white rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <mat-icon class="text-xl">help_outline</mat-icon>
            </div>
            <div>
              <p class="text-sm font-bold text-slate-900">Have a specific question or dental anxiety?</p>
              <p class="text-xs text-slate-500">Our front-desk team is happy to chat before your appointment.</p>
            </div>
          </div>

          <a
            [href]="'tel:' + store.clinicInfo.phone"
            class="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <mat-icon class="text-teal-600 text-sm">call</mat-icon>
            <span>Call {{ store.clinicInfo.displayPhone }}</span>
          </a>
        </div>

      </div>
    </section>
  `,
})
export class Faq {
  store = inject(AppointmentStore);
  openIndex = signal<number | null>(0); // first item open by default

  toggleFaq(index: number): void {
    if (this.openIndex() === index) {
      this.openIndex.set(null);
    } else {
      this.openIndex.set(index);
    }
  }
}
