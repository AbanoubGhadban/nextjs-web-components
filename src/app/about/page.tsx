import { getTeamMembers } from "@/lib/data";

export default function AboutPage() {
  const team = getTeamMembers();

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">About</h1>
        <p className="text-gray-600 text-lg">
          Learn about this demo project and the technology behind it.
        </p>
      </div>

      <app-alert variant="success" title="100% Server Component">
        This entire page is a Server Component. Every web component here is
        rendered as HTML on the server and upgraded on the client.
      </app-alert>

      {/* Architecture cards */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Architecture
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <app-card variant="primary" hoverable>
            <div slot="header">
              <h3 className="text-lg font-semibold text-blue-900">
                Server Components
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-center gap-2">
                <app-badge variant="primary" size="sm">✓</app-badge>
                Render web component tags as HTML
              </li>
              <li className="flex items-center gap-2">
                <app-badge variant="primary" size="sm">✓</app-badge>
                Zero client-side JavaScript
              </li>
              <li className="flex items-center gap-2">
                <app-badge variant="primary" size="sm">✓</app-badge>
                SEO-friendly content
              </li>
              <li className="flex items-center gap-2">
                <app-badge variant="primary" size="sm">✓</app-badge>
                Direct database/API access
              </li>
            </ul>
          </app-card>

          <app-card variant="success" hoverable>
            <div slot="header">
              <h3 className="text-lg font-semibold text-green-900">
                Client Components
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-green-800">
              <li className="flex items-center gap-2">
                <app-badge variant="success" size="sm">✓</app-badge>
                Full interactivity via React state
              </li>
              <li className="flex items-center gap-2">
                <app-badge variant="success" size="sm">✓</app-badge>
                Custom element refs and methods
              </li>
              <li className="flex items-center gap-2">
                <app-badge variant="success" size="sm">✓</app-badge>
                Event handling with custom events
              </li>
              <li className="flex items-center gap-2">
                <app-badge variant="success" size="sm">✓</app-badge>
                Dynamic attribute updates
              </li>
            </ul>
          </app-card>

          <app-card variant="warning" hoverable>
            <div slot="header">
              <h3 className="text-lg font-semibold text-amber-900">
                Web Components
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-amber-800">
              <li className="flex items-center gap-2">
                <app-badge variant="warning" size="sm">✓</app-badge>
                Shadow DOM encapsulation
              </li>
              <li className="flex items-center gap-2">
                <app-badge variant="warning" size="sm">✓</app-badge>
                Slot-based composition
              </li>
              <li className="flex items-center gap-2">
                <app-badge variant="warning" size="sm">✓</app-badge>
                Framework-agnostic
              </li>
              <li className="flex items-center gap-2">
                <app-badge variant="warning" size="sm">✓</app-badge>
                Browser-native APIs
              </li>
            </ul>
          </app-card>

          <app-card variant="danger" hoverable>
            <div slot="header">
              <h3 className="text-lg font-semibold text-red-900">
                Next.js App Router
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-red-800">
              <li className="flex items-center gap-2">
                <app-badge variant="danger" size="sm">✓</app-badge>
                File-system routing
              </li>
              <li className="flex items-center gap-2">
                <app-badge variant="danger" size="sm">✓</app-badge>
                Streaming & Suspense
              </li>
              <li className="flex items-center gap-2">
                <app-badge variant="danger" size="sm">✓</app-badge>
                RSC + Client composition
              </li>
              <li className="flex items-center gap-2">
                <app-badge variant="danger" size="sm">✓</app-badge>
                Dynamic routes with params
              </li>
            </ul>
          </app-card>
        </div>
      </section>

      {/* Tech stack progress */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Tech Coverage
        </h2>
        <app-card>
          <div className="space-y-4">
            <app-progress value="100" label="Web Components" variant="primary" />
            <app-progress value="100" label="Next.js App Router" variant="success" />
            <app-progress value="100" label="Server Components" variant="warning" />
            <app-progress value="100" label="Client Components" variant="danger" />
            <app-progress value="100" label="TypeScript" variant="primary" striped />
          </div>
        </app-card>
      </section>

      {/* Team - Server rendered */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {team.map((member) => (
            <app-card key={member.name} hoverable>
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <app-avatar
                    name={member.name}
                    size="56"
                    status={member.status}
                  />
                </div>
                <p className="font-semibold text-sm text-gray-900">
                  {member.name}
                </p>
                <p className="text-xs text-gray-500">{member.role}</p>
              </div>
            </app-card>
          ))}
        </div>
      </section>

      {/* Web component count */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Components Built
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <app-stat-card title="Web Components" value="16" icon="🧩" />
          <app-stat-card title="Pages" value="7" icon="📄" />
          <app-stat-card title="Server Components" value="8" icon="🖥️" />
          <app-stat-card title="Client Components" value="6" icon="📱" />
        </div>
      </section>
    </div>
  );
}
