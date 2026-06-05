import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Phone } from "lucide-react";

export default function Footer() {
  const handleNavClick = (e, targetId) => {
    // If not on "/", we can let standard scroll link trigger or fallback
    const el = document.querySelector(targetId);
    if (el) {
      e.preventDefault();
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-color-bg-dark text-color-text-inverse pt-20 pb-8 border-t border-white/5">
      <div className="container-main grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Column 1: Hospital Info */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <span className="font-serif text-3xl font-semibold leading-tight tracking-wide text-white">
              Aarjav
            </span>
            <span className="text-[11px] font-sans uppercase tracking-widest text-color-text-muted leading-none">
              Hospital
            </span>
          </div>
          <p className="text-body-sm text-color-text-muted leading-relaxed">
            Delivering advanced clinical precision and compassionate care in a state-of-the-art healing environment.
          </p>
          <div className="flex items-center gap-4 text-white/70">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-color-accent transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-color-accent transition-colors" aria-label="Facebook">
              <Facebook className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-color-accent transition-colors" aria-label="Instagram">
              <Instagram className="w-5 h-5" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-sans text-sm font-semibold tracking-wider uppercase text-white mb-6">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-3.5 text-body-sm text-color-text-muted">
            <li>
              <a href="#home" onClick={(e) => handleNavClick(e, "#home")} className="hover:text-color-accent transition-colors cursor-pointer">Home</a>
            </li>
            <li>
              <a href="#about-section" onClick={(e) => handleNavClick(e, "#about-section")} className="hover:text-color-accent transition-colors cursor-pointer">About Us</a>
            </li>
            <li>
              <a href="#specialties-section" onClick={(e) => handleNavClick(e, "#specialties-section")} className="hover:text-color-accent transition-colors cursor-pointer">Specialties</a>
            </li>
            <li>
              <a href="#doctors-section" onClick={(e) => handleNavClick(e, "#doctors-section")} className="hover:text-color-accent transition-colors cursor-pointer">Our Doctors</a>
            </li>
            <li>
              <a href="#contact-section" onClick={(e) => handleNavClick(e, "#contact-section")} className="hover:text-color-accent transition-colors cursor-pointer">Contact</a>
            </li>
            <li>
              <Link to="/doctor" className="hover:text-color-accent transition-colors">Doctor Portal Login</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Specialties */}
        <div>
          <h4 className="font-sans text-sm font-semibold tracking-wider uppercase text-white mb-6">
            Our Specialties
          </h4>
          <ul className="flex flex-col gap-3.5 text-body-sm text-color-text-muted">
            <li>
              <a href="#booking-section" onClick={(e) => handleNavClick(e, "#booking-section")} className="hover:text-color-accent transition-colors cursor-pointer">Cardiology</a>
            </li>
            <li>
              <a href="#booking-section" onClick={(e) => handleNavClick(e, "#booking-section")} className="hover:text-color-accent transition-colors cursor-pointer">Neurology</a>
            </li>
            <li>
              <a href="#booking-section" onClick={(e) => handleNavClick(e, "#booking-section")} className="hover:text-color-accent transition-colors cursor-pointer">Orthopedics</a>
            </li>
            <li>
              <a href="#booking-section" onClick={(e) => handleNavClick(e, "#booking-section")} className="hover:text-color-accent transition-colors cursor-pointer">Pediatrics</a>
            </li>
            <li>
              <a href="#booking-section" onClick={(e) => handleNavClick(e, "#booking-section")} className="hover:text-color-accent transition-colors cursor-pointer">Oncology</a>
            </li>
            <li>
              <a href="#booking-section" onClick={(e) => handleNavClick(e, "#booking-section")} className="hover:text-color-accent transition-colors cursor-pointer">Gynecology</a>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="flex flex-col gap-6">
          <h4 className="font-sans text-sm font-semibold tracking-wider uppercase text-white">
            Contact Info
          </h4>
          <div className="flex flex-col gap-3 text-body-sm text-color-text-muted">
            <p>
              TCB The Corner Block, 301-305,<br />
              Opp. Celebration City Center, South Bopal,<br />
              Ahmedabad, Gujarat 380058
            </p>
            <p>Phone: +91 98598 58685</p>
            <p>Email: contact@aarjavhospital.com</p>
          </div>
          {/* Emergency number CTA */}
          <div className="flex items-center gap-3 p-3.5 bg-color-accent/10 border border-color-accent/20 rounded-lg text-color-accent-light">
            <Phone className="w-5 h-5 text-color-accent" strokeWidth={2} />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-white/50 leading-none">Emergency Hotline</span>
              <span className="font-semibold text-white leading-tight font-sans mt-0.5">+91 98598 58686</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container-main pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-caption text-color-text-muted">
          &copy; {new Date().getFullYear()} Aarjav Hospital. All rights reserved.
        </span>
        <div className="flex gap-6 text-caption text-color-text-muted">
          <a href="#privacy" className="hover:text-color-accent transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-color-accent transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
