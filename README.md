# SkineyDerma
Clinic
# SkinNey Derma Clinic — Cinematic Static Web App

Luxury skin & hair clinic website + patient portal + admin dashboard.  
Designed for **GitHub Pages** static hosting.

**Clinic:** SkinNey Derma Clinic · Mira Road, Mumbai  
**Phone:** 99207 06262 · **Instagram:** [@skinney_mumbai](https://instagram.com/skinney_mumbai)

---

## Live Demo Structure

| Page | URL | Purpose |
|------|-----|---------|
| Landing | `index.html` | Cinematic marketing site with ticker, side-nav, treatments, before/after slider, location |
| Patient App | `app.html` | Login/signup, treatment catalogue, booking flow, product shop + cart |
| Admin | `admin.html` | Appointment management, inventory, content CMS, analytics overview |

---

## Design System

- **Palette:** Champagne gold `#D4AF37`, deep charcoal `#0E0E0E`, soft ivory `#F8F5F0`
- **Typography:** Cormorant Garamond (serif headers) + Inter (body)
- **Style:** Editorial / high-fashion dark luxury with clinical precision
- **Motion:** Fade-ups, floating accents, sticky section tracking, interactive BA slider

---

## Features

### Landing (`index.html`)
- Live offers ticker bar
- Sticky left navigation with active section tracking
- Hero with kinetic title “The SkinNey Edition”
- Signature treatment cards (PRP, GFC, Laser, PMU, Microblading, Skin)
- Interactive before/after comparison slider
- Video showcase grid (UI ready)
- Visit hours, address, Google Maps embed, Call / WhatsApp CTAs

### Patient App (`app.html`)
- Demo auth (any credentials accepted, session stored in `localStorage`)
- Treatment catalogue with category filters
- 4-step booking: Service → Doctor → Date/Slot → Confirm
- E-commerce product grid + sliding cart drawer + demo checkout
- Upcoming appointment card after booking

### Admin Dashboard (`admin.html`)
- Staff login gate
- Overview stats (consults, orders, revenue, pending)
- Appointment table: approve / cancel / restore
- Inventory CRUD (add / edit / delete products, stock tracking)
- CMS forms for videos and before/after gallery uploads (demo)

---

## Tech Stack

- HTML5 + Tailwind CSS (CDN)
- Custom CSS animations
- Vanilla JavaScript (no build step)
- Fully static — works on GitHub Pages, Netlify, Vercel, or any static host

---

## Deploy to GitHub Pages

1. Create a new repository (e.g. `skinney-derma-clinic`)
2. Push the contents of this folder to the `main` branch
3. Settings → Pages → Source: Deploy from branch → `main` / root
4. Site will be live at `https://<username>.github.io/skinney-derma-clinic/`

Or simply open `index.html` locally in a browser.

---

## Demo Credentials

- **Patient App:** Any email + password  
- **Admin:** Pre-filled `admin@skinney` / `demo`

All data is client-side only (localStorage). Refreshing clears nothing until localStorage is cleared.

---

## Project Structure

```
skinney-derma-clinic/
├── index.html          # Cinematic landing
├── app.html            # Patient portal
├── admin.html          # Staff dashboard
├── css/
│   └── styles.css      # Shared custom styles
├── js/
│   ├── main.js         # Landing interactions
│   ├── app.js          # Patient app logic
│   └── admin.js        # Admin logic
└── README.md
```

---

© 2026 SkinNey Derma Clinic · Sample static application for portfolio / demo use.
