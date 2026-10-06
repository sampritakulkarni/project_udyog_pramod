# Shree Ganeshaya Namaha · Wedding Invitation

A completely original, premium wedding invitation website inspired by a
traditional **South Indian Hindu Brahmin wedding**. Built with React 19, Vite,
Tailwind CSS, and Framer Motion.

## Theme & Style

- Royal Maroon · Deep Red · Gold · Ivory · Cream · Temple Brown · Silk tones
- Sanskrit-style display headings (Marcellus / Tiro Devanagari Sanskrit)
- Modern readable body font (Cormorant Garamond / Mukta)
- South Indian temple carvings, brass lamps (Deepa), mango-leaf toranas,
  rangoli, lotus, kalasha, bells, and a golden mandap

## Experience

1. **Opening sequence** — loading animation, Om/Ganesh invocation, falling
   flower petals, animated diyas, and an "Open Invitation" button that fades
   the screen into the site and starts the background music.
2. **Hero** — animated mandap arch, floating flowers, golden particles, the
   couple's names, and a live countdown.
3. **Sections** — Blessings, Bride & Groom, Family Members, Story Timeline,
   Wedding Events (Engagement, Haldi, Mehendi, Reception, Wedding Ceremony),
   Venue (embedded Google Map), Gallery (with lightbox), Countdown, Dress
   Code, RSVP, Contact, Footer.

## Features

- **Framer Motion** scroll, reveal, floating-flower, and particle animations
- **Background music** generated with the Web Audio API (veena/flute-like
  ambient drone) — autoplay after "Open Invitation", with a play/pause toggle
- **RSVP form** persisted to Supabase (Postgres) with Row Level Security
- **Lazy-loaded** section components for fast initial paint
- Fully **responsive** and **accessible** (semantic sections, aria labels,
  reduced-motion support)

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run typecheck
```

## Tech

- React 19 + Vite
- Tailwind CSS
- Framer Motion
- lucide-react icons
- Supabase (RSVP storage)

## Project structure

```
src/
  components/
    decorative/   # Ornaments, Background, icons
    sections/     # Hero, Blessings, Couple, ... Footer
    Navbar.tsx
    MusicToggle.tsx
    OpeningSequence.tsx
    Section.tsx
  hooks/          # useCountdown, useInView, useBackgroundMusic
  lib/            # supabase client
  data/           # wedding.ts (couple, events, story, gallery...)
  App.tsx
  main.tsx
  index.css
```

All event details, names, and contacts are placeholder content in
`src/data/wedding.ts` — edit that file to personalise the invitation.
