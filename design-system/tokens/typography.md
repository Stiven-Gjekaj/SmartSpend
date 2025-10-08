# Typography System

## Philosophy

Typography creates hierarchy, guides attention, and establishes brand voice. Our system uses a modular scale for mathematical harmony and responsive sizing for optimal readability across devices.

## Font Families

### Primary: Inter
**Usage**: UI elements, body text, data tables

```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Reasoning**: Inter is optimized for screens with exceptional clarity at small sizes. Variable font support enables precise weight control.

### Display: Cal Sans
**Usage**: Hero headings, marketing content (optional)

```css
--font-display: 'Cal Sans', var(--font-primary);
```

**Reasoning**: Adds personality to key moments without sacrificing readability.

### Mono: JetBrains Mono
**Usage**: Code, numerical data, tabular layouts

```css
--font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

**Reasoning**: Clear distinction between characters (0 vs O), optimized ligatures.

## Type Scale

Based on 1.250 (major third) ratio for harmonious scaling.

```css
/* Mobile Base: 16px */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
--text-6xl: 3.75rem;   /* 60px */
--text-7xl: 4.5rem;    /* 72px */

/* Desktop adjustments (≥768px) */
@media (min-width: 768px) {
  --text-3xl: 2rem;     /* 32px */
  --text-4xl: 2.5rem;   /* 40px */
  --text-5xl: 3.5rem;   /* 56px */
  --text-6xl: 4.5rem;   /* 72px */
  --text-7xl: 6rem;     /* 96px */
}
```

## Font Weights

```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

**Usage Guidelines**:
- **Light (300)**: Large display text only
- **Normal (400)**: Body text, paragraphs
- **Medium (500)**: Subtle emphasis, labels
- **Semibold (600)**: Headings, strong emphasis
- **Bold (700)**: Primary headings, CTAs
- **Extrabold (800)**: Hero text, marketing

## Line Heights

```css
--leading-none: 1;
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;
```

**Contextual Usage**:
- **Headings**: `leading-tight` (1.25) - Tight spacing for impact
- **Body text**: `leading-normal` (1.5) - Optimal readability
- **Small text**: `leading-relaxed` (1.625) - Extra space for legibility

## Letter Spacing

```css
--tracking-tighter: -0.05em;
--tracking-tight: -0.025em;
--tracking-normal: 0;
--tracking-wide: 0.025em;
--tracking-wider: 0.05em;
--tracking-widest: 0.1em;
```

**Usage**:
- **Large headings**: `tracking-tight` - Optical balance
- **Body text**: `tracking-normal` - Default spacing
- **Uppercase labels**: `tracking-wide` - Improved readability
- **Small caps**: `tracking-wider` - Enhanced legibility

## Type Styles

### Display
Hero sections, landing pages

```css
.text-display-2xl {
  font-size: var(--text-7xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-none);
  letter-spacing: var(--tracking-tight);
}

.text-display-xl {
  font-size: var(--text-6xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}

.text-display-lg {
  font-size: var(--text-5xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}
```

### Headings
```css
.text-h1 {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}

.text-h2 {
  font-size: var(--text-3xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
}

.text-h3 {
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-snug);
}

.text-h4 {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-snug);
}

.text-h5 {
  font-size: var(--text-lg);
  font-weight: var(--font-medium);
  line-height: var(--leading-normal);
}

.text-h6 {
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  line-height: var(--leading-normal);
}
```

### Body
```css
.text-body-lg {
  font-size: var(--text-lg);
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed);
}

.text-body {
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
}

.text-body-sm {
  font-size: var(--text-sm);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
}
```

### Labels & UI
```css
.text-label-lg {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  line-height: var(--leading-normal);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

.text-label {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  line-height: var(--leading-normal);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
}

.text-caption {
  font-size: var(--text-xs);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
}

.text-overline {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  line-height: var(--leading-normal);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
}
```

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    fontFamily: {
      sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      display: ['Cal Sans', 'Inter', 'sans-serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
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
  }
}
```

## React Examples

```tsx
// Hero section
<div className="space-y-4">
  <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-text-primary">
    Smart Spending Starts Here
  </h1>
  <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
    Track expenses, gain insights, achieve financial freedom.
  </p>
</div>

// Card heading
<h3 className="text-2xl font-semibold text-text-primary">
  Monthly Overview
</h3>

// Form label
<label className="text-xs font-medium uppercase tracking-wider text-text-secondary">
  Email Address
</label>

// Caption text
<p className="text-xs text-text-tertiary">
  Last updated 5 minutes ago
</p>
```

## Accessibility

### Minimum Sizes
- **Body text**: 16px minimum (18px preferred for long-form)
- **UI labels**: 14px minimum
- **Small text**: 12px absolute minimum (use sparingly)

### Contrast
- Ensure text meets WCAG AA standards (see [colors.md](./colors.md))
- Use `text-secondary` for deemphasized content, never below
- Avoid `text-tertiary` on backgrounds lighter than `bg-secondary`

### Readability
- **Line length**: 50-75 characters for body text
- **Paragraph spacing**: 1.5-2rem between paragraphs
- **Responsive sizing**: Scale down gracefully on mobile

### Focus States
```css
.focusable-text:focus-visible {
  outline: 2px solid var(--border-focus);
  outline-offset: 2px;
  border-radius: 0.125rem;
}
```

## Best Practices

1. **Use semantic HTML**: `<h1>` through `<h6>`, `<p>`, `<label>` for proper structure
2. **Respect hierarchy**: Only one `<h1>` per page, sequential heading levels
3. **Optimize loading**: Use `font-display: swap` for custom fonts
4. **Variable fonts**: Leverage Inter's variable weight for smooth transitions
5. **Responsive**: Reduce sizes 15-20% on mobile for better readability

## Font Loading

```html
<!-- In <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

```css
/* CSS with fallbacks */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url('/fonts/inter-var.woff2') format('woff2');
}
```
