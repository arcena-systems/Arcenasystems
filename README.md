# Arcena Systems — Website

Corporate website for [Arcena Systems](https://arcenasystems.com) — an AI automation agency helping businesses scale through intelligent process automation.

## Project Structure

```
├── index.html                  # Main landing page
├── anwendungsfaelle/           # Use case / case study pages
│   ├── dokumentenmanagement.html
│   ├── lead-qualifizierung.html
│   └── mieterservice.html
├── brand_assets/               # Logos & brand guidelines
├── serve.mjs                   # Local dev server (clean URLs)
├── screenshot.mjs              # Puppeteer screenshot tool
├── hero-section.png            # Hero image
└── logo.png                    # Site logo
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)

### Install & Run

```bash
npm install
npm start
```

The site is served at **http://localhost:3000**.

### Clean URLs

The dev server supports clean URLs — no `.html` extension needed:

- `http://localhost:3000/anwendungsfaelle/dokumentenmanagement`
- `http://localhost:3000/anwendungsfaelle/lead-qualifizierung`
- `http://localhost:3000/anwendungsfaelle/mieterservice`

## Tech Stack

- **HTML / Tailwind CSS** (via CDN)
- **Vanilla JavaScript** (no framework)
- **Node.js** dev server for local development
- **Puppeteer** for automated screenshots
