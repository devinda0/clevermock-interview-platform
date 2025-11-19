# CleverMock - Virtual Mock Interview Platform Waitlist

A premium waitlist application built with Next.js 16+, MongoDB, and featuring a stunning dark mode design with blue & purple gradients.

## 🚀 Features

- **Glassmorphism Design**: Modern UI with backdrop-blur effects and glowing elements
- **Email Validation**: Server-side regex validation with duplicate prevention
- **MongoDB Integration**: Cached connection handling with Mongoose
- **Responsive Design**: Fully mobile-optimized with Tailwind CSS
- **Real-time Feedback**: Loading states and success/error messages
- **Premium Aesthetics**: Blue & purple gradient theme with futuristic styling

## 📦 Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Database**: MongoDB with Mongoose
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Language**: TypeScript

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### 2. Set Up MongoDB

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/clevermock?retryWrites=true&w=majority
```

### 3. Run the Development Server

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts          # Waitlist API endpoint
│   ├── globals.css               # Global styles with custom utilities
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page with waitlist form
├── lib/
│   └── mongodb.ts                # MongoDB connection utility
├── models/
│   └── User.ts                   # Mongoose User model
└── .env.local.example            # Environment variables template
```

## 🎨 Design Features

### Hero Section
- Compelling headline with gradient text
- Email input with glassmorphism effect
- Submit button with gradient background
- Real-time loading states
- Success/error message display

### Features Section
- Grid layout with 3 feature cards
- Hover effects with scale animation
- Icon backgrounds with gradient colors
- Glassmorphism cards with backdrop blur

### Social Proof
- Avatar display with gradient backgrounds
- Engagement statistics

## 🔒 API Validation

The waitlist API includes:
- Email format validation (regex)
- Duplicate email prevention
- MongoDB connection error handling
- Proper HTTP status codes (200, 400, 409, 500)

## 🎯 Next Steps

1. Set up your MongoDB connection string
2. Customize the design colors in `app/globals.css`
3. Update social proof numbers in `app/page.tsx`
4. Add analytics tracking
5. Set up email notifications (optional)

## 📝 License

MIT

---

Built with ❤️ by CleverMock Team
