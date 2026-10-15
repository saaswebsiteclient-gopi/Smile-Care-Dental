import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { Offer } from './components/offer/offer';
import { WhyChoose } from './components/why-choose/why-choose';
import { ServicesList } from './components/services-list/services-list';
import { HowItWorks } from './components/how-it-works/how-it-works';
import { AppointmentForm } from './components/appointment-form/appointment-form';
import { Testimonials } from './components/testimonials/testimonials';
import { Faq } from './components/faq/faq';
import { LocationContact } from './components/location-contact/location-contact';
import { Footer } from './components/footer/footer';
import { MobileStickyCta } from './components/mobile-sticky-cta/mobile-sticky-cta';
import { StaffDrawer } from './components/staff-drawer/staff-drawer';
import { LegalModal } from './components/legal-modal/legal-modal';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Navbar,
    Hero,
    Offer,
    WhyChoose,
    ServicesList,
    HowItWorks,
    AppointmentForm,
    Testimonials,
    Faq,
    LocationContact,
    Footer,
    MobileStickyCta,
    StaffDrawer,
    LegalModal,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
