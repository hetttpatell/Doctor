import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileOpen(false);

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: targetId } });
      return;
    }

    const element = document.querySelector(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const navLinks = [
    { label: "Home", target: "#home" },
    { label: "About", target: "#about-section" },
    { label: "Specialties", target: "#specialties-section" },
    { label: "Doctors", target: "#doctors-section" },
    { label: "Contact", target: "#contact-section" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-color-border shadow-sm text-color-text-primary"
          : "bg-transparent text-white"
      }`}
    >
      <div className="container-main flex items-center justify-between h-20">
        {/* Wordmark Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="flex flex-col select-none cursor-pointer focus:outline-none"
        >
          <span className="font-serif text-2xl font-semibold leading-tight tracking-wide">
            Aarjav
          </span>
          <span className={`text-[10px] font-sans uppercase tracking-widest leading-none ${isScrolled ? 'text-color-text-secondary' : 'text-white/80'}`}>
            Hospital
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.target}
              href={link.target}
              onClick={(e) => handleNavClick(e, link.target)}
              className="text-body-sm font-semibold tracking-wide hover:text-color-accent transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/doctor"
            className="text-body-sm font-semibold tracking-wide hover:text-color-accent transition-colors"
          >
            Doctor Portal
          </Link>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a
            href="#booking-section"
            onClick={(e) => handleNavClick(e, "#booking-section")}
            className="btn-primary"
          >
            Book Appointment
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 -mr-2 cursor-pointer focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? (
              <X className="w-6 h-6" strokeWidth={1.5} />
            ) : (
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileOpen && (
        <div className="md:hidden bg-white border-t border-color-border shadow-lg">
          <div className="container-main py-6 flex flex-col gap-4 text-color-text-primary">
            {navLinks.map((link) => (
              <a
                key={link.target}
                href={link.target}
                onClick={(e) => handleNavClick(e, link.target)}
                className="text-body font-medium py-2 border-b border-color-border/40 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/doctor"
              onClick={() => setIsMobileOpen(false)}
              className="text-body font-medium py-2 border-b border-color-border/40"
            >
              Doctor Portal
            </Link>
            <a
              href="#booking-section"
              onClick={(e) => handleNavClick(e, "#booking-section")}
              className="btn-primary w-full text-center justify-center mt-2"
            >
              Book Appointment
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
