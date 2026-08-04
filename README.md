# IoTify — Premium IoT Landing Page

A production-ready React 19 + Vite + Tailwind CSS landing page for "IoTify",
featuring a dark, glassmorphic, futuristic design with the NVIDIA Jetson Nano
neon illustration as the hero centerpiece.

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Framer Motion
- GSAP (installed, available for further scroll/timeline work)
- Lucide React
- React Icons (installed, available for additional icon needs)

## Getting Started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To create a production build:

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/
    Navbar.jsx        Sticky glass navbar with active-link underline
    Hero.jsx           Two-column hero, Jetson Nano image on the right
    Stats.jsx          Glassmorphism stats bar (4 metrics)
    Solutions.jsx       6 solution cards grid
    Footer.jsx          Footer with link columns + socials
    BackgroundField.jsx Ambient grid, glows, particles, circuit lines
  assets/
    images/
      jetson.png        Uploaded NVIDIA Jetson Nano neon illustration
  styles/
    index.css           Tailwind layers + reusable component classes
  App.jsx
  main.jsx
index.html
tailwind.config.js
postcss.config.js
vite.config.js
package.json
```

## Notes

- The Jetson Nano image is used exactly as provided — uncropped, full aspect
  ratio preserved, positioned on the right side of the hero with a subtle
  mouse-parallax tilt and floating animation.
- All colors, spacing, and typography follow the brief's token system
  (Space Grotesk for headings, Inter for body, Orbitron for stats).
- No Bootstrap, no Material UI, no Next.js — Tailwind utility classes only.
