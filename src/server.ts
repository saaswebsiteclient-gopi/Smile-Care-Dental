import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import {join} from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(express.json());

interface AppointmentLead {
  id: string;
  referenceCode: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  dentalConcern: string;
  notes?: string;
  status: 'pending_confirmation' | 'confirmed' | 'rescheduled' | 'cancelled';
  createdAt: string;
}

// In-memory store for appointment leads (can easily be mapped to Supabase/PostgreSQL)
const leadsStore: AppointmentLead[] = [
  {
    id: 'seed-lead-1',
    referenceCode: 'SCD-8291',
    fullName: 'David K. Miller',
    phoneNumber: '(555) 234-5678',
    email: 'david.miller@example.com',
    preferredDate: '2026-10-20',
    preferredTime: '10:00 AM',
    dentalConcern: 'Routine checkup & tooth sensitivity',
    notes: 'Looking for a new family dental clinic close to home.',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'seed-lead-2',
    referenceCode: 'SCD-9412',
    fullName: 'Sarah Jenkins',
    phoneNumber: '(555) 876-5432',
    email: 'sarah.j@example.com',
    preferredDate: '2026-10-22',
    preferredTime: '02:30 PM',
    dentalConcern: 'Cosmetic consultation & general assessment',
    notes: 'Interested in clear aligners after initial assessment.',
    status: 'pending_confirmation',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  }
];

// POST /api/appointments: Book Free Checkup
app.post('/api/appointments', (req, res) => {
  const { fullName, phoneNumber, email, preferredDate, preferredTime, dentalConcern, notes } = req.body;

  if (!fullName || !phoneNumber || !email) {
    return res.status(400).json({
      error: 'Full name, phone number, and email are required to book your free checkup.',
    });
  }

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const referenceCode = `SCD-${randomNum}`;
  const newLead: AppointmentLead = {
    id: 'lead-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    referenceCode,
    fullName: String(fullName).trim(),
    phoneNumber: String(phoneNumber).trim(),
    email: String(email).trim().toLowerCase(),
    preferredDate: String(preferredDate || 'Earliest Available'),
    preferredTime: String(preferredTime || 'Morning (9:00 AM - 12:00 PM)'),
    dentalConcern: String(dentalConcern || 'General Checkup'),
    notes: notes ? String(notes).trim() : '',
    status: 'pending_confirmation',
    createdAt: new Date().toISOString(),
  };

  leadsStore.unshift(newLead);

  return res.status(201).json({
    success: true,
    message: 'Free dental checkup appointment requested successfully.',
    appointment: newLead,
  });
});

// GET /api/appointments: List appointment leads
app.get('/api/appointments', (_req, res) => {
  return res.json({
    total: leadsStore.length,
    appointments: leadsStore,
  });
});

// PATCH /api/appointments/:id: Update status
app.patch('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const lead = leadsStore.find((item) => item.id === id);

  if (!lead) {
    return res.status(404).json({ error: 'Appointment lead not found.' });
  }

  if (status && ['pending_confirmation', 'confirmed', 'rescheduled', 'cancelled'].includes(status)) {
    lead.status = status;
  }

  return res.json({ success: true, appointment: lead });
});


/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
