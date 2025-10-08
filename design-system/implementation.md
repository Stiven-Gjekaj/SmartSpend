# Implementation Guide

## Getting Started

This guide demonstrates how to integrate the SmartSpend Design System into your React + Tailwind application.

## Installation

### 1. Install Dependencies

```bash
# Core dependencies
npm install tailwindcss@latest postcss@latest autoprefixer@latest

# Headless UI for interactive components
npm install @headlessui/react

# Icons (choose one)
npm install @heroicons/react
# or
npm install lucide-react

# Class variance authority (for component variants)
npm install class-variance-authority

# Optional: Animation utilities
npm install framer-motion
```

### 2. Configure Tailwind

Create or update `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        // Secondary colors
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
        },
        // Neutral colors
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        // Semantic colors
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          900: '#14532d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          900: '#78350f',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          900: '#7f1d1d',
        },
        info: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          from: { opacity: '0', transform: 'translateY(-16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 200ms ease-out',
        'slide-up': 'slide-up 300ms ease-out',
        'slide-down': 'slide-down 300ms ease-out',
        'scale-in': 'scale-in 200ms ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
```

### 3. Create Global CSS

Create `src/styles/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Font imports */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

@layer base {
  :root {
    /* Backgrounds */
    --bg-primary: 250 250 250; /* neutral-50 */
    --bg-secondary: 245 245 245; /* neutral-100 */
    --bg-tertiary: 255 255 255; /* white */

    /* Surfaces */
    --surface-primary: 255 255 255;
    --surface-secondary: 250 250 250;
    --surface-tertiary: 245 245 245;

    /* Borders */
    --border-primary: 229 229 229; /* neutral-200 */
    --border-secondary: 212 212 212; /* neutral-300 */

    /* Text */
    --text-primary: 23 23 23; /* neutral-900 */
    --text-secondary: 82 82 82; /* neutral-600 */
    --text-tertiary: 115 115 115; /* neutral-500 */
    --text-disabled: 163 163 163; /* neutral-400 */
    --text-link: 2 132 199; /* primary-600 */

    /* Interactive */
    --interactive-primary: 14 165 233; /* primary-500 */
    --interactive-primary-hover: 2 132 199; /* primary-600 */
  }

  [data-theme='dark'] {
    /* Backgrounds */
    --bg-primary: 10 10 10; /* neutral-950 */
    --bg-secondary: 23 23 23; /* neutral-900 */
    --bg-tertiary: 38 38 38; /* neutral-800 */

    /* Surfaces */
    --surface-primary: 23 23 23;
    --surface-secondary: 38 38 38;
    --surface-tertiary: 64 64 64;

    /* Borders */
    --border-primary: 38 38 38; /* neutral-800 */
    --border-secondary: 64 64 64; /* neutral-700 */

    /* Text */
    --text-primary: 250 250 250; /* neutral-50 */
    --text-secondary: 163 163 163; /* neutral-400 */
    --text-tertiary: 115 115 115; /* neutral-500 */
    --text-disabled: 82 82 82; /* neutral-600 */
    --text-link: 56 189 248; /* primary-400 */

    /* Interactive */
    --interactive-primary: 14 165 233; /* primary-500 */
    --interactive-primary-hover: 56 189 248; /* primary-400 */
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-bg-primary text-text-primary;
    font-feature-settings: 'rlig' 1, 'calt' 1;
  }

  /* Focus styles */
  *:focus-visible {
    @apply outline-none ring-3 ring-primary-500/30 ring-offset-2;
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}

@layer utilities {
  /* Custom utilities */
  .text-balance {
    text-wrap: balance;
  }
}
```

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── modal.tsx
│   │   └── alert.tsx
│   ├── layout/       # Layout components
│   │   ├── navbar.tsx
│   │   ├── sidebar.tsx
│   │   └── footer.tsx
│   └── features/     # Feature-specific components
│       └── expense-tracker/
├── lib/              # Utilities
│   └── utils.ts
├── hooks/            # Custom hooks
│   ├── use-toast.tsx
│   └── use-theme.tsx
├── styles/
│   └── globals.css
└── app/              # Next.js app directory (or pages/)
```

## Theme Toggle Implementation

```tsx
// hooks/use-theme.tsx
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Load saved theme
    const saved = localStorage.getItem('theme') as Theme;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;

    // Determine actual theme
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    const actualTheme = theme === 'system' ? systemTheme : theme;

    setResolvedTheme(actualTheme);

    // Update DOM
    root.setAttribute('data-theme', actualTheme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

// Component usage
function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
```

## Utility Functions

```tsx
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Merge Tailwind classes intelligently
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency
export function formatCurrency(amount: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

// Format date
export function formatDate(date: Date, format: 'short' | 'long' = 'short') {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: format === 'short' ? 'short' : 'long',
  }).format(date);
}
```

## Example Application

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/hooks/use-theme';
import { ToastProvider } from '@/hooks/use-toast';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

// app/page.tsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const { addToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'Success',
      message: 'Your expense has been added.',
    });
  };

  return (
    <main className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <section className="px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-text-primary">
            Smart Spending Starts Here
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
            Track expenses, gain insights, and achieve financial freedom with SmartSpend.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">Get Started</Button>
            <Button variant="secondary" size="lg">Learn More</Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="interactive">
              <div className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <ChartIcon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary">
                  Visual Analytics
                </h3>
                <p className="text-text-secondary">
                  Understand your spending patterns with beautiful charts and insights.
                </p>
              </div>
            </Card>

            {/* More cards... */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16">
        <Card className="max-w-2xl mx-auto">
          <div className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-text-primary text-center">
              Add Your First Expense
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Description"
                placeholder="Coffee at Starbucks"
                required
              />
              <Input
                label="Amount"
                type="number"
                placeholder="5.50"
                required
              />
              <Button type="submit" fullWidth>
                Add Expense
              </Button>
            </form>
          </div>
        </Card>
      </section>
    </main>
  );
}
```

## Best Practices

### 1. Component Composition
```tsx
// ✅ Good: Composable components
<Card>
  <CardHeader>
    <h3>Title</h3>
  </CardHeader>
  <CardBody>
    <p>Content</p>
  </CardBody>
</Card>

// ❌ Bad: Monolithic components
<Card title="Title" content="Content" />
```

### 2. Semantic Tokens
```tsx
// ✅ Good: Use semantic tokens
<div className="bg-surface-primary text-text-primary">

// ❌ Bad: Use raw colors
<div className="bg-white text-neutral-900">
```

### 3. Responsive Design
```tsx
// ✅ Good: Mobile-first responsive
<div className="text-base md:text-lg lg:text-xl">

// ❌ Bad: Desktop-first
<div className="text-xl md:text-base">
```

### 4. Accessibility
```tsx
// ✅ Good: Accessible markup
<button aria-label="Close" onClick={onClose}>
  <XIcon className="w-5 h-5" />
</button>

// ❌ Bad: Missing labels
<button onClick={onClose}>
  <XIcon className="w-5 h-5" />
</button>
```

## Performance Tips

1. **Code splitting**: Lazy load heavy components
2. **Memoization**: Use `React.memo` for expensive components
3. **Image optimization**: Use Next.js Image component
4. **Font optimization**: Use variable fonts
5. **Bundle analysis**: Regularly check bundle size

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Headless UI Documentation](https://headlessui.com)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Radix UI](https://www.radix-ui.com/) - Alternative to Headless UI
