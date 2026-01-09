# McDonald's Order Management System - Frontend

A Next.js frontend application for managing McDonald's automated cooking bot orders.

## Features

- ✅ Real-time order tracking (PENDING → PROCESSING → COMPLETE)
- ✅ VIP order priority queue
- ✅ Bot management (add/remove bots)
- ✅ Visual order status display
- ✅ JWT authentication
- ✅ Responsive design with Tailwind CSS

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- Backend API running on `http://localhost:3000` (see `feedme-backend`)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_JWT_SECRET=your-secret-key-change-in-production
```

### Development

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

### Build

```bash
npm run build
npm start
```

## Usage

1. **Create Orders**: Click "New Normal Order" or "New VIP Order" buttons
2. **Manage Bots**: Use "+ Bot" to add bots, "- Bot" to remove the newest bot
3. **Monitor Status**: Watch orders flow from PENDING → PROCESSING → COMPLETE
4. **Bot Status**: View bot status (IDLE/PROCESSING) in the Bot Status panel

## Features Implemented

- ✅ Order creation (Normal/VIP)
- ✅ VIP priority queue (VIP orders processed before Normal orders)
- ✅ Bot management (add/remove)
- ✅ Real-time status updates (1 second polling)
- ✅ Visual order cards with status indicators
- ✅ Bot status display
- ✅ Error handling
- ✅ Responsive design

## API Integration

The frontend connects to the backend API at `http://localhost:3000/api`:

- `/auth/login` - Authentication
- `/orders/normal` - Create normal order
- `/orders/vip` - Create VIP order
- `/orders` - Get all orders
- `/bots` - Bot management
- `/status` - Get system status

## Project Structure

```
feedme-frontend/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Main page
│   └── globals.css     # Global styles
├── components/
│   ├── OrderCard.tsx   # Order card component
│   ├── OrderArea.tsx   # Order area (PENDING/PROCESSING/COMPLETE)
│   └── BotStatus.tsx   # Bot status display
├── lib/
│   ├── api.ts          # API client with Axios
│   └── store.ts        # Zustand store
└── package.json
```

