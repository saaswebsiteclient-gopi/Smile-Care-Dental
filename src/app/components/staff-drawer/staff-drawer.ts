import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentStore } from '../../services/appointment-store';
import { AppointmentLead } from '../../models/clinic.model';

@Component({
  selector: 'app-staff-drawer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    @if (store.showStaffModal()) {
      <div class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end animate-in fade-in">
        
        <div class="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col border-l border-slate-200">
          
          <!-- Header -->
          <div class="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div>
              <div class="flex items-center gap-2">
                <span class="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center">
                  <mat-icon class="text-lg">contacts</mat-icon>
                </span>
                <h3 class="text-lg font-bold text-slate-900 font-display">Clinic Leads Coordinator</h3>
              </div>
              <p class="text-xs text-slate-500 mt-1">
                Manage inbound free checkup leads, confirm schedules, and export to CRM / Supabase.
              </p>
            </div>

            <button
              (click)="store.showStaffModal.set(false)"
              aria-label="Close portal"
              class="p-2 text-slate-400 hover:text-slate-700 rounded-lg"
            >
              <mat-icon>close</mat-icon>
            </button>
          </div>

          <!-- Quick Stats & Actions Bar -->
          <div class="px-6 py-4 border-b border-slate-200 bg-white flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-4 text-xs">
              <span class="text-slate-600">Total Leads: <strong class="text-slate-900 font-bold">{{ store.leads().length }}</strong></span>
              <span class="text-slate-400">·</span>
              <span class="text-teal-700 font-medium">Pending: {{ pendingCount() }}</span>
              <span class="text-slate-400">·</span>
              <span class="text-emerald-700 font-medium">Confirmed: {{ confirmedCount() }}</span>
            </div>

            <button
              (click)="store.exportLeadsCSV()"
              class="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <mat-icon class="text-sm">download</mat-icon>
              <span>Export CSV</span>
            </button>
          </div>

          <!-- Leads List Container -->
          <div class="flex-1 overflow-y-auto p-6 space-y-4">
            @if (store.leads().length === 0) {
              <div class="py-12 text-center text-slate-400 space-y-2">
                <mat-icon class="text-4xl text-slate-300">inbox</mat-icon>
                <p class="text-sm font-medium">No appointment leads received yet.</p>
                <p class="text-xs">Leads submitted through the public website will appear here in real time.</p>
              </div>
            } @else {
              @for (lead of store.leads(); track lead.id) {
                <div class="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-3 hover:border-slate-300 transition-colors">
                  
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {{ lead.referenceCode }}
                        </span>
                        <h4 class="text-base font-bold text-slate-900">{{ lead.fullName }}</h4>
                      </div>
                      <div class="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        <a [href]="'tel:' + lead.phoneNumber" class="text-teal-700 hover:underline flex items-center gap-1">
                          <mat-icon class="text-xs">phone</mat-icon>
                          <span>{{ lead.phoneNumber }}</span>
                        </a>
                        <span>·</span>
                        <a [href]="'mailto:' + lead.email" class="hover:text-slate-800 flex items-center gap-1">
                          <mat-icon class="text-xs">mail</mat-icon>
                          <span>{{ lead.email }}</span>
                        </a>
                      </div>
                    </div>

                    <!-- Status Selector -->
                    <select
                      [value]="lead.status"
                      (change)="onStatusChange(lead.id, $event)"
                      class="text-xs font-semibold px-2.5 py-1.5 rounded-lg border focus:ring-1 focus:ring-teal-500"
                      [class.bg-amber-50]="lead.status === 'pending_confirmation'"
                      [class.text-amber-800]="lead.status === 'pending_confirmation'"
                      [class.border-amber-200]="lead.status === 'pending_confirmation'"
                      [class.bg-emerald-50]="lead.status === 'confirmed'"
                      [class.text-emerald-800]="lead.status === 'confirmed'"
                      [class.border-emerald-200]="lead.status === 'confirmed'"
                      [class.bg-slate-100]="lead.status === 'rescheduled' || lead.status === 'cancelled'"
                      [class.text-slate-700]="lead.status === 'rescheduled' || lead.status === 'cancelled'"
                      [class.border-slate-200]="lead.status === 'rescheduled' || lead.status === 'cancelled'"
                    >
                      <option value="pending_confirmation">Pending Confirmation</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="rescheduled">Rescheduled</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <!-- Details -->
                  <div class="p-3 bg-slate-50 rounded-xl text-xs space-y-1 text-slate-600">
                    <p><strong>Requested:</strong> {{ lead.preferredDate }} · {{ lead.preferredTime }}</p>
                    <p><strong>Concern:</strong> {{ lead.dentalConcern }}</p>
                    @if (lead.notes) {
                      <p><strong>Notes:</strong> {{ lead.notes }}</p>
                    }
                  </div>

                  <!-- Footer of card -->
                  <div class="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Submitted {{ formatDate(lead.createdAt) }}</span>
                    <button
                      (click)="store.deleteLead(lead.id)"
                      class="text-red-500 hover:text-red-700 flex items-center gap-0.5 cursor-pointer"
                    >
                      <mat-icon class="text-xs">delete</mat-icon>
                      <span>Delete</span>
                    </button>
                  </div>

                </div>
              }
            }
          </div>

          <!-- Bottom Info -->
          <div class="p-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-500 flex items-center justify-between">
            <span>Prepared for Supabase / PostgreSQL backend integration</span>
            <button
              (click)="store.showStaffModal.set(false)"
              class="px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-slate-800"
            >
              Close
            </button>
          </div>

        </div>

      </div>
    }
  `,
})
export class StaffDrawer {
  store = inject(AppointmentStore);

  pendingCount = computed(() => {
    return this.store.leads().filter(l => l.status === 'pending_confirmation').length;
  });

  confirmedCount = computed(() => {
    return this.store.leads().filter(l => l.status === 'confirmed').length;
  });

  onStatusChange(id: string, event: Event): void {
    const val = (event.target as HTMLSelectElement).value as AppointmentLead['status'];
    this.store.updateLeadStatus(id, val);
  }

  formatDate(isoDate: string): string {
    try {
      const d = new Date(isoDate);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return isoDate;
    }
  }
}
