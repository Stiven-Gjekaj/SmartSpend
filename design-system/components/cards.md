# Cards

## Overview

Cards group related content and actions in a contained, elevated surface. They're versatile containers used for displaying information hierarchically.

## Basic Card

```tsx
<div className="bg-surface-primary border border-border-primary rounded-xl shadow-sm p-6">
  <h3 className="text-xl font-semibold text-text-primary mb-2">
    Card Title
  </h3>
  <p className="text-text-secondary">
    This is the card content. Cards can contain any type of content.
  </p>
</div>
```

## Interactive Card

```tsx
<div className="
  bg-surface-primary border border-border-primary rounded-xl shadow-sm p-6
  transition-all duration-200
  hover:shadow-lg hover:-translate-y-1
  cursor-pointer
  focus-within:ring-3 focus-within:ring-primary-500/30
">
  <h3 className="text-xl font-semibold text-text-primary mb-2">
    Interactive Card
  </h3>
  <p className="text-text-secondary mb-4">
    Hover or focus to see the elevation effect.
  </p>
  <button className="text-primary-500 font-medium hover:text-primary-600">
    Learn More →
  </button>
</div>
```

## Card with Image

```tsx
<div className="bg-surface-primary border border-border-primary rounded-xl shadow-sm overflow-hidden">
  <img
    src="/image.jpg"
    alt="Card image"
    className="w-full h-48 object-cover"
  />
  <div className="p-6">
    <h3 className="text-xl font-semibold text-text-primary mb-2">
      Card with Image
    </h3>
    <p className="text-text-secondary mb-4">
      Images are great for visual context and engagement.
    </p>
    <button className="px-4 py-2 bg-primary-500 text-white rounded-lg">
      View Details
    </button>
  </div>
</div>
```

## Card with Header & Footer

```tsx
<div className="bg-surface-primary border border-border-primary rounded-xl shadow-sm overflow-hidden">
  {/* Header */}
  <div className="px-6 py-4 border-b border-border-primary">
    <h3 className="text-lg font-semibold text-text-primary">
      Card Header
    </h3>
  </div>

  {/* Body */}
  <div className="p-6">
    <p className="text-text-secondary">
      The main content goes here. This section can contain any elements.
    </p>
  </div>

  {/* Footer */}
  <div className="px-6 py-4 bg-neutral-50 border-t border-border-primary">
    <div className="flex gap-3 justify-end">
      <button className="px-4 py-2 text-text-secondary hover:text-text-primary">
        Cancel
      </button>
      <button className="px-4 py-2 bg-primary-500 text-white rounded-lg">
        Confirm
      </button>
    </div>
  </div>
</div>
```

## Stat Card

```tsx
<div className="bg-surface-primary border border-border-primary rounded-xl shadow-sm p-6">
  <div className="flex items-center justify-between mb-4">
    <h4 className="text-sm font-medium text-text-secondary uppercase tracking-wider">
      Total Revenue
    </h4>
    <div className="p-2 bg-primary-50 rounded-lg">
      <DollarSignIcon className="w-5 h-5 text-primary-500" />
    </div>
  </div>

  <div className="space-y-1">
    <p className="text-3xl font-bold text-text-primary">
      $45,231
    </p>
    <p className="text-sm text-success-600 flex items-center gap-1">
      <ArrowUpIcon className="w-4 h-4" />
      <span>+20.1% from last month</span>
    </p>
  </div>
</div>
```

## Profile Card

```tsx
<div className="bg-surface-primary border border-border-primary rounded-xl shadow-sm p-6">
  <div className="flex items-start gap-4">
    <img
      src="/avatar.jpg"
      alt="John Doe"
      className="w-16 h-16 rounded-full object-cover"
    />

    <div className="flex-1">
      <h3 className="text-lg font-semibold text-text-primary">
        John Doe
      </h3>
      <p className="text-sm text-text-secondary">
        Product Designer
      </p>

      <div className="mt-4 flex gap-2">
        <button className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm">
          Follow
        </button>
        <button className="px-4 py-2 bg-neutral-200 text-text-primary rounded-lg text-sm">
          Message
        </button>
      </div>
    </div>
  </div>

  <div className="mt-6 pt-6 border-t border-border-primary">
    <div className="grid grid-cols-3 gap-4 text-center">
      <div>
        <p className="text-2xl font-bold text-text-primary">143</p>
        <p className="text-xs text-text-tertiary uppercase tracking-wider">Posts</p>
      </div>
      <div>
        <p className="text-2xl font-bold text-text-primary">2.5k</p>
        <p className="text-xs text-text-tertiary uppercase tracking-wider">Followers</p>
      </div>
      <div>
        <p className="text-2xl font-bold text-text-primary">891</p>
        <p className="text-xs text-text-tertiary uppercase tracking-wider">Following</p>
      </div>
    </div>
  </div>
</div>
```

## List Card

```tsx
<div className="bg-surface-primary border border-border-primary rounded-xl shadow-sm overflow-hidden">
  <div className="px-6 py-4 border-b border-border-primary">
    <h3 className="text-lg font-semibold text-text-primary">
      Recent Activity
    </h3>
  </div>

  <ul className="divide-y divide-border-primary">
    <li className="px-6 py-4 hover:bg-neutral-50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-primary-50 rounded-lg">
          <CheckCircleIcon className="w-5 h-5 text-primary-500" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-text-primary">
            Payment received
          </p>
          <p className="text-xs text-text-tertiary">
            2 hours ago
          </p>
        </div>
        <p className="text-sm font-semibold text-success-600">
          +$500
        </p>
      </div>
    </li>

    <li className="px-6 py-4 hover:bg-neutral-50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-warning-50 rounded-lg">
          <AlertCircleIcon className="w-5 h-5 text-warning-500" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-text-primary">
            Invoice pending
          </p>
          <p className="text-xs text-text-tertiary">
            5 hours ago
          </p>
        </div>
        <p className="text-sm font-semibold text-text-secondary">
          $250
        </p>
      </div>
    </li>
  </ul>
</div>
```

## Pricing Card

```tsx
<div className="
  bg-surface-primary border-2 border-primary-500 rounded-xl shadow-lg
  p-8
  relative overflow-hidden
">
  {/* Badge */}
  <div className="absolute top-4 right-4">
    <span className="px-3 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full">
      Popular
    </span>
  </div>

  {/* Header */}
  <div className="mb-6">
    <h3 className="text-2xl font-bold text-text-primary mb-2">
      Pro Plan
    </h3>
    <div className="flex items-baseline gap-2">
      <span className="text-4xl font-bold text-text-primary">$29</span>
      <span className="text-text-secondary">/month</span>
    </div>
  </div>

  {/* Features */}
  <ul className="space-y-3 mb-8">
    <li className="flex items-center gap-3 text-text-secondary">
      <CheckIcon className="w-5 h-5 text-success-500 flex-shrink-0" />
      <span>Unlimited projects</span>
    </li>
    <li className="flex items-center gap-3 text-text-secondary">
      <CheckIcon className="w-5 h-5 text-success-500 flex-shrink-0" />
      <span>Advanced analytics</span>
    </li>
    <li className="flex items-center gap-3 text-text-secondary">
      <CheckIcon className="w-5 h-5 text-success-500 flex-shrink-0" />
      <span>Priority support</span>
    </li>
    <li className="flex items-center gap-3 text-text-secondary">
      <CheckIcon className="w-5 h-5 text-success-500 flex-shrink-0" />
      <span>Custom integrations</span>
    </li>
  </ul>

  {/* CTA */}
  <button className="w-full px-4 py-3 bg-primary-500 text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all">
    Get Started
  </button>
</div>
```

## Grid Layout

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div className="bg-surface-primary border border-border-primary rounded-xl shadow-sm p-6">
    <h3 className="text-lg font-semibold text-text-primary mb-2">
      Card 1
    </h3>
    <p className="text-text-secondary">
      Content for the first card.
    </p>
  </div>

  <div className="bg-surface-primary border border-border-primary rounded-xl shadow-sm p-6">
    <h3 className="text-lg font-semibold text-text-primary mb-2">
      Card 2
    </h3>
    <p className="text-text-secondary">
      Content for the second card.
    </p>
  </div>

  <div className="bg-surface-primary border border-border-primary rounded-xl shadow-sm p-6">
    <h3 className="text-lg font-semibold text-text-primary mb-2">
      Card 3
    </h3>
    <p className="text-text-secondary">
      Content for the third card.
    </p>
  </div>
</div>
```

## React Component

```tsx
import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  'bg-surface-primary border rounded-xl transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-border-primary shadow-sm',
        elevated: 'border-border-primary shadow-md',
        outlined: 'border-border-secondary shadow-none',
        interactive: `
          border-border-primary shadow-sm
          hover:shadow-lg hover:-translate-y-1
          cursor-pointer
          focus-within:ring-3 focus-within:ring-primary-500/30
        `,
      },
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cardVariants({ variant, padding, className })}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

// Subcomponents
export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`px-6 py-4 border-b border-border-primary ${className}`}
      {...props}
    />
  )
);

CardHeader.displayName = 'CardHeader';

export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`p-6 ${className}`} {...props} />
  )
);

CardBody.displayName = 'CardBody';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`px-6 py-4 bg-neutral-50 border-t border-border-primary ${className}`}
      {...props}
    />
  )
);

CardFooter.displayName = 'CardFooter';

// Usage
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/card';

<Card variant="interactive">
  <CardHeader>
    <h3 className="text-lg font-semibold">Card Title</h3>
  </CardHeader>
  <CardBody>
    <p className="text-text-secondary">Card content goes here.</p>
  </CardBody>
  <CardFooter>
    <div className="flex gap-3 justify-end">
      <button>Cancel</button>
      <button>Confirm</button>
    </div>
  </CardFooter>
</Card>
```

## Dark Mode

Cards automatically adapt to dark mode:

```tsx
/* Light mode */
:root {
  --surface-primary: #ffffff;
  --border-primary: #e5e5e5;
}

/* Dark mode */
[data-theme="dark"] {
  --surface-primary: #171717;
  --border-primary: #262626;
}
```

## Accessibility

### Requirements
- **Semantic HTML**: Use appropriate heading levels
- **Focus management**: Interactive cards should be keyboard accessible
- **ARIA labels**: Add `aria-label` for icon-only actions
- **Link vs Button**: Use `<a>` for navigation, `<button>` for actions

### Example
```tsx
<article className="bg-surface-primary border border-border-primary rounded-xl shadow-sm p-6">
  <h3 className="text-xl font-semibold text-text-primary mb-2">
    Article Title
  </h3>
  <p className="text-text-secondary mb-4">
    Article preview text...
  </p>
  <a
    href="/article/123"
    className="text-primary-500 font-medium hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
  >
    Read More
  </a>
</article>
```

## Best Practices

1. **Consistent padding**: Use defined spacing scale (p-4, p-6, p-8)
2. **Clear hierarchy**: Title > Subtitle > Body > Actions
3. **Limit content**: Don't overload cards with too much information
4. **Meaningful elevation**: Reserve shadows for interactive/elevated states
5. **Responsive**: Stack cards vertically on mobile
6. **Loading states**: Show skeleton when fetching data
7. **Empty states**: Handle no-content gracefully
8. **Actions**: Place primary action bottom-right or full-width
9. **Images**: Always include `alt` text
10. **Hover feedback**: Subtle elevation increase for clickable cards
