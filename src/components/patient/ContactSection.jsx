import { useState } from "react";
import { AlertCircle, Check } from "lucide-react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Full name is required.";
    if (!phone.trim()) newErrors.phone = "Phone number is required.";
    if (!message.trim()) newErrors.message = "Message text is required.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setSubmitted(false);
    setErrors({});
  };

  const hoursList = [
    { dept: "General Medicine", hours: "Mon – Sat, 9 AM – 8 PM" },
    { dept: "Emergency & Trauma", hours: "24 Hours, 7 Days a Week" },
    { dept: "Cardiology", hours: "Mon – Fri, 10 AM – 5 PM" },
    { dept: "Diagnostic Labs", hours: "24 Hours, 7 Days a Week" },
    { dept: "Outpatient Clinic", hours: "Mon – Sat, 9 AM – 7 PM" },
  ];

  return (
    <section
      id="contact-section"
      className="py-24 bg-color-bg-secondary"
    >
      <div className="container-main grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Side: Contact Form */}
        <div className="bg-color-surface border border-color-border rounded-xl p-8 shadow-sm text-left">
          <h3 className="font-serif text-2xl font-semibold text-color-text-primary mb-6">
            Get in Touch
          </h3>

          {submitted ? (
            <div className="flex flex-col items-center text-center py-8 gap-4 select-none">
              <div className="w-12 h-12 rounded-full bg-color-accent-light text-color-accent flex items-center justify-center">
                <Check className="w-6 h-6" strokeWidth={2.5} />
              </div>
              <h4 className="font-serif text-lg font-semibold text-color-text-primary">
                Message Sent Successfully!
              </h4>
              <p className="text-body-sm text-color-text-secondary max-w-sm mb-4">
                Thank you for contacting Aarjav Hospital. Our patient relations office will respond to you within 24 hours.
              </p>
              <button onClick={handleReset} className="btn-secondary px-6">
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Full Name */}
              <div>
                <label htmlFor="contact-name" className="block text-body-sm font-semibold text-color-text-primary mb-1.5">
                  Full Name <span className="text-color-error">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`input-field ${errors.name ? "error" : ""}`}
                  autoComplete="name"
                  required
                />
                {errors.name && (
                  <p className="text-color-error text-label font-medium mt-1 flex items-center gap-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="contact-email" className="block text-body-sm font-semibold text-color-text-primary mb-1.5">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`input-field ${errors.email ? "error" : ""}`}
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-color-error text-label font-medium mt-1 flex items-center gap-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="contact-phone" className="block text-body-sm font-semibold text-color-text-primary mb-1.5">
                  Phone Number <span className="text-color-error">*</span>
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`input-field ${errors.phone ? "error" : ""}`}
                  autoComplete="tel"
                  required
                />
                {errors.phone && (
                  <p className="text-color-error text-label font-medium mt-1 flex items-center gap-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-body-sm font-semibold text-color-text-primary mb-1.5">
                  Message / Inquiry <span className="text-color-error">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Describe your inquiry..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`input-field resize-none py-3 ${errors.message ? "error" : ""}`}
                  required
                />
                {errors.message && (
                  <p className="text-color-error text-label font-medium mt-1 flex items-center gap-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Submit */}
              <button type="submit" className="btn-primary w-full text-center mt-2">
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Right Side: Operational Details & Hours Map */}
        <div className="flex flex-col gap-6 text-left">
          <div className="flex flex-col gap-1">
            <h3 className="font-serif text-2xl font-semibold text-color-text-primary">
              Contact Details
            </h3>
            <p className="text-body-sm text-color-text-secondary">
              Aarjav Hospital clinical campuses and operation timings.
            </p>
          </div>

          {/* Details Block */}
          <div className="flex flex-col gap-3.5 text-body-sm text-color-text-secondary select-none">
            <p>
              <strong>Aarjav Hospital Campus</strong><br />
              TCB THE-CORNER BLOCK, 301-305, opp. CELEBRATION CITY CENTER,<br />
              South Bopal, Bopal, Ahmedabad, Gujarat 380058
            </p>
            <p>General Consultation: +91 98598 58685</p>
            <p>Emergency Hotline: +91 98598 58686</p>
            <p>Email Inquiry: info@aarjavhospital.com</p>
          </div>

          {/* Hours of Operation Table */}
          <div className="border border-color-border rounded-lg overflow-hidden bg-color-surface select-none">
            <table className="w-full text-left border-collapse text-body-sm">
              <thead>
                <tr className="bg-color-bg-secondary border-b border-color-border">
                  <th className="p-3.5 font-semibold text-color-text-primary">Department</th>
                  <th className="p-3.5 font-semibold text-color-text-primary">Hours</th>
                </tr>
              </thead>
              <tbody>
                {hoursList.map((item, index) => (
                  <tr key={index} className="border-b border-color-border/60 last:border-none">
                    <td className="p-3.5 text-color-text-primary font-medium">{item.dept}</td>
                    <td className="p-3.5 text-color-text-secondary">{item.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Map Frame */}
          <div className="w-full h-52 rounded-lg overflow-hidden border border-color-border shadow-sm">
            <iframe
              title="Aarjav Hospital Detailed Map Locator"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.4839843657386!2d72.46950267606774!3d23.006008679185253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9bca9a555555%3A0x6bfa9f8e404b998a!2sSouth%20Bopal%2C%20Bopal%2C%20Ahmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1717590000000!5m2!1sen!2sin"
              className="w-full h-full border-none"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
