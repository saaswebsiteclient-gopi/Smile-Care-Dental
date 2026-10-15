import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentStore } from '../../services/appointment-store';

@Component({
  selector: 'app-legal-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <!-- Privacy Policy Modal -->
    @if (store.showPrivacyModal()) {
      <div class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
        <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative max-h-[85vh] flex flex-col">
          <div class="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 class="text-lg font-bold text-slate-900 font-display">Patient Privacy Policy</h3>
            <button (click)="store.showPrivacyModal.set(false)" class="text-slate-400 hover:text-slate-700 p-1 rounded-lg">
              <mat-icon>close</mat-icon>
            </button>
          </div>
          <div class="flex-1 overflow-y-auto py-4 space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p><strong>Smile Care Dental Clinic</strong> is committed to safeguarding patient confidentiality and personal health information.</p>
            <p>1. <strong>Information We Collect:</strong> When you submit a booking request for the Free Dental Checkup, we collect your name, phone number, email address, preferred date/time, and oral health concerns strictly to facilitate your appointment.</p>
            <p>2. <strong>Use of Information:</strong> Contact information is used solely by our clinic team to confirm your visit, send appointment reminders, and prepare clinical records.</p>
            <p>3. <strong>Data Protection:</strong> We never sell, rent, or distribute patient contact details to third-party advertisers. All records are maintained under rigorous healthcare privacy guidelines.</p>
            <p>4. <strong>Inquiries:</strong> If you have questions regarding your data, please contact our privacy officer at care@smilecaredental.com or (555) 382-7645.</p>
          </div>
          <div class="pt-3 border-t border-slate-200 flex justify-end">
            <button (click)="store.showPrivacyModal.set(false)" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold">
              Close
            </button>
          </div>
        </div>
      </div>
    }

    <!-- Terms of Campaign Offer Modal -->
    @if (store.showTermsModal()) {
      <div class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
        <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative max-h-[85vh] flex flex-col">
          <div class="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 class="text-lg font-bold text-slate-900 font-display">Terms of Free Dental Checkup Offer</h3>
            <button (click)="store.showTermsModal.set(false)" class="text-slate-400 hover:text-slate-700 p-1 rounded-lg">
              <mat-icon>close</mat-icon>
            </button>
          </div>
          <div class="flex-1 overflow-y-auto py-4 space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p><strong>Smile Care Dental Clinic - Free Checkup Campaign Terms:</strong></p>
            <p>1. <strong>Eligibility:</strong> The Free Dental Checkup campaign is available to new patients visiting Smile Care Dental Clinic for their initial appointment.</p>
            <p>2. <strong>Inclusions:</strong> The complimentary appointment includes a visual dental examination, oral health screening, one-on-one consultation with our licensed dentist, and personalized treatment recommendations.</p>
            <p>3. <strong>No Obligation:</strong> Patients are under zero financial or clinical obligation to proceed with any additional treatment, specialized imaging, or preventative cleaning.</p>
            <p>4. <strong>Additional Care:</strong> Should the dentist recommend further restorative or preventative care, a transparent quote with all clinical details will be provided in writing for the patient's prior consent.</p>
            <p>5. <strong>Scheduling:</strong> Subject to clinic chair availability. Booking submission is confirmed once our coordinator verifies the reservation.</p>
          </div>
          <div class="pt-3 border-t border-slate-200 flex justify-end">
            <button (click)="store.showTermsModal.set(false)" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold">
              I Understand
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class LegalModal {
  store = inject(AppointmentStore);
}
