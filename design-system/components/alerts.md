# Alerts & Notifications

## Alert Banners

### Info Alert
```tsx
<div className="flex items-start gap-3 p-4 bg-info-50 border border-info-200 rounded-lg">
  <InfoIcon className="w-5 h-5 text-info-600 flex-shrink-0 mt-0.5" />
  <div className="flex-1">
    <h4 className="text-sm font-semibold text-info-900 mb-1">
      Information
    </h4>
    <p className="text-sm text-info-800">
      This is an informational message. It provides helpful context.
    </p>
  </div>
  <button className="text-info-600 hover:text-info-800 transition-colors" aria-label="Dismiss">
    <XIcon className="w-5 h-5" />
  </button>
</div>
```

### Success Alert
```tsx
<div className="flex items-start gap-3 p-4 bg-success-50 border border-success-200 rounded-lg">
  <CheckCircleIcon className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
  <div className="flex-1">
    <h4 className="text-sm font-semibold text-success-900 mb-1">
      Success
    </h4>
    <p className="text-sm text-success-800">
      Your changes have been saved successfully.
    </p>
  </div>
  <button className="text-success-600 hover:text-success-800 transition-colors" aria-label="Dismiss">
    <XIcon className="w-5 h-5" />
  </button>
</div>
```

### Warning Alert
```tsx
<div className="flex items-start gap-3 p-4 bg-warning-50 border border-warning-200 rounded-lg">
  <AlertTriangleIcon className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
  <div className="flex-1">
    <h4 className="text-sm font-semibold text-warning-900 mb-1">
      Warning
    </h4>
    <p className="text-sm text-warning-800">
      Your subscription will expire in 3 days. Please renew to continue using premium features.
    </p>
  </div>
  <button className="text-warning-600 hover:text-warning-800 transition-colors" aria-label="Dismiss">
    <XIcon className="w-5 h-5" />
  </button>
</div>
```

### Error Alert
```tsx
<div className="flex items-start gap-3 p-4 bg-error-50 border border-error-200 rounded-lg">
  <AlertCircleIcon className="w-5 h-5 text-error-600 flex-shrink-0 mt-0.5" />
  <div className="flex-1">
    <h4 className="text-sm font-semibold text-error-900 mb-1">
      Error
    </h4>
    <p className="text-sm text-error-800">
      There was a problem processing your request. Please try again.
    </p>
  </div>
  <button className="text-error-600 hover:text-error-800 transition-colors" aria-label="Dismiss">
    <XIcon className="w-5 h-5" />
  </button>
</div>
```

## Toast Notifications

### Toast Component
```tsx
import { Transition } from '@headlessui/react';
import { createContext, useContext, useState } from 'react';

interface Toast {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message?: string;
}

const ToastContext = createContext<{
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { ...toast, id }]);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

function ToastContainer() {
  const { toasts, removeToast } = useContext(ToastContext);

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4 pointer-events-none">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onDismiss={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function Toast({ type, title, message, onDismiss }: Toast & { onDismiss: () => void }) {
  const styles = {
    info: {
      container: 'bg-info-50 border-info-200',
      icon: 'text-info-600',
      title: 'text-info-900',
      message: 'text-info-800',
      Icon: InfoIcon,
    },
    success: {
      container: 'bg-success-50 border-success-200',
      icon: 'text-success-600',
      title: 'text-success-900',
      message: 'text-success-800',
      Icon: CheckCircleIcon,
    },
    warning: {
      container: 'bg-warning-50 border-warning-200',
      icon: 'text-warning-600',
      title: 'text-warning-900',
      message: 'text-warning-800',
      Icon: AlertTriangleIcon,
    },
    error: {
      container: 'bg-error-50 border-error-200',
      icon: 'text-error-600',
      title: 'text-error-900',
      message: 'text-error-800',
      Icon: AlertCircleIcon,
    },
  };

  const style = styles[type];
  const Icon = style.Icon;

  return (
    <Transition
      appear
      show
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-2"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={`
        flex items-start gap-3 p-4
        border rounded-xl shadow-2xl
        max-w-sm w-full
        pointer-events-auto
        ${style.container}
      `}>
        <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${style.icon}`} />
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-semibold ${style.title}`}>
            {title}
          </h4>
          {message && (
            <p className={`text-sm mt-1 ${style.message}`}>
              {message}
            </p>
          )}
        </div>
        <button
          onClick={onDismiss}
          className={`${style.icon} hover:opacity-70 transition-opacity flex-shrink-0`}
          aria-label="Dismiss"
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>
    </Transition>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

// Usage
function MyComponent() {
  const { addToast } = useToast();

  const handleClick = () => {
    addToast({
      type: 'success',
      title: 'Success',
      message: 'Your changes have been saved.',
    });
  };

  return <button onClick={handleClick}>Save</button>;
}
```

## Inline Alerts

### Simple
```tsx
<div className="flex items-center gap-2 text-sm text-error-600">
  <AlertCircleIcon className="w-4 h-4" />
  <span>This field is required</span>
</div>
```

### With Action
```tsx
<div className="flex items-center justify-between p-3 bg-warning-50 border border-warning-200 rounded-lg">
  <div className="flex items-center gap-2">
    <AlertTriangleIcon className="w-5 h-5 text-warning-600" />
    <p className="text-sm text-warning-800">
      Your trial expires in 3 days
    </p>
  </div>
  <button className="text-sm font-medium text-warning-700 hover:text-warning-900 underline-offset-4 hover:underline">
    Upgrade Now
  </button>
</div>
```

## Banner Notifications

### Top Banner
```tsx
<div className="bg-primary-500 text-white">
  <div className="max-w-7xl mx-auto px-6 py-3">
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm font-medium">
        🎉 New feature: Export your data as CSV or PDF
      </p>
      <div className="flex items-center gap-3">
        <a href="/features" className="text-sm font-medium underline-offset-4 hover:underline">
          Learn More
        </a>
        <button aria-label="Dismiss">
          <XIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</div>
```

## Loading Alerts

### Skeleton Alert
```tsx
<div className="flex items-start gap-3 p-4 bg-neutral-100 border border-border-primary rounded-lg animate-pulse">
  <div className="w-5 h-5 bg-neutral-300 rounded flex-shrink-0" />
  <div className="flex-1 space-y-2">
    <div className="h-4 bg-neutral-300 rounded w-24" />
    <div className="h-3 bg-neutral-300 rounded w-full" />
  </div>
</div>
```

### Progress Alert
```tsx
<div className="flex items-start gap-3 p-4 bg-info-50 border border-info-200 rounded-lg">
  <div className="w-5 h-5 border-2 border-info-600 border-t-transparent rounded-full animate-spin flex-shrink-0 mt-0.5" />
  <div className="flex-1">
    <h4 className="text-sm font-semibold text-info-900 mb-1">
      Processing
    </h4>
    <p className="text-sm text-info-800 mb-3">
      Uploading your files...
    </p>
    <div className="w-full bg-info-200 rounded-full h-2">
      <div className="bg-info-600 h-2 rounded-full transition-all duration-300" style={{ width: '65%' }} />
    </div>
  </div>
</div>
```

## React Component

```tsx
import { forwardRef, HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const alertVariants = cva(
  'flex items-start gap-3 p-4 border rounded-lg',
  {
    variants: {
      variant: {
        info: 'bg-info-50 border-info-200',
        success: 'bg-success-50 border-success-200',
        warning: 'bg-warning-50 border-warning-200',
        error: 'bg-error-50 border-error-200',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

const iconStyles = {
  info: 'text-info-600',
  success: 'text-success-600',
  warning: 'text-warning-600',
  error: 'text-error-600',
};

const titleStyles = {
  info: 'text-info-900',
  success: 'text-success-900',
  warning: 'text-warning-900',
  error: 'text-error-900',
};

const messageStyles = {
  info: 'text-info-800',
  success: 'text-success-800',
  warning: 'text-warning-800',
  error: 'text-error-800',
};

export interface AlertProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title: string;
  message?: string;
  onDismiss?: () => void;
  dismissible?: boolean;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', title, message, onDismiss, dismissible = false, ...props }, ref) => {
    const icons = {
      info: InfoIcon,
      success: CheckCircleIcon,
      warning: AlertTriangleIcon,
      error: AlertCircleIcon,
    };

    const Icon = icons[variant];

    return (
      <div ref={ref} className={alertVariants({ variant, className })} {...props}>
        <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconStyles[variant]}`} />
        <div className="flex-1">
          <h4 className={`text-sm font-semibold mb-1 ${titleStyles[variant]}`}>
            {title}
          </h4>
          {message && (
            <p className={`text-sm ${messageStyles[variant]}`}>
              {message}
            </p>
          )}
        </div>
        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className={`${iconStyles[variant]} hover:opacity-70 transition-opacity`}
            aria-label="Dismiss"
          >
            <XIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

// Usage
import { Alert } from '@/components/ui/alert';

<Alert
  variant="success"
  title="Success"
  message="Your changes have been saved."
  dismissible
  onDismiss={() => console.log('Dismissed')}
/>
```

## Accessibility

### Requirements
- **ARIA roles**: Use `role="alert"` for critical messages
- **Live regions**: Use `aria-live="polite"` or `"assertive"` for dynamic content
- **Focus management**: Move focus to dismissible alerts when they appear
- **Keyboard accessible**: Ensure dismiss buttons are keyboard accessible
- **Color independence**: Don't rely solely on color (use icons)

### Example
```tsx
<div
  role="alert"
  aria-live="assertive"
  className="flex items-start gap-3 p-4 bg-error-50 border border-error-200 rounded-lg"
>
  <AlertCircleIcon className="w-5 h-5 text-error-600" aria-hidden="true" />
  <div className="flex-1">
    <h4 className="text-sm font-semibold text-error-900">
      Error
    </h4>
    <p className="text-sm text-error-800">
      Failed to process payment. Please check your card details.
    </p>
  </div>
</div>
```

## Best Practices

1. **Use sparingly**: Too many alerts create alert fatigue
2. **Contextual placement**: Show alerts near relevant content
3. **Auto-dismiss**: Non-critical toasts should dismiss automatically (5s)
4. **Persistent errors**: Keep error alerts until user dismisses
5. **Clear actions**: Provide actionable next steps
6. **Consistent icons**: Same icon for same message type across app
7. **Proper severity**: Match variant to message importance
8. **Mobile-friendly**: Ensure alerts work well on small screens
9. **Stack toasts**: Show multiple toasts in a queue, not overlapping
10. **Pause on hover**: Pause auto-dismiss when user hovers over toast

## Animation Guidelines

```css
/* Slide in from top (banner) */
@keyframes slide-in-top {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

/* Slide up from bottom (toast) */
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Fade out */
@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
```
