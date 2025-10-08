# Spacing System

## Philosophy

Consistent spacing creates visual rhythm and hierarchy. Our 4px-based system provides flexibility while maintaining mathematical harmony across all screen sizes.

## Base Unit

```css
--space-unit: 0.25rem; /* 4px */
```

**Reasoning**: 4px is divisible by 2, makes scaling simple, and aligns with common screen densities.

## Spacing Scale

```css
--space-0: 0;
--space-px: 1px;
--space-0-5: 0.125rem;  /* 2px */
--space-1: 0.25rem;     /* 4px */
--space-1-5: 0.375rem;  /* 6px */
--space-2: 0.5rem;      /* 8px */
--space-2-5: 0.625rem;  /* 10px */
--space-3: 0.75rem;     /* 12px */
--space-3-5: 0.875rem;  /* 14px */
--space-4: 1rem;        /* 16px */
--space-5: 1.25rem;     /* 20px */
--space-6: 1.5rem;      /* 24px */
--space-7: 1.75rem;     /* 28px */
--space-8: 2rem;        /* 32px */
--space-9: 2.25rem;     /* 36px */
--space-10: 2.5rem;     /* 40px */
--space-11: 2.75rem;    /* 44px */
--space-12: 3rem;       /* 48px */
--space-14: 3.5rem;     /* 56px */
--space-16: 4rem;       /* 64px */
--space-20: 5rem;       /* 80px */
--space-24: 6rem;       /* 96px */
--space-28: 7rem;       /* 112px */
--space-32: 8rem;       /* 128px */
--space-36: 9rem;       /* 144px */
--space-40: 10rem;      /* 160px */
--space-44: 11rem;      /* 176px */
--space-48: 12rem;      /* 192px */
--space-52: 13rem;      /* 208px */
--space-56: 14rem;      /* 224px */
--space-60: 15rem;      /* 240px */
--space-64: 16rem;      /* 256px */
--space-72: 18rem;      /* 288px */
--space-80: 20rem;      /* 320px */
--space-96: 24rem;      /* 384px */
```

## Semantic Spacing

### Component Spacing
```css
/* Internal component padding */
--space-component-xs: var(--space-2);   /* 8px - Compact buttons, small chips */
--space-component-sm: var(--space-3);   /* 12px - Regular buttons, inputs */
--space-component-md: var(--space-4);   /* 16px - Cards, modals */
--space-component-lg: var(--space-6);   /* 24px - Large cards, sections */
--space-component-xl: var(--space-8);   /* 32px - Hero sections, large containers */

/* Gap between elements */
--space-gap-xs: var(--space-1);   /* 4px - Icon + text */
--space-gap-sm: var(--space-2);   /* 8px - Button groups */
--space-gap-md: var(--space-4);   /* 16px - Form fields */
--space-gap-lg: var(--space-6);   /* 24px - Card content */
--space-gap-xl: var(--space-8);   /* 32px - Sections */

/* Layout spacing */
--space-layout-xs: var(--space-4);   /* 16px - Tight mobile */
--space-layout-sm: var(--space-6);   /* 24px - Mobile default */
--space-layout-md: var(--space-8);   /* 32px - Tablet */
--space-layout-lg: var(--space-12);  /* 48px - Desktop */
--space-layout-xl: var(--space-16);  /* 64px - Wide desktop */
--space-layout-2xl: var(--space-24); /* 96px - Ultra-wide sections */
```

## Container Widths

```css
--container-sm: 640px;   /* Mobile landscape */
--container-md: 768px;   /* Tablet */
--container-lg: 1024px;  /* Desktop */
--container-xl: 1280px;  /* Wide desktop */
--container-2xl: 1536px; /* Ultra-wide */

/* Content widths for readability */
--content-narrow: 600px;  /* Forms, focused content */
--content-default: 768px; /* Articles, documentation */
--content-wide: 1024px;   /* Dashboards, data tables */
```

## Usage Guidelines

### Padding Scale
```
xs (8px):  Compact UI - tags, small buttons
sm (12px): Default buttons, input fields
md (16px): Cards, modals, default sections
lg (24px): Feature cards, prominent sections
xl (32px): Hero sections, major layout blocks
```

### Margin/Gap Scale
```
xs (4px):  Icon-text pairs, inline elements
sm (8px):  Related controls (button groups)
md (16px): Form fields, list items
lg (24px): Card content, subsections
xl (32px): Major sections, page divisions
2xl (48px): Hero sections, major separations
```

### Responsive Adjustments

```css
/* Mobile: Tighter spacing */
.section {
  padding: var(--space-layout-sm);
  gap: var(--space-gap-md);
}

/* Desktop: More breathing room */
@media (min-width: 768px) {
  .section {
    padding: var(--space-layout-lg);
    gap: var(--space-gap-lg);
  }
}

/* Ultra-wide: Maximum comfort */
@media (min-width: 1280px) {
  .section {
    padding: var(--space-layout-xl);
    gap: var(--space-gap-xl);
  }
}
```

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    spacing: {
      px: '1px',
      0: '0',
      0.5: '0.125rem',
      1: '0.25rem',
      1.5: '0.375rem',
      2: '0.5rem',
      2.5: '0.625rem',
      3: '0.75rem',
      3.5: '0.875rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      11: '2.75rem',
      12: '3rem',
      14: '3.5rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      28: '7rem',
      32: '8rem',
      36: '9rem',
      40: '10rem',
      44: '11rem',
      48: '12rem',
      52: '13rem',
      56: '14rem',
      60: '15rem',
      64: '16rem',
      72: '18rem',
      80: '20rem',
      96: '24rem',
    },
    maxWidth: {
      narrow: '600px',
      default: '768px',
      wide: '1024px',
    }
  }
}
```

## React Examples

### Card with proper spacing
```tsx
<div className="bg-surface-primary rounded-xl p-6 space-y-4">
  <h3 className="text-xl font-semibold">Card Title</h3>
  <p className="text-text-secondary">Card content with proper spacing.</p>
  <button className="px-4 py-2 bg-primary-500">Action</button>
</div>
```

### Form with consistent gaps
```tsx
<form className="space-y-6 max-w-narrow">
  <div className="space-y-2">
    <label className="block text-sm font-medium">Email</label>
    <input className="w-full px-3 py-2 border rounded-lg" />
  </div>

  <div className="space-y-2">
    <label className="block text-sm font-medium">Password</label>
    <input type="password" className="w-full px-3 py-2 border rounded-lg" />
  </div>

  <button className="w-full py-3 px-4 bg-primary-500 text-white rounded-lg">
    Sign In
  </button>
</form>
```

### Responsive section
```tsx
<section className="px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-24">
  <div className="max-w-wide mx-auto space-y-8 lg:space-y-12">
    <h2 className="text-3xl md:text-4xl font-bold">Section Title</h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {/* Cards */}
    </div>
  </div>
</section>
```

### Stack with consistent gaps
```tsx
<div className="flex flex-col gap-1">
  <span className="text-sm font-medium">Label</span>
  <span className="text-xs text-text-tertiary">Helper text</span>
</div>

<div className="flex items-center gap-2">
  <Icon className="w-4 h-4" />
  <span>Icon with text</span>
</div>

<div className="flex gap-4">
  <button>Cancel</button>
  <button>Confirm</button>
</div>
```

## Common Patterns

### Stack Layout (Vertical)
```tsx
/* Tight stack - related items */
<div className="space-y-1">...</div>  {/* 4px */}

/* Default stack - form fields */
<div className="space-y-4">...</div>  {/* 16px */}

/* Loose stack - sections */
<div className="space-y-8">...</div>  {/* 32px */}
```

### Inline Layout (Horizontal)
```tsx
/* Tight inline - icon+text */
<div className="flex gap-1">...</div>  {/* 4px */}

/* Default inline - button group */
<div className="flex gap-3">...</div>  {/* 12px */}

/* Loose inline - separated items */
<div className="flex gap-6">...</div>  {/* 24px */}
```

### Grid Layout
```tsx
/* Compact grid - image gallery */
<div className="grid grid-cols-3 gap-2">...</div>  {/* 8px */}

/* Default grid - cards */
<div className="grid grid-cols-3 gap-6">...</div>  {/* 24px */}

/* Spacious grid - feature blocks */
<div className="grid grid-cols-3 gap-8">...</div>  {/* 32px */}
```

## Accessibility

1. **Touch targets**: Minimum 44x44px (space-11) for interactive elements
2. **Spacing aids focus**: Clear gaps between clickable items prevent mis-taps
3. **White space improves readability**: Don't cram content together
4. **Responsive spacing**: Reduce on mobile to maximize space

## Best Practices

1. **Stick to the scale**: Avoid arbitrary values like `margin: 13px`
2. **Use semantic tokens**: Prefer `space-component-md` over raw `space-4` for components
3. **Consistent patterns**: Same spacing for same element types
4. **Mobile-first**: Start with tighter spacing, expand for larger screens
5. **Test readability**: Ensure content doesn't feel cramped or overly sparse
6. **Grid alignment**: Use multiples of 4px for all layout dimensions
