# MVP Next.js Trial UI

A simplified MVP version of a Next.js template featuring fake user management, trial system, dark mode, and modern UI components - without authentication or payment integration.

## Features

- ✅ **Fake User Management** - Simulated user system stored in localStorage
- ✅ **Trial System** - 48-hour trial period tracking
- ✅ **Dark Mode Support** - System preference-based theme switching
- ✅ **Responsive Design** - Mobile-first responsive layouts with Tailwind CSS
- ✅ **Landing Page** - Marketing page with pricing section and feature highlights
- ✅ **Dashboard** - User dashboard with metrics and activity feed
- ✅ **Animated UI** - Framer Motion animations and transitions
- ✅ **Onboarding Tour** - First-time user onboarding experience
- ✅ **TypeScript** - Full TypeScript support

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/gitmvp-com/mvp-nextjs-trial-ui.git
cd mvp-nextjs-trial-ui
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

### Fake User Management

This MVP uses localStorage to simulate user authentication:
- Users can "sign up" with just an email (no password required)
- User data is stored in browser's localStorage
- No backend or database required

### Trial System

- New users automatically get a 48-hour trial period
- Trial expiration is tracked using localStorage
- Access to dashboard is restricted after trial expires

### UI Components

- **Landing Page**: Showcases features with animations and smooth scrolling
- **Dashboard**: Displays metrics, charts placeholder, and activity feed
- **Onboarding Tour**: Guided tour for first-time users
- **Dark Mode**: Automatically adapts to system preferences

## Project Structure

```
├── app/
│   ├── dashboard/         # Dashboard page
│   ├── login/            # Login page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Landing page
│   └── globals.css       # Global styles
├── components/
│   ├── OnboardingTour.tsx
│   ├── TopBar.tsx
│   ├── TypewriterEffect.tsx
│   └── VideoModal.tsx
├── contexts/
│   ├── AuthContext.tsx   # Fake auth context
│   └── ProtectedRoute.tsx
├── hooks/
│   └── useTrialStatus.ts # Trial tracking hook
└── utils/
    └── fakeAuth.ts       # Fake auth utilities
```

## Built With

- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Headless UI](https://headlessui.com/) - UI components

## License

This project is licensed under the MIT License.

## Acknowledgments

This MVP is based on [launch-mvp-stripe-nextjs-supabase](https://github.com/shenseanchen/launch-mvp-stripe-nextjs-supabase) by ShenSeanChen, simplified to remove authentication and payment dependencies.
