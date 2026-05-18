# 🛒 Uddoktar Bazar - Multi-Vendor E-Commerce Marketplace

A full-scale multi-vendor e-commerce platform inspired by [uddokterbazar.com](https://uddokterbazar.com/), connecting local regional entrepreneurs, partners, dealers, and general consumers within a localized directory framework across Bangladesh.

## 🚀 Features

- **Multi-Vendor Architecture**: Support for ADMIN, PARTNER, DEALER, SELLER, and CUSTOMER roles
- **Localized Partner Stores**: Dynamic micro-stores at `/ub/[partnerSlug]` for regional partners
- **Product Management**: Full CRUD with tags (NEW, HOT, DISCOUNTED), dual pricing, and stock tracking
- **Bangladeshi Payment Integration**: bKash, Nagad, Rocket, and Cash on Delivery (COD)
- **Geographic Directory**: Partner and dealer listings by Division, District, and Upazila
- **Responsive Design**: Mobile-first Tailwind CSS with Lucide React icons
- **Cart & Wishlist**: Zustand-powered state management with localStorage persistence
- **Order Tracking**: Per-vendor fulfillment status tracking

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | Next.js 14 (App Router), React 18, Tailwind CSS |
| Backend | Next.js API Routes, Node.js |
| Database | PostgreSQL 15 |
| ORM | Prisma |
| Auth | NextAuth.js v5 |
| State | Zustand |
| Validation | Zod |
| Icons | Lucide React |

## 📁 Project Structure

```
uddoktar-bazar/
├── prisma/              # Database schema & migrations
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── page.tsx    # Global Marketplace Home
│   │   ├── ub/[partnerSlug]/  # Partner Micro-Stores
│   │   ├── vandor-list/       # Partner Directory
│   │   ├── deler-list/        # Dealer Directory
│   │   ├── cart/              # Shopping Cart
│   │   ├── checkout/          # Checkout & Payments
│   │   └── api/               # REST API endpoints
│   ├── components/     # Reusable UI & page components
│   ├── store/          # Zustand state stores
│   ├── types/          # TypeScript type definitions
│   └── lib/            # Utilities, Prisma client, validators
├── public/             # Static assets
└── docker-compose.yml  # Docker orchestration
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- Docker (optional)

### Local Development

1. **Clone and install dependencies:**
   ```bash
   git clone <repo-url>
   cd uddoktar-bazar
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your database credentials
   ```

3. **Initialize the database:**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   npm run db:seed
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

### Docker Setup

```bash
# Start all services
docker-compose up -d

# Run database migrations
docker-compose exec app npx prisma migrate dev

# Seed the database
docker-compose exec app npm run db:seed
```

## 📱 Key Pages

| Route | Description |
|-------|-------------|
| `/` | Global Marketplace Home with hero carousel, partner list, and tabbed products |
| `/ub/[partnerSlug]` | Localized partner micro-store with filtered products |
| `/vandor-list` | Geographic partner directory with grid/list views |
| `/deler-list` | Dealer reference directory for wholesale |
| `/cart` | Shopping cart with quantity controls |
| `/checkout` | Full checkout with Bangladeshi payment options |
| `/dashboard` | Vendor/admin dashboard for product & order management |

## 💳 Payment Methods

- **bKash**: Mobile Financial Service integration
- **Nagad**: Postal digital financial service
- **Rocket**: Dutch-Bangla Bank mobile banking
- **Cash on Delivery (COD)**: Pay when you receive
- **Credit/Debit Card**: Visa, Mastercard support

## 🔐 Authentication Roles

| Role | Permissions |
|------|-------------|
| ADMIN | Full platform management |
| PARTNER | Manage own store, products, orders |
| DEALER | Bulk sales, wholesale management |
| SELLER | Product listing, order fulfillment |
| CUSTOMER | Browse, purchase, track orders |

## 📄 License

MIT License - Built for Bangladeshi entrepreneurs.

