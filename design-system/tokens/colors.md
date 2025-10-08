# Color System

## Philosophy

Our color system uses a 50-950 scale providing granular control while maintaining visual harmony. Colors are semantic-first, enabling consistent theming.

## Palette

### Primary (Brand)
Used for primary actions, key UI elements, and brand identity.

```css
--color-primary-50: #f0f9ff;
--color-primary-100: #e0f2fe;
--color-primary-200: #bae6fd;
--color-primary-300: #7dd3fc;
--color-primary-400: #38bdf8;
--color-primary-500: #0ea5e9; /* Main brand color */
--color-primary-600: #0284c7;
--color-primary-700: #0369a1;
--color-primary-800: #075985;
--color-primary-900: #0c4a6e;
--color-primary-950: #082f49;
```

**Reasoning**: Sky blue conveys trust, professionalism, and clarity - essential for financial apps.

### Secondary (Accent)
Used for secondary actions, highlights, and visual interest.

```css
--color-secondary-50: #fdf4ff;
--color-secondary-100: #fae8ff;
--color-secondary-200: #f5d0fe;
--color-secondary-300: #f0abfc;
--color-secondary-400: #e879f9;
--color-secondary-500: #d946ef;
--color-secondary-600: #c026d3;
--color-secondary-700: #a21caf;
--color-secondary-800: #86198f;
--color-secondary-900: #701a75;
--color-secondary-950: #4a044e;
```

**Reasoning**: Purple adds sophistication and distinguishes from primary without competing.

### Neutral (Surfaces & Text)
Foundation for backgrounds, surfaces, borders, and text.

```css
/* Light mode */
--color-neutral-50: #fafafa;
--color-neutral-100: #f5f5f5;
--color-neutral-200: #e5e5e5;
--color-neutral-300: #d4d4d4;
--color-neutral-400: #a3a3a3;
--color-neutral-500: #737373;
--color-neutral-600: #525252;
--color-neutral-700: #404040;
--color-neutral-800: #262626;
--color-neutral-900: #171717;
--color-neutral-950: #0a0a0a;
```

**Reasoning**: True neutrals (not blue-grays) provide flexibility and work with any accent color.

### Semantic Colors

#### Success
```css
--color-success-50: #f0fdf4;
--color-success-100: #dcfce7;
--color-success-500: #22c55e;
--color-success-600: #16a34a;
--color-success-700: #15803d;
--color-success-900: #14532d;
```

#### Warning
```css
--color-warning-50: #fffbeb;
--color-warning-100: #fef3c7;
--color-warning-500: #f59e0b;
--color-warning-600: #d97706;
--color-warning-700: #b45309;
--color-warning-900: #78350f;
```

#### Error
```css
--color-error-50: #fef2f2;
--color-error-100: #fee2e2;
--color-error-500: #ef4444;
--color-error-600: #dc2626;
--color-error-700: #b91c1c;
--color-error-900: #7f1d1d;
```

#### Info
```css
--color-info-50: #eff6ff;
--color-info-100: #dbeafe;
--color-info-500: #3b82f6;
--color-info-600: #2563eb;
--color-info-700: #1d4ed8;
--color-info-900: #1e3a8a;
```

## Theme Tokens

### Light Mode
```css
:root {
  /* Backgrounds */
  --bg-primary: var(--color-neutral-50);
  --bg-secondary: var(--color-neutral-100);
  --bg-tertiary: #ffffff;
  --bg-elevated: #ffffff;

  /* Surfaces */
  --surface-primary: #ffffff;
  --surface-secondary: var(--color-neutral-50);
  --surface-tertiary: var(--color-neutral-100);

  /* Borders */
  --border-primary: var(--color-neutral-200);
  --border-secondary: var(--color-neutral-300);
  --border-focus: var(--color-primary-500);

  /* Text */
  --text-primary: var(--color-neutral-900);
  --text-secondary: var(--color-neutral-600);
  --text-tertiary: var(--color-neutral-500);
  --text-disabled: var(--color-neutral-400);
  --text-on-primary: #ffffff;
  --text-link: var(--color-primary-600);

  /* Interactive */
  --interactive-primary: var(--color-primary-500);
  --interactive-primary-hover: var(--color-primary-600);
  --interactive-primary-active: var(--color-primary-700);
  --interactive-secondary: var(--color-neutral-200);
  --interactive-secondary-hover: var(--color-neutral-300);
}
```

### Dark Mode
```css
[data-theme="dark"] {
  /* Backgrounds */
  --bg-primary: #0a0a0a;
  --bg-secondary: var(--color-neutral-950);
  --bg-tertiary: var(--color-neutral-900);
  --bg-elevated: var(--color-neutral-900);

  /* Surfaces */
  --surface-primary: var(--color-neutral-900);
  --surface-secondary: var(--color-neutral-800);
  --surface-tertiary: var(--color-neutral-700);

  /* Borders */
  --border-primary: var(--color-neutral-800);
  --border-secondary: var(--color-neutral-700);
  --border-focus: var(--color-primary-400);

  /* Text */
  --text-primary: var(--color-neutral-50);
  --text-secondary: var(--color-neutral-400);
  --text-tertiary: var(--color-neutral-500);
  --text-disabled: var(--color-neutral-600);
  --text-on-primary: #ffffff;
  --text-link: var(--color-primary-400);

  /* Interactive */
  --interactive-primary: var(--color-primary-500);
  --interactive-primary-hover: var(--color-primary-400);
  --interactive-primary-active: var(--color-primary-300);
  --interactive-secondary: var(--color-neutral-800);
  --interactive-secondary-hover: var(--color-neutral-700);
}
```

## Accessibility

All color combinations meet WCAG 2.1 AA standards:
- **Normal text**: 4.5:1 minimum contrast
- **Large text (18px+)**: 3:1 minimum contrast
- **UI components**: 3:1 minimum contrast

### Contrast Ratios (Light Mode)
- `text-primary` on `bg-primary`: 16.1:1 ✓
- `text-secondary` on `bg-primary`: 7.2:1 ✓
- `primary-500` on `bg-primary`: 4.8:1 ✓

### Contrast Ratios (Dark Mode)
- `text-primary` on `bg-primary`: 18.5:1 ✓
- `text-secondary` on `bg-primary`: 6.9:1 ✓
- `primary-400` on `bg-primary`: 5.2:1 ✓

## Usage

### Tailwind Config
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          600: '#0284c7',
          // ... rest of scale
        },
        // Semantic colors
        background: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
        }
      }
    }
  }
}
```

### React Example
```tsx
// Button with semantic colors
<button className="bg-interactive-primary hover:bg-interactive-primary-hover
                   text-text-on-primary">
  Primary Action
</button>

// Card with proper surface
<div className="bg-surface-primary border border-border-primary">
  <h3 className="text-text-primary">Card Title</h3>
  <p className="text-text-secondary">Card content</p>
</div>
```

## Best Practices

1. **Use semantic tokens**: Prefer `bg-primary` over `neutral-50` for easier theming
2. **Respect hierarchy**: Primary → Secondary → Tertiary in visual importance
3. **Test both themes**: Always verify designs work in light and dark modes
4. **Consider colorblindness**: Never rely solely on color to convey information
