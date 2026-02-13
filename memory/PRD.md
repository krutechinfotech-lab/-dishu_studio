# Dishu Studio - Photography Website PRD

## Problem Statement
Create a modern professional photography website for "Dishu Studio" based on 2026 design trends with booking management, gallery, admin dashboard, and contact functionality.

## Architecture
- **Frontend**: React.js + Tailwind CSS + Shadcn UI + Framer Motion
- **Backend**: FastAPI (Python) + MongoDB (Motor async driver)
- **Design**: Light & airy theme, Playfair Display + Manrope fonts, gold accent (#D4AF37)

## User Personas
1. **Wedding Clients** - Couples looking for wedding photography in Surat, Gujarat
2. **Parents** - Seeking baby/newborn photoshoot services
3. **Admin** - Studio owner managing bookings and contact messages

## Core Requirements (Static)
- 7 public pages: Home, About, Gallery, Services, Wedding Shoot, Baby Shoot, Contact
- 1 admin page: /admin for booking CRUD
- Booking system with name, email, phone, preferred date, service type
- Contact form with Google Maps integration
- Responsive design (mobile, tablet, desktop)
- Gallery with category filter + lightbox

## What's Been Implemented (Feb 2026)
- [x] Full-stack photography website with all 8 pages
- [x] Booking CRUD (Create, Read, Update, Delete)
- [x] Contact form with database storage
- [x] Gallery with All/Wedding/Baby category filters and lightbox
- [x] Admin dashboard at /admin with bookings + contacts management
- [x] Glassmorphism navbar, responsive mobile menu (Sheet)
- [x] Framer Motion scroll animations
- [x] Calendar date picker for booking forms
- [x] Pricing packages for Wedding (Classic/Premium/Royal) & Baby (Mini/Classic/Premium)
- [x] Google Maps embed for Surat location
- [x] Mock email service (logs to console)
- [x] 100% test pass rate

## Prioritized Backlog
### P0 (Critical)
- Real email integration (SendGrid) when API key available

### P1 (Important)
- Admin authentication (password protection for /admin)
- Image upload for portfolio management
- SEO meta tags and Open Graph for all pages

### P2 (Nice to Have)
- Blog/stories section
- Client gallery portal (password-protected delivery)
- WhatsApp integration for quick bookings
- Google Analytics integration
