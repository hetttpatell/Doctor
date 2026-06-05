import { Check, Mail, MapPin, Phone } from "lucide-react";
import BookingWizard from "./BookingWizard";

export default function BookingSection({ bookingState }) {
  const benefits = [
    "Instant appointment slot confirmation",
    "Choice of leading board-certified consultants",
    "No registration fees or waiting in line",
    "Digital receipt and clinical summary download",
  ];

  return (
    <section
      id="booking-section"
      className="py-24 bg-color-bg-primary"
    >
      <div className="container-main grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Side: Contextual Info Panel (35%) */}
        <div className="lg:col-span-5 flex flex-col gap-6 text-left">
          <div className="flex flex-col gap-2">
            <span className="text-label text-color-accent font-semibold uppercase tracking-widest">
              Online Scheduling
            </span>
            <h2 className="text-section text-color-text-primary">
              Why Book Online?
            </h2>
            <p className="text-body text-color-text-secondary">
              Reserve your consultation slots directly in our clinical calendar system for priority access.
            </p>
          </div>

          {/* Benefits Checkpoints */}
          <ul className="flex flex-col gap-3.5 my-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3 text-body-sm text-color-text-secondary leading-tight">
                <span className="w-5 h-5 rounded-full bg-color-accent-light text-color-accent flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          {/* Contact Details */}
          <div className="flex flex-col gap-4 pt-6 border-t border-color-border/60">
            <div className="flex items-start gap-3.5 text-body-sm text-color-text-secondary">
              <MapPin className="w-5 h-5 text-color-accent shrink-0 mt-0.5" strokeWidth={1.5} />
              <span>
                <strong>Aarjav Hospital</strong><br />
                TCB The Corner Block, South Bopal,<br />
                Ahmedabad, Gujarat 380058
              </span>
            </div>
            <div className="flex items-center gap-3.5 text-body-sm text-color-text-secondary">
              <Phone className="w-5 h-5 text-color-accent shrink-0" strokeWidth={1.5} />
              <span>+91 98598 58685</span>
            </div>
            <div className="flex items-center gap-3.5 text-body-sm text-color-text-secondary">
              <Mail className="w-5 h-5 text-color-accent shrink-0" strokeWidth={1.5} />
              <span>contact@aarjavhospital.com</span>
            </div>
          </div>

          {/* Embedded Map */}
          <div className="w-full h-44 rounded-lg overflow-hidden border border-color-border shadow-xs mt-2">
            <iframe
              title="Aarjav Hospital Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.4839843657386!2d72.46950267606774!3d23.006008679185253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9bca9a555555%3A0x6bfa9f8e404b998a!2sSouth%20Bopal%2C%20Bopal%2C%20Ahmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1717590000000!5m2!1sen!2sin"
              className="w-full h-full border-none"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Right Side: Step Wizard Card (65%) */}
        <div className="lg:col-span-7 flex justify-center items-start">
          <BookingWizard bookingState={bookingState} />
        </div>
      </div>
    </section>
  );
}
