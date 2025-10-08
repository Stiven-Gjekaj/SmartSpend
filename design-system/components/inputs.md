# Input Components

## Text Input

### Default
```tsx
<div className="space-y-2">
  <label htmlFor="email" className="block text-sm font-medium text-text-primary">
    Email Address
  </label>
  <input
    id="email"
    type="email"
    className="
      w-full px-3 py-2
      bg-surface-primary
      border border-border-primary
      rounded-lg
      text-text-primary placeholder:text-text-tertiary
      transition-all duration-100
      focus:outline-none focus:ring-3 focus:ring-primary-500/30 focus:border-primary-500
      disabled:opacity-50 disabled:cursor-not-allowed
    "
    placeholder="Enter your email"
  />
</div>
```

### With Error
```tsx
<div className="space-y-2">
  <label htmlFor="password" className="block text-sm font-medium text-text-primary">
    Password
  </label>
  <input
    id="password"
    type="password"
    aria-invalid="true"
    aria-describedby="password-error"
    className="
      w-full px-3 py-2
      bg-surface-primary
      border-2 border-error-500
      rounded-lg
      text-text-primary
      transition-all duration-100
      focus:outline-none focus:ring-3 focus:ring-error-500/30
    "
  />
  <p id="password-error" className="text-sm text-error-600 flex items-center gap-1">
    <AlertCircleIcon className="w-4 h-4" />
    Password must be at least 8 characters
  </p>
</div>
```

### With Success
```tsx
<div className="space-y-2">
  <label htmlFor="username" className="block text-sm font-medium text-text-primary">
    Username
  </label>
  <div className="relative">
    <input
      id="username"
      type="text"
      className="
        w-full px-3 py-2 pr-10
        bg-surface-primary
        border-2 border-success-500
        rounded-lg
        text-text-primary
        transition-all duration-100
        focus:outline-none focus:ring-3 focus:ring-success-500/30
      "
      value="johndoe"
    />
    <CheckCircleIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-success-500" />
  </div>
  <p className="text-sm text-success-600">Username is available</p>
</div>
```

### With Icon (Leading)
```tsx
<div className="relative">
  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
  <input
    type="search"
    className="
      w-full pl-10 pr-3 py-2
      bg-surface-primary
      border border-border-primary
      rounded-lg
      text-text-primary placeholder:text-text-tertiary
      transition-all duration-100
      focus:outline-none focus:ring-3 focus:ring-primary-500/30 focus:border-primary-500
    "
    placeholder="Search..."
  />
</div>
```

### With Icon (Trailing)
```tsx
<div className="relative">
  <input
    type="password"
    className="
      w-full px-3 py-2 pr-10
      bg-surface-primary
      border border-border-primary
      rounded-lg
      text-text-primary
      transition-all duration-100
      focus:outline-none focus:ring-3 focus:ring-primary-500/30 focus:border-primary-500
    "
    placeholder="Enter password"
  />
  <button
    type="button"
    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary"
    aria-label="Toggle password visibility"
  >
    <EyeIcon className="w-5 h-5" />
  </button>
</div>
```

### Sizes

```tsx
/* Small */
<input className="px-2 py-1 text-sm rounded-md" />

/* Default */
<input className="px-3 py-2 text-base rounded-lg" />

/* Large */
<input className="px-4 py-3 text-lg rounded-xl" />
```

## Textarea

```tsx
<div className="space-y-2">
  <label htmlFor="message" className="block text-sm font-medium text-text-primary">
    Message
  </label>
  <textarea
    id="message"
    rows={4}
    className="
      w-full px-3 py-2
      bg-surface-primary
      border border-border-primary
      rounded-lg
      text-text-primary placeholder:text-text-tertiary
      resize-y
      transition-all duration-100
      focus:outline-none focus:ring-3 focus:ring-primary-500/30 focus:border-primary-500
      disabled:opacity-50 disabled:cursor-not-allowed
    "
    placeholder="Enter your message"
  />
  <p className="text-xs text-text-tertiary">
    Maximum 500 characters
  </p>
</div>
```

## Select Dropdown

### Native Select
```tsx
<div className="space-y-2">
  <label htmlFor="country" className="block text-sm font-medium text-text-primary">
    Country
  </label>
  <select
    id="country"
    className="
      w-full px-3 py-2
      bg-surface-primary
      border border-border-primary
      rounded-lg
      text-text-primary
      transition-all duration-100
      focus:outline-none focus:ring-3 focus:ring-primary-500/30 focus:border-primary-500
      disabled:opacity-50 disabled:cursor-not-allowed
      appearance-none
      bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3E%3Cpath stroke=%27%236b7280%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27m6 8 4 4 4-4%27/%3E%3C/svg%3E')]
      bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat
      pr-10
    "
  >
    <option value="">Select country</option>
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
    <option value="ca">Canada</option>
  </select>
</div>
```

### Custom Select (Headless UI example)
```tsx
import { Listbox, Transition } from '@headlessui/react';

function CustomSelect() {
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary">
        Category
      </label>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="
            relative w-full px-3 py-2 pr-10
            bg-surface-primary
            border border-border-primary
            rounded-lg
            text-left text-text-primary
            transition-all duration-100
            hover:border-border-secondary
            focus:outline-none focus:ring-3 focus:ring-primary-500/30 focus:border-primary-500
          ">
            <span className="block truncate">{selected.name}</span>
            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
          </Listbox.Button>

          <Transition
            enter="transition ease-out duration-100"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Listbox.Options className="
              absolute z-10 mt-2 w-full
              bg-surface-primary
              border border-border-primary
              rounded-lg shadow-lg
              max-h-60 overflow-auto
              py-1
            ">
              {options.map((option) => (
                <Listbox.Option
                  key={option.id}
                  value={option}
                  className={({ active }) => `
                    relative px-3 py-2 cursor-pointer
                    ${active ? 'bg-primary-50 text-primary-700' : 'text-text-primary'}
                  `}
                >
                  {({ selected }) => (
                    <div className="flex items-center justify-between">
                      <span className={selected ? 'font-medium' : 'font-normal'}>
                        {option.name}
                      </span>
                      {selected && (
                        <CheckIcon className="w-5 h-5 text-primary-500" />
                      )}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
```

## Checkbox

```tsx
<div className="flex items-start gap-3">
  <input
    id="terms"
    type="checkbox"
    className="
      w-5 h-5 mt-0.5
      bg-surface-primary
      border-2 border-border-primary
      rounded
      text-primary-500
      transition-colors duration-100
      focus:outline-none focus:ring-3 focus:ring-primary-500/30 focus:ring-offset-0
      disabled:opacity-50 disabled:cursor-not-allowed
    "
  />
  <div className="flex-1">
    <label htmlFor="terms" className="block text-sm font-medium text-text-primary cursor-pointer">
      Accept terms and conditions
    </label>
    <p className="text-xs text-text-tertiary mt-1">
      By checking this box, you agree to our Terms of Service and Privacy Policy.
    </p>
  </div>
</div>
```

### Checkbox Group
```tsx
<fieldset className="space-y-3">
  <legend className="text-sm font-medium text-text-primary mb-3">
    Select preferences
  </legend>

  <div className="flex items-center gap-3">
    <input
      id="email-updates"
      type="checkbox"
      className="w-5 h-5 rounded border-2 border-border-primary text-primary-500"
    />
    <label htmlFor="email-updates" className="text-sm text-text-primary cursor-pointer">
      Email updates
    </label>
  </div>

  <div className="flex items-center gap-3">
    <input
      id="sms-updates"
      type="checkbox"
      className="w-5 h-5 rounded border-2 border-border-primary text-primary-500"
    />
    <label htmlFor="sms-updates" className="text-sm text-text-primary cursor-pointer">
      SMS notifications
    </label>
  </div>
</fieldset>
```

## Radio Button

```tsx
<fieldset className="space-y-3">
  <legend className="text-sm font-medium text-text-primary mb-3">
    Select plan
  </legend>

  <div className="flex items-start gap-3">
    <input
      id="plan-free"
      type="radio"
      name="plan"
      className="
        w-5 h-5 mt-0.5
        bg-surface-primary
        border-2 border-border-primary
        text-primary-500
        transition-colors duration-100
        focus:outline-none focus:ring-3 focus:ring-primary-500/30 focus:ring-offset-0
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    />
    <div className="flex-1">
      <label htmlFor="plan-free" className="block text-sm font-medium text-text-primary cursor-pointer">
        Free Plan
      </label>
      <p className="text-xs text-text-tertiary mt-1">
        Basic features for personal use
      </p>
    </div>
  </div>

  <div className="flex items-start gap-3">
    <input
      id="plan-pro"
      type="radio"
      name="plan"
      className="w-5 h-5 mt-0.5 border-2 border-border-primary text-primary-500"
    />
    <div className="flex-1">
      <label htmlFor="plan-pro" className="block text-sm font-medium text-text-primary cursor-pointer">
        Pro Plan
      </label>
      <p className="text-xs text-text-tertiary mt-1">
        Advanced features for professionals
      </p>
    </div>
  </div>
</fieldset>
```

## Toggle Switch

```tsx
import { Switch } from '@headlessui/react';

function ToggleSwitch() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-text-primary">
          Enable notifications
        </p>
        <p className="text-xs text-text-tertiary mt-1">
          Receive push notifications for updates
        </p>
      </div>

      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          transition-colors duration-200 ease-in-out
          focus:outline-none focus:ring-3 focus:ring-primary-500/30 focus:ring-offset-2
          ${enabled ? 'bg-primary-500' : 'bg-neutral-300'}
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white
            transition-transform duration-200 ease-in-out
            ${enabled ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </Switch>
    </div>
  );
}
```

## Slider

```tsx
<div className="space-y-2">
  <label htmlFor="volume" className="flex items-center justify-between text-sm font-medium text-text-primary">
    <span>Volume</span>
    <span className="text-text-secondary">75%</span>
  </label>
  <input
    id="volume"
    type="range"
    min="0"
    max="100"
    defaultValue="75"
    className="
      w-full h-2
      bg-neutral-200
      rounded-full
      appearance-none cursor-pointer
      [&::-webkit-slider-thumb]:appearance-none
      [&::-webkit-slider-thumb]:w-5
      [&::-webkit-slider-thumb]:h-5
      [&::-webkit-slider-thumb]:rounded-full
      [&::-webkit-slider-thumb]:bg-primary-500
      [&::-webkit-slider-thumb]:shadow-sm
      [&::-webkit-slider-thumb]:cursor-pointer
      [&::-webkit-slider-thumb]:transition-transform
      [&::-webkit-slider-thumb:hover]:scale-110
      [&::-moz-range-thumb]:w-5
      [&::-moz-range-thumb]:h-5
      [&::-moz-range-thumb]:rounded-full
      [&::-moz-range-thumb]:bg-primary-500
      [&::-moz-range-thumb]:border-0
      [&::-moz-range-thumb]:shadow-sm
      [&::-moz-range-thumb]:cursor-pointer
      [&::-moz-range-thumb:hover]:scale-110
      focus:outline-none focus:ring-3 focus:ring-primary-500/30
    "
  />
</div>
```

## React Component Library

```tsx
import { forwardRef, InputHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  `
    w-full px-3 py-2
    bg-surface-primary
    border rounded-lg
    text-text-primary placeholder:text-text-tertiary
    transition-all duration-100
    focus:outline-none focus:ring-3 focus:ring-offset-0
    disabled:opacity-50 disabled:cursor-not-allowed
  `,
  {
    variants: {
      variant: {
        default: `
          border-border-primary
          focus:border-primary-500 focus:ring-primary-500/30
        `,
        error: `
          border-error-500 border-2
          focus:border-error-500 focus:ring-error-500/30
        `,
        success: `
          border-success-500 border-2
          focus:border-success-500 focus:ring-success-500/30
        `,
      },
      size: {
        sm: 'px-2 py-1 text-sm rounded-md',
        md: 'px-3 py-2 text-base rounded-lg',
        lg: 'px-4 py-3 text-lg rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, label, helperText, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const hasError = !!error;

    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-text-primary">
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          className={inputVariants({
            variant: hasError ? 'error' : variant,
            size,
            className,
          })}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />

        {error && (
          <p id={`${inputId}-error`} className="text-sm text-error-600 flex items-center gap-1">
            <AlertCircleIcon className="w-4 h-4" />
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={`${inputId}-helper`} className="text-xs text-text-tertiary">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Usage
import { Input } from '@/components/ui/input';

<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  helperText="We'll never share your email"
/>

<Input
  label="Password"
  type="password"
  error="Password must be at least 8 characters"
/>
```

## Accessibility

### Requirements
- **Labels**: Every input must have an associated `<label>` or `aria-label`
- **Error messages**: Link with `aria-describedby` and `aria-invalid`
- **Placeholder**: Never use as sole label (insufficient contrast, disappears)
- **Required fields**: Use `required` attribute and visual indicator
- **Focus indicators**: Clear, visible focus rings
- **Autocomplete**: Use appropriate `autocomplete` attributes
- **Touch targets**: Minimum 44x44px for mobile

### Example: Accessible Form
```tsx
<form className="space-y-6">
  <Input
    label="Email Address"
    type="email"
    autoComplete="email"
    required
    placeholder="you@example.com"
  />

  <Input
    label="Password"
    type="password"
    autoComplete="current-password"
    required
    helperText="Must be at least 8 characters"
  />

  <Button type="submit">Sign In</Button>
</form>
```

## Best Practices

1. **Label all inputs**: Never rely on placeholder alone
2. **Show errors inline**: Display validation messages below field
3. **Validate on blur**: Don't show errors while typing
4. **Clear error messages**: "Email is required" not "Invalid input"
5. **Progressive disclosure**: Show password requirements on focus
6. **Autofocus**: Only on primary action (e.g., search page)
7. **Autocomplete**: Enable browser autofill
8. **Group related fields**: Use `<fieldset>` and `<legend>`
9. **Required indicators**: Mark with asterisk and state in label
10. **Success feedback**: Show confirmation for valid input
