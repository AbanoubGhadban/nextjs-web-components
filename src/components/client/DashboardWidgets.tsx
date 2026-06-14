"use client";

import { useState } from "react";


export default function DashboardWidgets() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Daily");

  const dailyData = [
    { label: "9am", value: 42 },
    { label: "10am", value: 78 },
    { label: "11am", value: 95 },
    { label: "12pm", value: 63 },
    { label: "1pm", value: 55 },
    { label: "2pm", value: 88 },
    { label: "3pm", value: 72 },
    { label: "4pm", value: 110 },
  ];

  const monthlyData = [
    { label: "Jan", value: 1200 },
    { label: "Feb", value: 1800 },
    { label: "Mar", value: 1500 },
    { label: "Apr", value: 2200 },
    { label: "May", value: 2800 },
    { label: "Jun", value: 2100 },
  ];

  const filteredData = searchQuery
    ? dailyData.filter((d) =>
        d.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : dailyData;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Search-filtered chart */}
        <app-card>
          <div slot="header">
            <h3 className="text-lg font-semibold">Live Search + Chart</h3>
          </div>
          <div className="space-y-4">
            <app-search-input
              placeholder="Filter time slots..."
              onInput={(e: React.FormEvent<HTMLElement>) => {
                const detail = (e as unknown as CustomEvent).detail;
                if (detail) setSearchQuery(detail.value);
              }}
            />
            <app-chart-bar
              data={JSON.stringify(filteredData)}
              height="160"
            />
            {searchQuery && (
              <p className="text-sm text-gray-500">
                Showing {filteredData.length} of {dailyData.length} results
              </p>
            )}
          </div>
        </app-card>

        {/* Tab-controlled data */}
        <app-card>
          <div slot="header">
            <h3 className="text-lg font-semibold">Tab-Controlled View</h3>
          </div>
          <app-tabs
            tabs="Daily,Monthly"
            active={activeTab}
            onTab-change={(e: CustomEvent) => setActiveTab(e.detail.tab)}
          >
            <div slot="Daily">
              <app-chart-bar
                data={JSON.stringify(dailyData)}
                height="160"
              />
            </div>
            <div slot="Monthly">
              <app-chart-bar
                data={JSON.stringify(monthlyData)}
                height="160"
              />
            </div>
          </app-tabs>
        </app-card>
      </div>

      {/* Progress tracking */}
      <app-card>
        <div slot="header">
          <h3 className="text-lg font-semibold">Project Progress</h3>
        </div>
        <div className="space-y-4">
          <app-progress value="85" label="Frontend Development" variant="primary" striped />
          <app-progress value="62" label="Backend API" variant="success" />
          <app-progress value="40" label="Testing & QA" variant="warning" animated striped />
          <app-progress value="20" label="Documentation" variant="danger" />
        </div>
      </app-card>
    </div>
  );
}
