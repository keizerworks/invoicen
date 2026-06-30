<h1 align="center">Invoicen</h1>

<p align="center">
  Modern open-source invoicing for freelancers, agencies, and businesses.
</p>

<p align="center">
  <a href="https://invoicen.keizerworks.com">Website</a>
  ·
  <a href="#features">Features</a>
  ·
  <a href="#getting-started">Getting Started</a>
  ·
  <a href="CONTRIBUTING.md">Contributing</a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/keizerworks/invoicen?style=flat-square" alt="Stars">
  <img src="https://img.shields.io/github/forks/keizerworks/invoicen?style=flat-square" alt="Forks">
  <img src="https://img.shields.io/github/license/keizerworks/invoicen?style=flat-square" alt="License">
  <img src="https://img.shields.io/github/issues/keizerworks/invoicen?style=flat-square" alt="Issues">
</p>

---

Invoicen is an open-source invoicing platform designed for freelancers, agencies, startups, and small businesses.

Create professional invoices, manage clients, generate PDFs, send invoices via email, and keep everything organized in one place. Self-host it on your own infrastructure or customize it to fit your workflow.

> Simple enough for freelancers. Flexible enough for growing businesses.

---

## Features

- Professional invoice generation
- PDF export
- Email invoices directly to clients
- Customer and organization management
- Product & service invoices
- Time-based invoices
- Company branding and logo uploads
- Payment information management
- Guest mode (no account required)
- Self-hostable
- Modern, responsive interface

---

## User Modes

### Guest

No signup required.

- Create invoices
- Export PDF invoices
- Store invoices locally in your browser

### Registered

Everything from Guest, plus:

- Cloud-synced invoices
- Invoice history
- Email delivery
- Company profile
- Payment details
- Organization management
- Logo uploads

---

## Invoice Types

### Time-based

Perfect for freelancers and consultants billing by the hour.

Track hours, hourly rates, and automatically calculate totals.

### Product-based

Create invoices for products or fixed-price services with quantities, pricing, taxes, and discounts.

---

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Drizzle ORM
- PostgreSQL
- AWS S3

---

## Getting Started

Clone the repository.

```bash
git clone https://github.com/keizerworks/invoicen.git
cd invoicen
```

Install dependencies.

```bash
pnpm install
```

Copy the environment variables.

```bash
cp .env.example .env
```

Start the development server.

```bash
pnpm dev
```

---

## Project Structure

```text
src/
├── app/
├── components/
├── lib/
├── server/
└── drizzle/
```

---

## Roadmap

- Recurring invoices
- Multi-currency support
- Stripe & online payments
- Public API
- Team workspaces
- Mobile experience
- Invoice analytics

---

## Contributing

Contributions are always welcome.

Whether it's fixing bugs, improving documentation, or adding new features, we'd love your help.

Please read the [Contributing Guide](CONTRIBUTING.md) before opening an issue or pull request.

---

## License

Licensed under the MIT License.

---

## Star History

<a href="https://star-history.com/#keizerworks/invoicen&Date">
  <picture>
    <source
      media="(prefers-color-scheme: dark)"
      srcset="https://api.star-history.com/svg?repos=keizerworks/invoicen&type=Date&theme=dark"
    />
    <source
      media="(prefers-color-scheme: light)"
      srcset="https://api.star-history.com/svg?repos=keizerworks/invoicen&type=Date"
    />
    <img
      alt="Star History Chart"
      src="https://api.star-history.com/svg?repos=keizerworks/invoicen&type=Date"
    />
  </picture>
</a>
