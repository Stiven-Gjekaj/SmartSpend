# Modals & Dialogs

## Overview

Modals interrupt the user's workflow to display critical information or require a decision. Use sparingly and only when user attention is absolutely necessary.

## Basic Modal

```tsx
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

function BasicModal({ open, onClose }) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal container */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="
                w-full max-w-md
                bg-surface-primary
                rounded-2xl
                shadow-xl
                p-6
                transform transition-all
              ">
                <Dialog.Title className="text-2xl font-semibold text-text-primary mb-4">
                  Modal Title
                </Dialog.Title>

                <Dialog.Description className="text-text-secondary mb-6">
                  This is the modal content. It can contain any elements you need.
                </Dialog.Description>

                <div className="flex gap-3 justify-end">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-neutral-200 text-text-primary rounded-lg hover:bg-neutral-300"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                    Confirm
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
```

## Confirmation Dialog

```tsx
function ConfirmationDialog({ open, onClose, onConfirm, title, message, variant = 'default' }) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="
          w-full max-w-sm
          bg-surface-primary
          rounded-2xl
          shadow-xl
          p-6
        ">
          {/* Icon */}
          <div className={`
            w-12 h-12 rounded-full flex items-center justify-center mb-4
            ${variant === 'danger' ? 'bg-error-100' : 'bg-primary-100'}
          `}>
            {variant === 'danger' ? (
              <AlertTriangleIcon className="w-6 h-6 text-error-600" />
            ) : (
              <InfoIcon className="w-6 h-6 text-primary-600" />
            )}
          </div>

          <Dialog.Title className="text-xl font-semibold text-text-primary mb-2">
            {title}
          </Dialog.Title>

          <Dialog.Description className="text-text-secondary mb-6">
            {message}
          </Dialog.Description>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-neutral-200 text-text-primary rounded-lg hover:bg-neutral-300"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`
                flex-1 px-4 py-2 rounded-lg font-medium
                ${variant === 'danger'
                  ? 'bg-error-500 hover:bg-error-600 text-white'
                  : 'bg-primary-500 hover:bg-primary-600 text-white'
                }
              `}
            >
              Confirm
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

// Usage
<ConfirmationDialog
  open={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={handleDelete}
  title="Delete Account"
  message="Are you sure you want to delete your account? This action cannot be undone."
  variant="danger"
/>
```

## Form Modal

```tsx
function FormModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="
            w-full max-w-lg
            bg-surface-primary
            rounded-2xl
            shadow-xl
          ">
            {/* Header */}
            <div className="px-6 py-4 border-b border-border-primary flex items-center justify-between">
              <Dialog.Title className="text-xl font-semibold text-text-primary">
                Create New Project
              </Dialog.Title>
              <button
                onClick={onClose}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                aria-label="Close"
              >
                <XIcon className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            {/* Body */}
            <form className="p-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="project-name" className="block text-sm font-medium text-text-primary">
                  Project Name
                </label>
                <input
                  id="project-name"
                  type="text"
                  className="w-full px-3 py-2 border border-border-primary rounded-lg"
                  placeholder="Enter project name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-text-primary">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  className="w-full px-3 py-2 border border-border-primary rounded-lg resize-none"
                  placeholder="Enter project description"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-medium text-text-primary">
                  Category
                </label>
                <select
                  id="category"
                  className="w-full px-3 py-2 border border-border-primary rounded-lg"
                >
                  <option>Design</option>
                  <option>Development</option>
                  <option>Marketing</option>
                </select>
              </div>
            </form>

            {/* Footer */}
            <div className="px-6 py-4 bg-neutral-50 border-t border-border-primary flex gap-3 justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-text-secondary hover:text-text-primary"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                Create Project
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
```

## Full Screen Modal

```tsx
function FullScreenModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-bg-primary">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-border-primary flex items-center justify-between">
            <Dialog.Title className="text-xl font-semibold text-text-primary">
              Full Screen Modal
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 rounded-lg"
              aria-label="Close"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">
            <p className="text-text-secondary">
              Full screen modal content...
            </p>
          </div>

          {/* Footer (Optional) */}
          <div className="px-6 py-4 border-t border-border-primary">
            <button className="w-full px-4 py-3 bg-primary-500 text-white rounded-lg">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
```

## Bottom Sheet (Mobile)

```tsx
function BottomSheet({ open, onClose, children }) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        {/* Bottom sheet */}
        <div className="fixed inset-0 flex items-end">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-full"
          >
            <Dialog.Panel className="
              w-full
              bg-surface-primary
              rounded-t-3xl
              shadow-2xl
              max-h-[90vh]
              overflow-y-auto
            ">
              {/* Handle */}
              <div className="flex justify-center pt-4 pb-2">
                <div className="w-12 h-1.5 bg-neutral-300 rounded-full" />
              </div>

              {/* Content */}
              <div className="px-6 pb-6">
                {children}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

// Usage
<BottomSheet open={isOpen} onClose={() => setIsOpen(false)}>
  <h3 className="text-xl font-semibold text-text-primary mb-4">
    Options
  </h3>
  <ul className="space-y-2">
    <li>
      <button className="w-full text-left px-4 py-3 hover:bg-neutral-100 rounded-lg">
        Option 1
      </button>
    </li>
    <li>
      <button className="w-full text-left px-4 py-3 hover:bg-neutral-100 rounded-lg">
        Option 2
      </button>
    </li>
  </ul>
</BottomSheet>
```

## Sizes

```tsx
// Small (max-w-sm = 384px)
<Dialog.Panel className="w-full max-w-sm ...">

// Medium (max-w-md = 448px)
<Dialog.Panel className="w-full max-w-md ...">

// Large (max-w-lg = 512px)
<Dialog.Panel className="w-full max-w-lg ...">

// Extra Large (max-w-xl = 576px)
<Dialog.Panel className="w-full max-w-xl ...">

// 2XL (max-w-2xl = 672px)
<Dialog.Panel className="w-full max-w-2xl ...">
```

## Scrollable Content

```tsx
<Dialog.Panel className="w-full max-w-lg bg-surface-primary rounded-2xl shadow-xl">
  {/* Fixed header */}
  <div className="px-6 py-4 border-b border-border-primary">
    <Dialog.Title className="text-xl font-semibold">
      Long Content Modal
    </Dialog.Title>
  </div>

  {/* Scrollable body */}
  <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
    <Dialog.Description className="text-text-secondary">
      {/* Long content here */}
    </Dialog.Description>
  </div>

  {/* Fixed footer */}
  <div className="px-6 py-4 border-t border-border-primary flex gap-3 justify-end">
    <button>Cancel</button>
    <button>Confirm</button>
  </div>
</Dialog.Panel>
```

## React Component

```tsx
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  showCloseButton?: boolean;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showCloseButton = true,
}: ModalProps) {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full mx-4',
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal container */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`
                  w-full ${sizeClasses[size]}
                  bg-surface-primary
                  rounded-2xl
                  shadow-xl
                  transform transition-all
                `}
              >
                {/* Header */}
                {(title || showCloseButton) && (
                  <div className="px-6 py-4 border-b border-border-primary flex items-center justify-between">
                    {title && (
                      <Dialog.Title className="text-xl font-semibold text-text-primary">
                        {title}
                      </Dialog.Title>
                    )}
                    {showCloseButton && (
                      <button
                        onClick={onClose}
                        className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                        aria-label="Close"
                      >
                        <XIcon className="w-5 h-5 text-text-secondary" />
                      </button>
                    )}
                  </div>
                )}

                {/* Body */}
                <div className="p-6">
                  {description && (
                    <Dialog.Description className="text-text-secondary mb-4">
                      {description}
                    </Dialog.Description>
                  )}
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

// Usage
import { Modal } from '@/components/ui/modal';

<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Edit Profile"
  size="lg"
>
  <form className="space-y-4">
    {/* Form fields */}
  </form>
</Modal>
```

## Accessibility

### Requirements
- **Focus trap**: Focus stays within modal while open
- **Escape key**: Closes modal (handled by Headless UI)
- **Backdrop click**: Closes modal by default
- **Focus return**: Returns to trigger element on close
- **Aria labels**: Use `Dialog.Title` and `Dialog.Description`
- **Keyboard navigation**: Tab through interactive elements

### Best Practices
```tsx
// Always provide title
<Dialog.Title>Modal Title</Dialog.Title>

// Provide description for context
<Dialog.Description>
  Additional context about this modal
</Dialog.Description>

// Handle Escape key
<Dialog onClose={onClose}> // onClose called on Escape

// Disable backdrop close for critical modals
<Dialog onClose={() => {}} static>
```

## Common Patterns

### Alert Dialog
```tsx
<ConfirmationDialog
  variant="danger"
  title="Delete Item"
  message="This action cannot be undone."
/>
```

### Multi-step Form
```tsx
const [step, setStep] = useState(1);

<Modal open={open} onClose={onClose} title={`Step ${step} of 3`}>
  {step === 1 && <Step1 />}
  {step === 2 && <Step2 />}
  {step === 3 && <Step3 />}

  <div className="flex justify-between mt-6">
    <button onClick={() => setStep(step - 1)} disabled={step === 1}>
      Previous
    </button>
    <button onClick={() => setStep(step + 1)} disabled={step === 3}>
      Next
    </button>
  </div>
</Modal>
```

## Best Practices

1. **Use sparingly**: Modals interrupt the user flow
2. **Clear purpose**: User should understand why modal opened
3. **Easy to close**: Multiple ways to dismiss (X, Cancel, Escape, backdrop)
4. **Mobile-first**: Use bottom sheets on mobile
5. **Loading states**: Show spinner during async operations
6. **Validation**: Validate before allowing submit
7. **Scrollable**: Long content should scroll within modal
8. **Focus management**: Auto-focus first input
9. **Prevent data loss**: Warn if unsaved changes
10. **Confirmation**: Always confirm destructive actions
