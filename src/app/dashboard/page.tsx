import { getDashboardStats, getChartData, getActivities } from "@/lib/data";
import DashboardWidgets from "@/components/client/DashboardWidgets";

export default function DashboardPage() {
  const stats = getDashboardStats();
  const chartData = getChartData();
  const activities = getActivities();

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Server-fetched data displayed through web components, with
          interactive client widgets.
        </p>
      </div>

      {/* Stats - Server Component using web components */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Key Metrics</h2>
          <app-badge variant="success">Server Data</app-badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <app-stat-card
            title="Revenue"
            value={stats.revenue.value}
            change={stats.revenue.change}
            trend={stats.revenue.trend}
            icon="💰"
          />
          <app-stat-card
            title="Users"
            value={stats.users.value}
            change={stats.users.change}
            trend={stats.users.trend}
            icon="👥"
          />
          <app-stat-card
            title="Orders"
            value={stats.orders.value}
            change={stats.orders.change}
            trend={stats.orders.trend}
            icon="📦"
          />
          <app-stat-card
            title="Conversion"
            value={stats.conversion.value}
            change={stats.conversion.change}
            trend={stats.conversion.trend}
            icon="📈"
          />
        </div>
      </section>

      {/* Chart - Server rendered data, web component renders */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Weekly Revenue
        </h2>
        <app-card>
          <app-chart-bar
            data={JSON.stringify(chartData)}
            height="220"
          />
        </app-card>
      </section>

      {/* Data Table - Server data */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <app-data-table
          columns={JSON.stringify([
            { key: "user", label: "User" },
            { key: "action", label: "Action" },
            { key: "target", label: "Target" },
            { key: "time", label: "Time" },
          ])}
          rows={JSON.stringify(
            activities.map((a) => ({
              user: a.user,
              action: a.action,
              target: a.target,
              time: a.time,
            }))
          )}
        />
      </section>

      {/* Client interactive widgets */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Interactive Widgets
          </h2>
          <app-badge variant="primary">Client Component</app-badge>
        </div>
        <DashboardWidgets />
      </section>
    </div>
  );
}
