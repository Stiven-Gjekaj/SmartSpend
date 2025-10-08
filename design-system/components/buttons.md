# Buttons

## Overview

Buttons trigger actions and are the primary way users interact with your interface. Our button system provides clear visual hierarchy and consistent interaction patterns.

## Variants

### Primary
High-emphasis actions - use sparingly for the most important action on screen.

```tsx
<button className="
  px-4 py-2
  bg-interactive-primary hover:bg-interactive-primary-hover active:bg-interactive-primary-active
  text-text-on-primary font-medium
  rounded-lg shadow-sm hover:shadow-md
  transition-all duration-100
  focus:outline-none focus:ring-3 focus:ring-primary-500/30
  disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
">
  Primary Action
</button>
```

### Secondary
Medium-emphasis actions - for secondary operations.

```tsx
<button className="
  px-4 py-2
  bg-interactive-secondary hover:bg-interactive-secondary-hover
  text-text-primary font-medium
  border border-border-primary
  rounded-lg
  transition-colors duration-100
  focus:outline-none focus:ring-3 focus:ring-primary-500/30
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Secondary Action
</button>
```

### Ghost
Low-emphasis actions - minimal visual weight.

```tsx
<button className="
  px-4 py-2
  bg-transparent hover:bg-neutral-100 active:bg-neutral-200
  text-text-primary font-medium
  rounded-lg
  transition-colors duration-100
  focus:outline-none focus:ring-3 focus:ring-primary-500/30
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Ghost Action
</button>
```

### Danger
Destructive or high-risk actions.

```tsx
<button className="
  px-4 py-2
  bg-error-500 hover:bg-error-600 active:bg-error-700
  text-white font-medium
  rounded-lg shadow-sm hover:shadow-md
  transition-all duration-100
  focus:outline-none focus:ring-3 focus:ring-error-500/30
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Delete
</button>
```

### Link
Inline text links.

```tsx
<button className="
  text-text-link hover:text-primary-700 underline-offset-4
  font-medium
  hover:underline
  transition-colors duration-100
  focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Learn More
</button>
```

## Sizes

### Small
Compact interfaces, secondary actions.

```tsx
<button className="px-3 py-1.5 text-sm rounded-md">
  Small
</button>
```

### Default
Standard size for most use cases.

```tsx
<button className="px-4 py-2 text-base rounded-lg">
  Default
</button>
```

### Large
Landing pages, hero sections, primary CTAs.

```tsx
<button className="px-6 py-3 text-lg rounded-xl">
  Large
</button>
```

## Icon Buttons

### Icon Only
```tsx
<button className="
  p-2
  bg-transparent hover:bg-neutral-100 active:bg-neutral-200
  text-text-secondary hover:text-text-primary
  rounded-lg
  transition-colors duration-100
  focus:outline-none focus:ring-3 focus:ring-primary-500/30
" aria-label="Close">
  <XIcon className="w-5 h-5" />
</button>
```

### Icon with Text (Leading)
```tsx
<button className="
  px-4 py-2
  bg-primary-500 hover:bg-primary-600
  text-white font-medium
  rounded-lg shadow-sm
  flex items-center gap-2
  transition-all duration-100
">
  <PlusIcon className="w-5 h-5" />
  <span>Add Item</span>
</button>
```

### Icon with Text (Trailing)
```tsx
<button className="
  px-4 py-2
  bg-neutral-200 hover:bg-neutral-300
  text-text-primary font-medium
  rounded-lg
  flex items-center gap-2
  transition-colors duration-100
">
  <span>Next</span>
  <ArrowRightIcon className="w-5 h-5" />
</button>
```

## Loading State

```tsx
function LoadingButton({ loading, children, ...props }) {
  return (
    <button
      className="
        px-4 py-2
        bg-primary-500 hover:bg-primary-600
        text-white font-medium
        rounded-lg shadow-sm
        flex items-center gap-2
        transition-all duration-100
        disabled:opacity-50 disabled:cursor-not-allowed
      "
      disabled={loading}
      {...props}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      <span>{children}</span>
    </button>
  );
}

// Usage
<LoadingButton loading={isSubmitting}>
  Submit
</LoadingButton>
```

## Button Groups

### Horizontal
```tsx
<div className="inline-flex rounded-lg border border-border-primary overflow-hidden">
  <button className="px-4 py-2 bg-white hover:bg-neutral-50 border-r border-border-primary">
    Left
  </button>
  <button className="px-4 py-2 bg-white hover:bg-neutral-50 border-r border-border-primary">
    Middle
  </button>
  <button className="px-4 py-2 bg-white hover:bg-neutral-50">
    Right
  </button>
</div>
```

### Vertical
```tsx
<div className="inline-flex flex-col rounded-lg border border-border-primary overflow-hidden">
  <button className="px-4 py-2 bg-white hover:bg-neutral-50 border-b border-border-primary text-left">
    Option 1
  </button>
  <button className="px-4 py-2 bg-white hover:bg-neutral-50 border-b border-border-primary text-left">
    Option 2
  </button>
  <button className="px-4 py-2 bg-white hover:bg-neutral-50 text-left">
    Option 3
  </button>
</div>
```

## Full Width

```tsx
<button className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg">
  Full Width Button
</button>
```

## React Component

```tsx
import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  // Base styles
  `
    inline-flex items-center justify-center gap-2
    font-medium
    transition-all duration-100
    focus:outline-none focus:ring-3
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
  `,
  {
    variants: {
      variant: {
        primary: `
          bg-primary-500 hover:bg-primary-600 active:bg-primary-700
          text-white
          shadow-sm hover:shadow-md
          focus:ring-primary-500/30
        `,
        secondary: `
          bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400
          text-text-primary
          border border-border-primary
          focus:ring-primary-500/30
        `,
        ghost: `
          bg-transparent hover:bg-neutral-100 active:bg-neutral-200
          text-text-primary
          focus:ring-primary-500/30
        `,
        danger: `
          bg-error-500 hover:bg-error-600 active:bg-error-700
          text-white
          shadow-sm hover:shadow-md
          focus:ring-error-500/30
        `,
        link: `
          text-text-link hover:text-primary-700
          underline-offset-4 hover:underline
          focus:ring-primary-500/30
        `,
      },
      size: {
        sm: 'px-3 py-1.5 text-sm rounded-md',
        md: 'px-4 py-2 text-base rounded-lg',
        lg: 'px-6 py-3 text-lg rounded-xl',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, fullWidth, className })}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Usage
import { Button } from '@/components/ui/button';

<Button variant="primary" size="lg">
  Click Me
</Button>

<Button variant="secondary" loading={isLoading}>
  Save
</Button>

<Button variant="danger" size="sm">
  Delete
</Button>
```

## Accessibility

### Requirements
- **Keyboard accessible**: Focusable via Tab, activated via Enter/Space
- **Focus visible**: Clear focus indicator (ring)
- **Disabled state**: Use `disabled` attribute, not just styling
- **Loading state**: Disable button and announce to screen readers
- **Descriptive labels**: Text should describe action clearly
- **Icon-only buttons**: Must have `aria-label`

### ARIA Attributes
```tsx
// Icon-only button
<button aria-label="Close dialog">
  <XIcon />
</button>

// Loading state
<button aria-busy={loading} aria-label={loading ? 'Submitting...' : 'Submit'}>
  {loading ? 'Submitting...' : 'Submit'}
</button>

// Toggle button
<button
  aria-pressed={isActive}
  onClick={() => setIsActive(!isActive)}
>
  {isActive ? 'Active' : 'Inactive'}
</button>
```

## Best Practices

1. **One primary button per section**: Avoid multiple competing CTAs
2. **Clear hierarchy**: Primary > Secondary > Ghost
3. **Descriptive labels**: "Save Changes" not "OK"
4. **Loading feedback**: Show spinner during async operations
5. **Consistent sizing**: Use standard sizes across app
6. **Touch targets**: Minimum 44x44px for mobile
7. **Focus management**: Return focus after modal close
8. **Hover affordance**: Visual feedback on hover
9. **Destructive actions**: Use danger variant + confirmation
10. **Responsive**: Stack buttons vertically on mobile if needed

## Common Patterns

### Dialog Actions
```tsx
<div className="flex gap-3 justify-end">
  <Button variant="ghost" onClick={onCancel}>
    Cancel
  </Button>
  <Button variant="primary" onClick={onConfirm}>
    Confirm
  </Button>
</div>
```

### Form Submit
```tsx
<form onSubmit={handleSubmit} className="space-y-6">
  {/* Form fields */}

  <div className="flex gap-3">
    <Button type="button" variant="secondary" fullWidth>
      Cancel
    </Button>
    <Button type="submit" variant="primary" fullWidth loading={isSubmitting}>
      Submit
    </Button>
  </div>
</form>
```

### Mobile Bottom Actions
```tsx
<div className="fixed bottom-0 inset-x-0 p-4 bg-white border-t border-border-primary">
  <Button variant="primary" fullWidth size="lg">
    Continue
  </Button>
</div>
```
