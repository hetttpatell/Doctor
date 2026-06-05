# Aarjav Hospital Patient Portal — Design System & Specification

This document details the complete Design System, UI/UX patterns, visual style, and architectural components of the **Aarjav Hospital Patient Portal**. 

---

## 1. Product & Architecture Overview

* **Product Type:** Healthcare / Medical Booking Platform
* **Pattern:** Hero-Centric Split-Screen + Inline Interactive Booking Wizard
* **Target Audience:** Patients seeking rapid emergency, cardiology, or general medicine consultations, needing a frictionless, paperless scheduling system.
* **Core Philosophy:** Establish trust, clarity, and precision immediately. By placing the booking widget directly in the hero section and utilizing smooth transitions and micro-animations, the portal removes conventional scheduling friction.

---

## 2. Visual Style & Aesthetic (Clinical Tech)

The interface uses a **Clinical Tech / Dark Glassmorphism** aesthetic. This styling combines deep dark slate tones with vibrant clinical accents (blue/teal) to evoke the feeling of a state-of-the-art medical registry. Below-the-fold content transitions smoothly to a clean, crisp light mode (`#f8fafc`) to maximize readability for directories, testimonials, and contact information.

```
+-------------------------------------------------------------+
|                        HERO AREA                            |
|  [Dark Clinical Tech & Glassmorphic Booking Portal]          |
+-------------------------------------------------------------+
|                      TRANSITION ZONE                        |
|  [Smooth bottom-to-top light-mode gradient separator]        |
+-------------------------------------------------------------+
|                      LIGHT SECTIONS                         |
|  [Specialties, Doctors, Testimonials, & Contact Info]       |
+-------------------------------------------------------------+
```

---

## 3. Color Palette

The color system is declared in `src/index.css` inside the Tailwind CSS `@theme` block:

| Token Name | Value | Purpose |
| :--- | :--- | :--- |
| `--color-clinical-dark` | `#070a13` | Deep space background for the hero section |
| `--color-clinical-navy` | `#0d1527` | Card backgrounds and dark-mode component panels |
| `--color-clinical-blue` | `#2563eb` | Primary brand accent, primary CTA buttons, progress bars |
| `--color-clinical-teal` | `#0d9488` | Secondary brand accent, success indicators, ratings |
| `--color-clinical-glass`| `rgba(13, 21, 39, 0.6)` | Translucent overlays with blur effects |
| `--color-clinical-light`| `#f8fafc` | Main background for general body & directories |

### Contrast & Accessibility (WCAG AA Compliance)
* **Dark Mode Sections:** White text (`#ffffff`) or light slate (`#cbd5e1` / `#94a3b8`) on dark backgrounds ensures a contrast ratio exceeding `7:1`.
* **Light Mode Sections:** Charcoal/dark slate text (`#0f172a` / `#334155`) on light clinical background (`#f8fafc`) ensures a contrast ratio of `5.5:1` or higher.

---

## 4. Typography

Curated Google Fonts are imported directly inside the `index.html` file, providing high-end pairing between Display and Sans-Serif categories.

* **Display Font (Headings):** `Outfit` (Weights: 300, 400, 500, 600, 700, 800, 900)
  * Applied to: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`
  * Rationale: Modern, rounded geometric shapes convey professional tech-driven diagnostics.
* **Sans-Serif Font (Body & Labels):** `Inter` (Weights: 300, 400, 500, 600, 700, 800)
  * Applied to: paragraphs, lists, button text, form inputs, tooltips
  * Rationale: High legibility at small sizes, optimal for forms and instructions.

---

## 5. Layout & Components

### 5.1 Main Layout Grid
The website uses a responsive grid container (`max-w-7xl px-4 sm:px-6 lg:px-8`) that snaps beautifully at different viewport sizes:
* **Mobile (375px - 768px):** Single-column stacked layouts, touch-friendly target elements (min height `44px`).
* **Tablet (768px - 1024px):** Dual-column grid layouts with collapsed navbar toggles.
* **Desktop (1024px+):** Full 12-column layout. The hero uses a `50/50` split (left side brand content & stats, right side glassmorphic booking wizard).

### 5.2 Component Breakdown

1. **Navigation Bar (`Navbar.jsx`):**
   * Floating frosted-glass panel (`backdrop-blur-md`).
   * Persistent primary CTA ("Book Appointment") that auto-scrolls the view to the booking wizard and initiates the spotlight glow.
2. **Hero Section (`HeroSection.jsx`):**
   * Features glowing radial mesh circles (`.glowing-blob` with 80px blur) in the background.
   * Prominently exhibits NABH Accreditation and patient trust statistics.
3. **Interactive Booking Wizard (`BookingPortal.jsx`):**
   * A multi-step form utilizing React state variables:
     * **Step 1:** Specialty selection via graphic cards with SVG indicators.
     * **Step 2:** Doctor choosing (horizontal scroll list), date selection, and appointment slots.
     * **Step 3:** Patient name, email, phone, and symptoms notes.
     * **Success View:** Renders booking details and a secure confirmation code.
4. **Specialties & Doctors Directory (`SpecialtiesSection.jsx`, `DoctorsSection.jsx`):**
   * Highlights specialties via cards. Selecting a specialty or doctor automatically triggers a callback that populates the booking wizard with that selection and scrolls the user to the hero section.
5. **Interactive Map & Contact Section (`ContactSection.jsx`):**
   * Detailed hospital details and location map.

---

## 6. Micro-Interactions, Motion & Animations

The platform utilizes a combination of **CSS Transitions** and **GSAP (GreenSock)** animations to deliver a premium user feel.

### 6.1 GSAP Page Entry Sequence
On page load, if the user does not have a reduced-motion preference, GSAP coordinates a cascading entrance:
1. `.hero-badge` slides up & fades in.
2. `.hero-title` reveals with a 0.8s slide-up.
3. `.hero-subtitle` and stats row fade in.
4. `.hero-portal-wrap` (the Booking Wizard container) zooms slightly and floats up.
5. Trust badges stagger in dynamically.

### 6.2 Portal Spotlight Glow Effect
When a user clicks a "Book Now" link or selects a specialty/doctor card from the directory:
* The page scrolls smoothly to the booking portal.
* The `.portal-spotlight-active` class is attached to the widget, running a keyframe animation that pulses the box shadow to highlight focus:
```css
@keyframes portalSpotlight {
  0%, 100% {
    box-shadow: 0 0 20px 2px rgba(37, 99, 235, 0.15);
    border-color: rgba(37, 99, 235, 0.25);
  }
  50% {
    box-shadow: 0 0 40px 10px rgba(37, 99, 235, 0.6);
    border-color: rgba(96, 165, 250, 0.9);
  }
}
```

### 6.3 Hover & Transition Classes
* **Interactive Hover (`.interactive-hover`):** Apply `transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)` to prevent jerky states. Elements scale up `1.02x` and translate upwards by `-2px` on hover.
* **Glass Cards (`.glass-card`):** Soft transitions on backgrounds and border opacity:
  * Default: `rgba(255, 255, 255, 0.03)` background, `rgba(255, 255, 255, 0.05)` border.
  * Hover: `rgba(255, 255, 255, 0.06)` background, `rgba(59, 130, 246, 0.3)` border, blue shadow.

---

## 7. Performance & SEO Configuration

* **SEO Title Tag:** `Aarjav Hospital — Premium Booking Portal & Advanced Care`
* **Meta Description:** Compelling, optimized copy mentioning the clinical specialties, Bopal/Ahmedabad location, 4.9/5 stars rating, and 24/7 reservation features.
* **Semantic HTML:** Outfitted with `<header>`, `<main>`, `<section>`, `<footer>`, `<fieldset>`, and `<legend>` for step elements to preserve assistive tree hierarchy.
* **Performance Boosts:**
  * Uses `rel="preconnect"` links for fonts.
  * Responsive SVG icons instead of raster images.
  * Lightweight animations optimized to run on the GPU compositor thread.
