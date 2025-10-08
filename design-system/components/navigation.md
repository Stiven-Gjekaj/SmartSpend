# Navigation Components

## Navbar

### Desktop Navbar
```tsx
<nav className="border-b border-border-primary bg-surface-primary sticky top-0 z-40 backdrop-blur-sm">
  <div className="max-w-7xl mx-auto px-6">
    <div className="flex items-center justify-between h-16">
      {/* Logo */}
      <div className="flex items-center gap-8">
        <a href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="SmartSpend" className="h-8 w-8" />
          <span className="text-xl font-bold text-text-primary">SmartSpend</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          <a
            href="/dashboard"
            className="px-3 py-2 text-sm font-medium text-text-primary hover:bg-neutral-100 rounded-lg transition-colors"
          >
            Dashboard
          </a>
          <a
            href="/expenses"
            className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-neutral-100 rounded-lg transition-colors"
          >
            Expenses
          </a>
          <a
            href="/reports"
            className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-neutral-100 rounded-lg transition-colors"
          >
            Reports
          </a>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <button
          className="p-2 text-text-secondary hover:text-text-primary hover:bg-neutral-100 rounded-lg transition-colors"
          aria-label="Notifications"
        >
          <BellIcon className="w-5 h-5" />
        </button>

        {/* User menu */}
        <button className="flex items-center gap-2 p-2 hover:bg-neutral-100 rounded-lg transition-colors">
          <img
            src="/avatar.jpg"
            alt="User"
            className="w-8 h-8 rounded-full"
          />
        </button>
      </div>
    </div>
  </div>
</nav>
```

### Mobile Navbar with Menu
```tsx
import { Disclosure, Transition } from '@headlessui/react';

function MobileNav() {
  return (
    <Disclosure as="nav" className="border-b border-border-primary bg-surface-primary sticky top-0 z-40">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <a href="/" className="flex items-center gap-2">
                <img src="/logo.svg" alt="SmartSpend" className="h-8 w-8" />
                <span className="text-xl font-bold text-text-primary">SmartSpend</span>
              </a>

              {/* Mobile menu button */}
              <Disclosure.Button className="p-2 text-text-secondary hover:text-text-primary hover:bg-neutral-100 rounded-lg md:hidden">
                {open ? (
                  <XIcon className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              </Disclosure.Button>
            </div>
          </div>

          {/* Mobile menu */}
          <Transition
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Disclosure.Panel className="md:hidden border-t border-border-primary">
              <div className="px-4 py-3 space-y-1">
                <a
                  href="/dashboard"
                  className="block px-3 py-2 text-base font-medium text-text-primary bg-primary-50 rounded-lg"
                >
                  Dashboard
                </a>
                <a
                  href="/expenses"
                  className="block px-3 py-2 text-base font-medium text-text-secondary hover:text-text-primary hover:bg-neutral-100 rounded-lg"
                >
                  Expenses
                </a>
                <a
                  href="/reports"
                  className="block px-3 py-2 text-base font-medium text-text-secondary hover:text-text-primary hover:bg-neutral-100 rounded-lg"
                >
                  Reports
                </a>
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
```

## Sidebar

### Desktop Sidebar
```tsx
<aside className="hidden md:flex flex-col w-64 border-r border-border-primary bg-surface-primary h-screen sticky top-0">
  {/* Logo */}
  <div className="flex items-center gap-2 px-6 py-4 border-b border-border-primary">
    <img src="/logo.svg" alt="SmartSpend" className="h-8 w-8" />
    <span className="text-xl font-bold text-text-primary">SmartSpend</span>
  </div>

  {/* Navigation */}
  <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
    <a
      href="/dashboard"
      className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg"
    >
      <HomeIcon className="w-5 h-5" />
      <span>Dashboard</span>
    </a>

    <a
      href="/expenses"
      className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-neutral-100 rounded-lg transition-colors"
    >
      <CreditCardIcon className="w-5 h-5" />
      <span>Expenses</span>
    </a>

    <a
      href="/reports"
      className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-neutral-100 rounded-lg transition-colors"
    >
      <ChartBarIcon className="w-5 h-5" />
      <span>Reports</span>
    </a>

    <a
      href="/settings"
      className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-neutral-100 rounded-lg transition-colors"
    >
      <SettingsIcon className="w-5 h-5" />
      <span>Settings</span>
    </a>
  </nav>

  {/* User section */}
  <div className="p-4 border-t border-border-primary">
    <button className="flex items-center gap-3 w-full p-3 hover:bg-neutral-100 rounded-lg transition-colors">
      <img
        src="/avatar.jpg"
        alt="John Doe"
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1 text-left">
        <p className="text-sm font-medium text-text-primary">John Doe</p>
        <p className="text-xs text-text-tertiary">john@example.com</p>
      </div>
      <ChevronUpDownIcon className="w-5 h-5 text-text-tertiary" />
    </button>
  </div>
</aside>
```

### Collapsible Sidebar
```tsx
function CollapsibleSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`
      hidden md:flex flex-col
      border-r border-border-primary bg-surface-primary
      h-screen sticky top-0
      transition-all duration-200
      ${collapsed ? 'w-20' : 'w-64'}
    `}>
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-border-primary">
        <img src="/logo.svg" alt="SmartSpend" className="h-8 w-8 flex-shrink-0" />
        {!collapsed && (
          <span className="text-xl font-bold text-text-primary">SmartSpend</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <a
          href="/dashboard"
          className={`
            flex items-center gap-3 px-3 py-2
            text-sm font-medium text-white bg-primary-500 rounded-lg
            ${collapsed ? 'justify-center' : ''}
          `}
          title={collapsed ? 'Dashboard' : undefined}
        >
          <HomeIcon className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Dashboard</span>}
        </a>

        {/* More nav items... */}
      </nav>

      {/* Toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-4 border-t border-border-primary hover:bg-neutral-100 transition-colors"
      >
        <ChevronLeftIcon className={`w-5 h-5 mx-auto transition-transform ${collapsed ? 'rotate-180' : ''}`} />
      </button>
    </aside>
  );
}
```

## Breadcrumbs

```tsx
<nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
  <a href="/" className="text-text-secondary hover:text-text-primary transition-colors">
    Home
  </a>
  <ChevronRightIcon className="w-4 h-4 text-text-tertiary" />

  <a href="/expenses" className="text-text-secondary hover:text-text-primary transition-colors">
    Expenses
  </a>
  <ChevronRightIcon className="w-4 h-4 text-text-tertiary" />

  <span className="text-text-primary font-medium">
    January 2024
  </span>
</nav>
```

## Tabs

### Horizontal Tabs
```tsx
import { Tab } from '@headlessui/react';

function Tabs() {
  return (
    <Tab.Group>
      <Tab.List className="flex gap-1 border-b border-border-primary">
        <Tab className={({ selected }) => `
          px-4 py-2 text-sm font-medium
          border-b-2 -mb-px
          transition-colors
          focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:ring-offset-2
          ${selected
            ? 'border-primary-500 text-primary-600'
            : 'border-transparent text-text-secondary hover:text-text-primary hover:border-neutral-300'
          }
        `}>
          Overview
        </Tab>

        <Tab className={({ selected }) => `
          px-4 py-2 text-sm font-medium
          border-b-2 -mb-px
          transition-colors
          ${selected
            ? 'border-primary-500 text-primary-600'
            : 'border-transparent text-text-secondary hover:text-text-primary'
          }
        `}>
          Analytics
        </Tab>

        <Tab className={({ selected }) => `
          px-4 py-2 text-sm font-medium
          border-b-2 -mb-px
          transition-colors
          ${selected
            ? 'border-primary-500 text-primary-600'
            : 'border-transparent text-text-secondary hover:text-text-primary'
          }
        `}>
          Settings
        </Tab>
      </Tab.List>

      <Tab.Panels className="mt-6">
        <Tab.Panel>Overview content</Tab.Panel>
        <Tab.Panel>Analytics content</Tab.Panel>
        <Tab.Panel>Settings content</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
```

### Pill Tabs
```tsx
<Tab.List className="inline-flex gap-1 bg-neutral-100 p-1 rounded-lg">
  <Tab className={({ selected }) => `
    px-4 py-2 text-sm font-medium rounded-md
    transition-all
    ${selected
      ? 'bg-white text-text-primary shadow-sm'
      : 'text-text-secondary hover:text-text-primary'
    }
  `}>
    Monthly
  </Tab>

  <Tab className={({ selected }) => `
    px-4 py-2 text-sm font-medium rounded-md
    transition-all
    ${selected
      ? 'bg-white text-text-primary shadow-sm'
      : 'text-text-secondary hover:text-text-primary'
    }
  `}>
    Yearly
  </Tab>
</Tab.List>
```

## Pagination

```tsx
function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <nav className="flex items-center justify-between border-t border-border-primary pt-4">
      {/* Mobile */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-border-primary rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-border-primary rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* Desktop */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <p className="text-sm text-text-secondary">
          Showing page <span className="font-medium">{currentPage}</span> of{' '}
          <span className="font-medium">{totalPages}</span>
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 border border-border-primary rounded-lg text-text-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>

          {/* Page numbers */}
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium
                    transition-colors
                    ${page === currentPage
                      ? 'bg-primary-500 text-white'
                      : 'text-text-secondary hover:text-text-primary hover:bg-neutral-100'
                    }
                  `}
                >
                  {page}
                </button>
              );
            } else if (page === currentPage - 2 || page === currentPage + 2) {
              return <span key={page} className="px-2 text-text-tertiary">...</span>;
            }
            return null;
          })}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 border border-border-primary rounded-lg text-text-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
```

## Footer

```tsx
<footer className="border-t border-border-primary bg-surface-primary mt-auto">
  <div className="max-w-7xl mx-auto px-6 py-12">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Company */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <img src="/logo.svg" alt="SmartSpend" className="h-8 w-8" />
          <span className="text-xl font-bold text-text-primary">SmartSpend</span>
        </div>
        <p className="text-sm text-text-secondary">
          Track your expenses, gain insights, achieve financial freedom.
        </p>
      </div>

      {/* Product */}
      <div>
        <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
          Product
        </h4>
        <ul className="space-y-3">
          <li>
            <a href="/features" className="text-sm text-text-secondary hover:text-text-primary">
              Features
            </a>
          </li>
          <li>
            <a href="/pricing" className="text-sm text-text-secondary hover:text-text-primary">
              Pricing
            </a>
          </li>
          <li>
            <a href="/integrations" className="text-sm text-text-secondary hover:text-text-primary">
              Integrations
            </a>
          </li>
        </ul>
      </div>

      {/* Company */}
      <div>
        <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
          Company
        </h4>
        <ul className="space-y-3">
          <li>
            <a href="/about" className="text-sm text-text-secondary hover:text-text-primary">
              About
            </a>
          </li>
          <li>
            <a href="/blog" className="text-sm text-text-secondary hover:text-text-primary">
              Blog
            </a>
          </li>
          <li>
            <a href="/careers" className="text-sm text-text-secondary hover:text-text-primary">
              Careers
            </a>
          </li>
        </ul>
      </div>

      {/* Legal */}
      <div>
        <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
          Legal
        </h4>
        <ul className="space-y-3">
          <li>
            <a href="/privacy" className="text-sm text-text-secondary hover:text-text-primary">
              Privacy
            </a>
          </li>
          <li>
            <a href="/terms" className="text-sm text-text-secondary hover:text-text-primary">
              Terms
            </a>
          </li>
          <li>
            <a href="/security" className="text-sm text-text-secondary hover:text-text-primary">
              Security
            </a>
          </li>
        </ul>
      </div>
    </div>

    {/* Bottom */}
    <div className="mt-12 pt-8 border-t border-border-primary flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-sm text-text-tertiary">
        © 2024 SmartSpend. All rights reserved.
      </p>

      <div className="flex gap-6">
        <a href="https://twitter.com" className="text-text-tertiary hover:text-text-primary" aria-label="Twitter">
          <TwitterIcon className="w-5 h-5" />
        </a>
        <a href="https://github.com" className="text-text-tertiary hover:text-text-primary" aria-label="GitHub">
          <GitHubIcon className="w-5 h-5" />
        </a>
        <a href="https://linkedin.com" className="text-text-tertiary hover:text-text-primary" aria-label="LinkedIn">
          <LinkedInIcon className="w-5 h-5" />
        </a>
      </div>
    </div>
  </div>
</footer>
```

## Accessibility

- **Keyboard navigation**: All links/buttons are keyboard accessible
- **ARIA labels**: Use `aria-label` for icon-only buttons
- **Skip links**: Add skip-to-content link for screen readers
- **Active state**: Clearly indicate current page/section
- **Focus indicators**: Visible focus rings on all interactive elements
- **Semantic HTML**: Use `<nav>`, `<a>`, `<button>` appropriately

## Best Practices

1. **Consistent placement**: Navigation should be predictable
2. **Highlight active page**: Users should know where they are
3. **Mobile-first**: Ensure navigation works on small screens
4. **Limit items**: 5-7 main navigation items maximum
5. **Descriptive labels**: Clear, concise link text
6. **Responsive**: Adapt to different screen sizes
7. **Sticky headers**: Keep important navigation visible
8. **Breadcrumbs**: Show hierarchy on deep pages
9. **Footer sitemap**: Include all important links
10. **Search**: Add search for content-heavy sites
