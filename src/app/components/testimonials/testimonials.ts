import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentStore } from '../../services/appointment-store';
import { TestimonialItem } from '../../models/clinic.model';

@Component({
  selector: 'app-testimonials',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatIconModule],
  template: `
    <section id="testimonials" class="py-20 bg-white border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 mb-2">
              <span>Patient Experiences</span>
              <span aria-hidden="true">·</span>
              <span>Authentic Feedback</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
              What Patients Value at Smile Care
            </h2>
            <p class="mt-2 text-base text-slate-600 max-w-2xl">
              Real feedback from patients who have visited our clinic for complimentary checkups and dental treatments.
            </p>
          </div>

          <button
            (click)="showReviewModal.set(true)"
            class="px-4 py-2.5 rounded-xl border border-slate-200 hover:border-teal-300 text-xs font-semibold text-slate-700 hover:text-teal-800 bg-slate-50 transition-colors flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
          >
            <mat-icon class="text-base text-teal-600">rate_review</mat-icon>
            <span>Leave Patient Feedback</span>
          </button>
        </div>

        <!-- Reviews Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          @for (review of store.testimonials(); track review.id) {
            <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <!-- Stars & Visit Type -->
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center text-amber-400">
                    @for (star of [1,2,3,4,5]; track star) {
                      <mat-icon class="text-lg">star</mat-icon>
                    }
                  </div>
                  <span class="text-[11px] font-medium text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/60">
                    {{ review.visitType }}
                  </span>
                </div>

                <!-- Review Content -->
                <p class="text-sm text-slate-700 leading-relaxed italic">
                  "{{ review.comment }}"
                </p>
              </div>

              <!-- Author Info -->
              <div class="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-teal-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {{ review.initials }}
                </div>
                <div>
                  <h4 class="text-xs font-bold text-slate-900">{{ review.patientName }}</h4>
                  <p class="text-[11px] text-slate-500">{{ review.date }}</p>
                </div>
              </div>
            </div>
          }
        </div>

        <!-- Future Reviews Disclaimer Notice -->
        <p class="mt-8 text-center text-xs text-slate-400">
          Reviews are collected following in-clinic appointments to continually refine patient comfort and clinical clarity.
        </p>

      </div>

      <!-- Add Review Modal -->
      @if (showReviewModal()) {
        <div class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
            
            <button
              (click)="showReviewModal.set(false)"
              class="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg"
            >
              <mat-icon>close</mat-icon>
            </button>

            <h3 class="text-xl font-bold text-slate-900 font-display mb-1">Add Patient Feedback</h3>
            <p class="text-xs text-slate-500 mb-4">Share your recent appointment experience with Smile Care.</p>

            <form [formGroup]="reviewForm" (ngSubmit)="submitReview()" class="space-y-4">
              <div>
                <label for="review-author-name" class="block text-xs font-bold text-slate-700 uppercase mb-1">Your Name / Initials</label>
                <input
                  id="review-author-name"
                  type="text"
                  formControlName="name"
                  placeholder="e.g. Rachel S."
                  class="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label for="review-visit-type" class="block text-xs font-bold text-slate-700 uppercase mb-1">Visit Type</label>
                <select
                  id="review-visit-type"
                  formControlName="visitType"
                  class="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                >
                  <option value="Complimentary Free Checkup">Complimentary Free Checkup</option>
                  <option value="Oral Health Assessment">Oral Health Assessment</option>
                  <option value="Routine Hygiene Cleaning">Routine Hygiene Cleaning</option>
                  <option value="Cosmetic Consultation">Cosmetic Consultation</option>
                </select>
              </div>

              <div>
                <label for="review-comment-text" class="block text-xs font-bold text-slate-700 uppercase mb-1">Feedback Comments</label>
                <textarea
                  id="review-comment-text"
                  formControlName="comment"
                  rows="3"
                  placeholder="Tell us how your visit felt, dentist clarity, and clinic comfort..."
                  class="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                ></textarea>
              </div>

              <div class="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  (click)="showReviewModal.set(false)"
                  class="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  [disabled]="reviewForm.invalid"
                  class="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg disabled:opacity-50"
                >
                  Save Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </section>
  `,
})
export class Testimonials {
  store = inject(AppointmentStore);
  showReviewModal = signal<boolean>(false);

  reviewForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    visitType: new FormControl('Complimentary Free Checkup', [Validators.required]),
    comment: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  submitReview(): void {
    if (this.reviewForm.invalid) return;

    const val = this.reviewForm.value;
    const initials = (val.name || 'PT')
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);

    const newReview: TestimonialItem = {
      id: 'rev-' + Date.now(),
      initials: initials || 'PT',
      patientName: val.name || 'Patient',
      visitType: val.visitType || 'Free Checkup',
      date: 'Just Now',
      rating: 5,
      comment: val.comment || '',
      isPlaceholder: false,
    };

    this.store.testimonials.update(prev => [newReview, ...prev]);
    this.reviewForm.reset({
      name: '',
      visitType: 'Complimentary Free Checkup',
      comment: '',
    });
    this.showReviewModal.set(false);
  }
}
