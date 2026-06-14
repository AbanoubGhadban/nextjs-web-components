import { getTeamMembers, getActivities } from "@/lib/data";
import InteractiveDemo from "@/components/client/InteractiveDemo";

export default function Home() {
  const team = getTeamMembers();
  const activities = getActivities();

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Web Components in Next.js
        </h1>
        <p className="text-gray-600 text-lg">
          Demonstrating custom web components in both Server and Client
          components.
        </p>
      </div>

      {/* Server Component section with web components */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Server-Rendered Web Components
          </h2>
          <app-badge variant="success">Server Component</app-badge>
        </div>

        <app-alert variant="info" title="Server-Side Rendering">
          These web components are rendered as HTML tags by a Server Component.
          They upgrade to interactive custom elements once JavaScript loads on
          the client.
        </app-alert>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <app-stat-card
            title="Total Revenue"
            value="$48,250"
            change="+12.5%"
            trend="up"
            icon="💰"
          />
          <app-stat-card
            title="Active Users"
            value="2,847"
            change="+8.2%"
            trend="up"
            icon="👥"
          />
          <app-stat-card
            title="Orders"
            value="1,234"
            change="-3.1%"
            trend="down"
            icon="📦"
          />
          <app-stat-card
            title="Conversion"
            value="3.24%"
            change="+0.8%"
            trend="up"
            icon="📈"
          />
        </div>
      </section>

      {/* Server component: Team members */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Team Members
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {team.map((member) => (
            <app-card key={member.name} hoverable>
              <div className="flex items-center gap-4">
                <app-avatar
                  name={member.name}
                  size="48"
                  status={member.status}
                />
                <div>
                  <p className="font-semibold text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.role}</p>
                  <app-badge
                    variant={
                      member.status === "online"
                        ? "success"
                        : member.status === "busy"
                          ? "danger"
                          : member.status === "away"
                            ? "warning"
                            : "default"
                    }
                    size="sm"
                  >
                    {member.status}
                  </app-badge>
                </div>
              </div>
            </app-card>
          ))}
        </div>
      </section>

      {/* Server component: Recent activity */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <app-card>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 py-2 border-b border-gray-100 last:border-0"
              >
                <app-avatar name={activity.user} size="36" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-semibold">{activity.user}</span>{" "}
                    {activity.action}{" "}
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </app-card>
      </section>

      {/* Client Component section */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Interactive Web Components
          </h2>
          <app-badge variant="primary">Client Component</app-badge>
        </div>
        <InteractiveDemo />
      </section>
    </div>
  );
}
