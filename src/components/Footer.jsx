import { hospitalDetails } from "../data/hospitalData";

export default function Footer({ onBookNow }) {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Services",
      links: [
        { label: "General Medicine", href: "#specialties" },
        { label: "Emergency Care", href: "#specialties" },
        { label: "Cardiology", href: "#specialties" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { label: "Our Doctors", href: "#doctors" },
        { label: "Patient Reviews", href: "#reviews" },
        { label: "Contact Us", href: "#contact" },
      ],
    },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="bg-[#070a13] text-white border-t border-white/5 font-sans" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-tr from-blue-600 to-teal-500 rounded-xl shadow-md">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
              <span className="text-lg font-black tracking-wider font-display">
                AARJAV<span className="text-blue-500 font-semibold">.HOSPITAL</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {hospitalDetails.address}
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-500/20">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  Trauma Desk Open 24/7
                </span>
                <a
                  href={`tel:${hospitalDetails.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white text-sm font-semibold transition-colors duration-200"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  {hospitalDetails.phone}
                </a>
              </div>
              <div>
                <button
                  type="button"
                  onClick={onBookNow}
                  className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold font-display uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer"
                >
                  Book Consultation Online
                </button>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4 font-display">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-slate-400 hover:text-white text-sm transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs">
            &copy; {currentYear} {hospitalDetails.name}. All rights reserved.
          </p>
          <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider font-display">
            Compassionate Care · Advanced Medicine
          </p>
        </div>
      </div>
    </footer>
  );
}
