import SettingsPanel from "@/components/client/SettingsPanel";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600 text-lg">
          Configure your preferences. This page demonstrates complex interactive
          web components within a Client Component.
        </p>
      </div>

      {/* Server-rendered header info */}
      <app-alert variant="warning" title="Client-Heavy Page">
        This page is primarily a Client Component. The settings panel below
        uses web components for all UI elements with React state management.
      </app-alert>

      <SettingsPanel />
    </div>
  );
}
