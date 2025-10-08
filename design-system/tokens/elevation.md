# Elevation & Shadows

## Philosophy

Elevation establishes visual hierarchy through layering. Our shadow system creates depth while maintaining a clean, minimal aesthetic consistent with modern interfaces.

## Shadow Tokens

```css
/* Elevation levels */
--shadow-none: none;

--shadow-xs:
  0 1px 2px 0 rgba(0, 0, 0, 0.05);

--shadow-sm:
  0 1px 3px 0 rgba(0, 0, 0, 0.1),
  0 1px 2px -1px rgba(0, 0, 0, 0.1);

--shadow-md:
  0 4px 6px -1px rgba(0, 0, 0, 0.1),
  0 2px 4px -2px rgba(0, 0, 0, 0.1);

--shadow-lg:
  0 10px 15px -3px rgba(0, 0, 0, 0.1),
  0 4px 6px -4px rgba(0, 0, 0, 0.1);

--shadow-xl:
  0 20px 25px -5px rgba(0, 0, 0, 0.1),
  0 8px 10px -6px rgba(0, 0, 0, 0.1);

--shadow-2xl:
  0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Focus shadows */
--shadow-focus-primary:
  0 0 0 3px rgba(14, 165, 233, 0.3);

--shadow-focus-error:
  0 0 0 3px rgba(239, 68, 68, 0.3);

/* Inner shadows */
--shadow-inner:
  inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
```

## Dark Mode Adjustments

```css
[data-theme="dark"] {
  --shadow-xs:
    0 1px 2px 0 rgba(0, 0, 0, 0.3);

  --shadow-sm:
    0 1px 3px 0 rgba(0, 0, 0, 0.4),
    0 1px 2px -1px rgba(0, 0, 0, 0.4);

  --shadow-md:
    0 4px 6px -1px rgba(0, 0, 0, 0.4),
    0 2px 4px -2px rgba(0, 0, 0, 0.4);

  --shadow-lg:
    0 10px 15px -3px rgba(0, 0, 0, 0.5),
    0 4px 6px -4px rgba(0, 0, 0, 0.5);

  --shadow-xl:
    0 20px 25px -5px rgba(0, 0, 0, 0.5),
    0 8px 10px -6px rgba(0, 0, 0, 0.5);

  --shadow-2xl:
    0 25px 50px -12px rgba(0, 0, 0, 0.7);
}
```

**Reasoning**: Darker backgrounds require more contrast in shadows to maintain visibility.

## Elevation Scale

### Level 0: Base
**Elevation**: 0px
**Shadow**: None
**Usage**: Page background, flush elements

```css
.elevation-0 {
  box-shadow: var(--shadow-none);
}
```

### Level 1: Raised
**Elevation**: 1-2px
**Shadow**: `xs` - `sm`
**Usage**: Cards, buttons (default state), input fields

```tsx
<div className="bg-surface-primary shadow-sm rounded-xl">
  Card content
</div>
```

### Level 2: Floating
**Elevation**: 4-6px
**Shadow**: `md`
**Usage**: Dropdowns, date pickers, tooltips

```tsx
<div className="bg-surface-primary shadow-md rounded-xl">
  Dropdown menu
</div>
```

### Level 3: Overlay
**Elevation**: 10-15px
**Shadow**: `lg`
**Usage**: Sticky headers, bottom sheets, FABs

```tsx
<div className="bg-surface-primary shadow-lg rounded-xl">
  Sticky navigation
</div>
```

### Level 4: Dialog
**Elevation**: 20-25px
**Shadow**: `xl`
**Usage**: Modals, dialogs, popovers

```tsx
<div className="bg-surface-primary shadow-xl rounded-2xl">
  Modal content
</div>
```

### Level 5: Notification
**Elevation**: 25-50px
**Shadow**: `2xl`
**Usage**: Toast notifications, drawer panels

```tsx
<div className="bg-surface-primary shadow-2xl rounded-2xl">
  Toast notification
</div>
```

## Usage Guidelines

### Semantic Elevation
```css
/* Component-specific shadows */
--shadow-button: var(--shadow-sm);
--shadow-button-hover: var(--shadow-md);
--shadow-card: var(--shadow-sm);
--shadow-card-hover: var(--shadow-lg);
--shadow-dropdown: var(--shadow-md);
--shadow-modal: var(--shadow-xl);
--shadow-toast: var(--shadow-2xl);
```

### Interactive Elevation

Elements should elevate on interaction:

```css
.interactive-card {
  box-shadow: var(--shadow-sm);
  transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.interactive-card:hover {
  box-shadow: var(--shadow-lg);
}

.interactive-card:active {
  box-shadow: var(--shadow-xs);
}
```

## Border Radius

Rounded corners complement elevation by softening shadows.

```css
--radius-none: 0;
--radius-sm: 0.125rem;   /* 2px - subtle rounding */
--radius-default: 0.25rem; /* 4px - inputs, small buttons */
--radius-md: 0.375rem;   /* 6px - buttons, small cards */
--radius-lg: 0.5rem;     /* 8px - cards */
--radius-xl: 0.75rem;    /* 12px - large cards */
--radius-2xl: 1rem;      /* 16px - modals, feature cards */
--radius-3xl: 1.5rem;    /* 24px - hero sections */
--radius-full: 9999px;   /* Circular elements */
```

### Radius Guidelines

```
sm (2px):     Subtle - table cells, compact UI
default (4px): Inputs, small buttons, chips
md (6px):     Default buttons, small cards
lg (8px):     Cards, panels
xl (12px):    Large cards, prominent sections
2xl (16px):   Modals, dialogs, hero cards
3xl (24px):   Feature sections, branded elements
full:         Avatars, circular badges
```

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        'focus-primary': '0 0 0 3px rgba(14, 165, 233, 0.3)',
        'focus-error': '0 0 0 3px rgba(239, 68, 68, 0.3)',
      },
      borderRadius: {
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      }
    }
  }
}
```

## React Examples

### Elevated Card
```tsx
<div className="bg-surface-primary shadow-sm hover:shadow-lg
                rounded-xl p-6 transition-shadow duration-200">
  <h3 className="text-xl font-semibold mb-2">Card Title</h3>
  <p className="text-text-secondary">Interactive card with hover elevation.</p>
</div>
```

### Modal
```tsx
<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
  {/* Backdrop */}
  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

  {/* Modal */}
  <div className="relative bg-surface-primary shadow-xl rounded-2xl
                  max-w-md w-full p-6 z-10">
    <h2 className="text-2xl font-semibold mb-4">Modal Title</h2>
    <p className="text-text-secondary mb-6">Modal content here.</p>

    <div className="flex gap-3 justify-end">
      <button className="px-4 py-2 rounded-lg hover:bg-neutral-100">
        Cancel
      </button>
      <button className="px-4 py-2 bg-primary-500 text-white rounded-lg
                         shadow-sm hover:shadow-md">
        Confirm
      </button>
    </div>
  </div>
</div>
```

### Toast Notification
```tsx
<div className="fixed bottom-4 right-4 bg-surface-primary shadow-2xl
                rounded-2xl p-4 max-w-sm animate-slide-up">
  <div className="flex items-start gap-3">
    <CheckCircleIcon className="w-5 h-5 text-success-500 flex-shrink-0" />
    <div className="flex-1">
      <h4 className="font-medium text-text-primary">Success</h4>
      <p className="text-sm text-text-secondary mt-1">
        Your changes have been saved.
      </p>
    </div>
  </div>
</div>
```

### Floating Action Button
```tsx
<button className="fixed bottom-6 right-6 w-14 h-14
                   bg-primary-500 text-white rounded-full shadow-lg
                   hover:shadow-xl active:shadow-md
                   transition-all duration-200">
  <PlusIcon className="w-6 h-6 mx-auto" />
</button>
```

## Focus States

Always combine shadows with focus rings for accessibility:

```tsx
<button className="px-4 py-2 bg-primary-500 text-white rounded-lg shadow-sm
                   focus:outline-none focus:ring-3 focus:ring-primary-500/30
                   hover:shadow-md transition-all">
  Button
</button>

<input className="px-3 py-2 border border-border-primary rounded-lg
                  focus:outline-none focus:ring-3 focus:ring-primary-500/30
                  focus:border-primary-500 transition-all" />
```

## Accessibility

1. **Focus indicators**: Never rely solely on shadow for focus states
2. **Sufficient contrast**: Ensure shadows don't reduce text contrast below WCAG standards
3. **Reduced motion**: Respect `prefers-reduced-motion` for elevation transitions

```css
@media (prefers-reduced-motion: reduce) {
  .interactive-card {
    transition: none;
  }
}
```

## Performance

### Optimization Tips
1. **Use transform for animations**: `transform: translateY(-2px)` instead of changing shadow blur
2. **Composite layers**: `will-change: box-shadow` for frequently animated elements
3. **Limit shadow complexity**: Avoid excessive blur radius or multiple shadows

```css
/* Performant hover effect */
.optimized-card {
  box-shadow: var(--shadow-sm);
  transition: transform 200ms ease, box-shadow 200ms ease;
  will-change: transform;
}

.optimized-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

## Best Practices

1. **Consistent layering**: Higher elevation = higher z-index
2. **Subtle by default**: Start with lighter shadows, add emphasis where needed
3. **Combine with borders**: Use subtle borders on cards to maintain edges in light mode
4. **Dark mode consideration**: Test shadows in both themes
5. **Interactive feedback**: Elevate on hover, depress on active
6. **Context matters**: Modals should always be highest elevation on page
