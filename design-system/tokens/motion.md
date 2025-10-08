# Motion & Animation

## Philosophy

Motion brings interfaces to life, provides feedback, and guides attention. Our system prioritizes purposeful, subtle animations that enhance usability without causing distraction or motion sickness.

## Principles

1. **Purposeful**: Every animation serves a functional purpose
2. **Subtle**: Animations should feel natural, not theatrical
3. **Responsive**: Instant feedback for user interactions
4. **Respectful**: Honor `prefers-reduced-motion` preferences
5. **Consistent**: Same element types use same animations

## Duration

```css
/* Micro-interactions */
--duration-instant: 50ms;   /* State changes, ripples */
--duration-fast: 100ms;     /* Hover effects, simple transitions */
--duration-base: 200ms;     /* Default duration - buttons, cards */
--duration-moderate: 300ms; /* Dropdowns, tooltips */
--duration-slow: 400ms;     /* Modals, page transitions */
--duration-slower: 500ms;   /* Large movements, complex animations */
--duration-slowest: 700ms;  /* Hero animations, page loads */
```

### Duration Guidelines

```
instant (50ms):   Toggle switches, checkbox checks
fast (100ms):     Button hover states, icon highlights
base (200ms):     Card elevations, input focus, fades
moderate (300ms): Dropdown menus, tooltip appearances
slow (400ms):     Modal open/close, drawer slides
slower (500ms):   Page transitions, accordion expand
slowest (700ms):  Hero entrances, splash screens
```

## Easing Functions

```css
/* Standard easing curves */
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Custom curves */
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);      /* Default - smooth and natural */
--ease-snap: cubic-bezier(0.4, 0, 0.6, 1);        /* Quick deceleration */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Playful overshoot */
--ease-elastic: cubic-bezier(0.68, -0.55, 0.27, 1.55); /* Spring-like */

/* Entrance/exit */
--ease-entrance: cubic-bezier(0, 0, 0.2, 1);      /* Accelerate out */
--ease-exit: cubic-bezier(0.4, 0, 1, 1);          /* Decelerate in */
```

### Easing Selection

```
Linear:       Progress bars, loading spinners (continuous motion)
Ease-in:      Elements exiting (fade out, slide out)
Ease-out:     Elements entering (fade in, slide in)
Ease-in-out:  Bidirectional (toggle, expand/collapse)
Smooth:       Default for most UI (hover, focus, elevation)
Snap:         Snappy interactions (button press, switch toggle)
Bounce:       Playful elements (success confirmations)
Elastic:      Attention-grabbing (errors, important notifications)
```

## Common Transitions

### Standard Transition
Apply to most interactive elements:

```css
.transition-standard {
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  transition-duration: var(--duration-base);
  transition-timing-function: var(--ease-smooth);
}

/* Tailwind equivalent */
.transition
```

### Specific Properties

```css
/* Color changes */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-duration: var(--duration-fast);
  transition-timing-function: var(--ease-smooth);
}

/* Opacity fades */
.transition-opacity {
  transition-property: opacity;
  transition-duration: var(--duration-base);
  transition-timing-function: var(--ease-smooth);
}

/* Transform movements */
.transition-transform {
  transition-property: transform;
  transition-duration: var(--duration-base);
  transition-timing-function: var(--ease-smooth);
}

/* Elevation changes */
.transition-shadow {
  transition-property: box-shadow;
  transition-duration: var(--duration-base);
  transition-timing-function: var(--ease-smooth);
}

/* All properties (use sparingly) */
.transition-all {
  transition-property: all;
  transition-duration: var(--duration-base);
  transition-timing-function: var(--ease-smooth);
}
```

## Keyframe Animations

### Fade In
```css
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in var(--duration-base) var(--ease-out);
}
```

### Slide Up
```css
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slide-up var(--duration-moderate) var(--ease-out);
}
```

### Slide Down
```css
@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-down {
  animation: slide-down var(--duration-moderate) var(--ease-out);
}
```

### Scale In
```css
@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scale-in var(--duration-base) var(--ease-out);
}
```

### Spin (Loading)
```css
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s var(--ease-linear) infinite;
}
```

### Pulse
```css
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s var(--ease-smooth) infinite;
}
```

### Bounce (Subtle)
```css
@keyframes bounce-subtle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.animate-bounce-subtle {
  animation: bounce-subtle var(--duration-slow) var(--ease-smooth) infinite;
}
```

### Shake (Error)
```css
@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-4px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(4px);
  }
}

.animate-shake {
  animation: shake var(--duration-slow) var(--ease-smooth);
}
```

## Component Animations

### Button Press
```tsx
<button className="
  bg-primary-500 text-white px-4 py-2 rounded-lg
  transition-all duration-100
  hover:scale-105 hover:shadow-md
  active:scale-95 active:shadow-sm
">
  Press Me
</button>
```

### Card Hover
```tsx
<div className="
  bg-surface-primary shadow-sm rounded-xl p-6
  transition-all duration-200
  hover:shadow-lg hover:-translate-y-1
  cursor-pointer
">
  Card Content
</div>
```

### Modal Entrance
```tsx
// Backdrop
<div className="
  fixed inset-0 bg-black/50 backdrop-blur-sm
  animate-fade-in
" />

// Modal
<div className="
  bg-surface-primary shadow-xl rounded-2xl p-6
  animate-scale-in
">
  Modal Content
</div>
```

### Dropdown Slide
```tsx
<div className="
  absolute top-full mt-2 bg-surface-primary shadow-lg rounded-lg
  animate-slide-down origin-top
">
  <ul>
    <li className="px-4 py-2 hover:bg-neutral-100 transition-colors duration-100">
      Option 1
    </li>
  </ul>
</div>
```

### Toast Notification
```tsx
<div className="
  fixed bottom-4 right-4 bg-surface-primary shadow-2xl rounded-2xl p-4
  animate-slide-up
">
  <p>Notification content</p>
</div>
```

### Loading Spinner
```tsx
<div className="
  w-8 h-8 border-4 border-neutral-200 border-t-primary-500 rounded-full
  animate-spin
" />
```

### Skeleton Loader
```tsx
<div className="
  h-4 bg-neutral-200 rounded
  animate-pulse
" />
```

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      transitionDuration: {
        50: '50ms',
        100: '100ms',
        200: '200ms',
        300: '300ms',
        400: '400ms',
        500: '500ms',
        700: '700ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'snap': 'cubic-bezier(0.4, 0, 0.6, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'elastic': 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
        'entrance': 'cubic-bezier(0, 0, 0.2, 1)',
        'exit': 'cubic-bezier(0.4, 0, 1, 1)',
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
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 200ms ease-out',
        'slide-up': 'slide-up 300ms ease-out',
        'slide-down': 'slide-down 300ms ease-out',
        'scale-in': 'scale-in 200ms ease-out',
        'shake': 'shake 400ms ease-in-out',
        'bounce-subtle': 'bounce-subtle 400ms ease-in-out infinite',
      },
    }
  }
}
```

## Accessibility

### Reduced Motion

**Always respect user preferences:**

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### React Implementation
```tsx
import { useEffect, useState } from 'react';

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return reducedMotion;
}

// Usage
function AnimatedButton() {
  const reducedMotion = useReducedMotion();

  return (
    <button className={reducedMotion ? '' : 'transition-all hover:scale-105'}>
      Click Me
    </button>
  );
}
```

## Performance

### Optimization Tips

1. **Use transform and opacity**: Hardware-accelerated properties
2. **Avoid animating layout**: Don't animate `width`, `height`, `top`, `left`
3. **Use will-change sparingly**: Only for frequently animated elements

```css
/* Good - hardware accelerated */
.good {
  transition: transform 200ms, opacity 200ms;
}
.good:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

/* Bad - causes reflow */
.bad {
  transition: height 200ms, margin 200ms;
}
.bad:hover {
  height: 150px;
  margin-top: 20px;
}

/* will-change for high-frequency animations */
.frequently-animated {
  will-change: transform;
}
```

## Best Practices

1. **Start subtle**: Less is more with animation
2. **Provide feedback**: Animate on user interactions
3. **Guide attention**: Use motion to direct focus
4. **Maintain hierarchy**: Important elements animate first
5. **Test performance**: Monitor frame rates on lower-end devices
6. **Respect preferences**: Always honor `prefers-reduced-motion`
7. **Be consistent**: Same elements = same animations
8. **Avoid distraction**: Limit infinite animations
9. **Consider context**: Slower animations for large movements
10. **Test both themes**: Ensure animations work in light and dark modes

## Common Patterns

### Staggered List Animation
```tsx
{items.map((item, index) => (
  <div
    key={item.id}
    className="animate-fade-in"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    {item.content}
  </div>
))}
```

### Loading State
```tsx
<div className="flex items-center gap-2">
  <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
  <span className="animate-pulse">Loading...</span>
</div>
```

### Success Confirmation
```tsx
<div className="animate-scale-in flex items-center gap-2 text-success-600">
  <CheckCircleIcon className="w-5 h-5 animate-bounce-subtle" />
  <span>Saved successfully!</span>
</div>
```

### Error Shake
```tsx
<input
  className={`
    px-3 py-2 border rounded-lg
    ${error ? 'border-error-500 animate-shake' : 'border-neutral-300'}
  `}
/>
```
