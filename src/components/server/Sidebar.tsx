export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 p-6 flex flex-col gap-6">
      <div className="flex items-center gap-3 px-2 mb-4">
        <span className="text-2xl">⚡</span>
        <span className="text-lg font-bold text-gray-900">WebComp App</span>
      </div>

      <nav className="flex flex-col gap-1">
        <app-nav-link href="/" icon="🏠">
          Home
        </app-nav-link>
        <app-nav-link href="/dashboard" icon="📊">
          Dashboard
        </app-nav-link>
        <app-nav-link href="/products" icon="🛍️">
          Products
        </app-nav-link>
        <app-nav-link href="/about" icon="ℹ️">
          About
        </app-nav-link>
        <app-nav-link href="/contact" icon="✉️">
          Contact
        </app-nav-link>
        <app-nav-link href="/settings" icon="⚙️">
          Settings
        </app-nav-link>
        <app-nav-link href="/scenarios" icon="🔬">
          Scenarios
        </app-nav-link>
      </nav>

      <div className="mt-auto">
        <app-card variant="primary">
          <div className="text-sm">
            <p className="font-semibold text-blue-900 mb-1">Web Components</p>
            <p className="text-blue-700 text-xs">
              This sidebar uses <code>&lt;app-nav-link&gt;</code> and{" "}
              <code>&lt;app-card&gt;</code> — web components rendered by a Server Component.
            </p>
          </div>
        </app-card>
      </div>
    </aside>
  );
}
