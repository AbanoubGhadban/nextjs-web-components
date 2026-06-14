"use client";

import { useState, useRef } from "react";


export default function SettingsPanel() {
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [saving, setSaving] = useState(false);
  const toastRef = useRef<HTMLElement & { show: (msg?: string) => void }>(null);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toastRef.current?.show("Settings saved successfully!");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <app-tabs tabs="General,Notifications,Data,Account">
        {/* General tab */}
        <div slot="General">
          <div className="space-y-6 py-2">
            <app-card>
              <div slot="header">
                <h3 className="text-lg font-semibold">Appearance</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Theme</p>
                    <p className="text-sm text-gray-500">
                      Toggle between light and dark mode
                    </p>
                  </div>
                  <app-theme-toggle
                    theme={theme}
                    onTheme-change={(e: CustomEvent) =>
                      setTheme(e.detail.theme)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Current Theme</p>
                    <p className="text-sm text-gray-500">Active theme mode</p>
                  </div>
                  <app-badge variant={theme === "dark" ? "primary" : "warning"}>
                    {theme}
                  </app-badge>
                </div>
              </div>
            </app-card>

            <app-card>
              <div slot="header">
                <h3 className="text-lg font-semibold">Language & Region</h3>
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <app-button variant="primary" size="sm">
                    English
                  </app-button>
                  <app-button variant="outline" size="sm">
                    Spanish
                  </app-button>
                  <app-button variant="outline" size="sm">
                    French
                  </app-button>
                  <app-button variant="outline" size="sm">
                    German
                  </app-button>
                  <app-button variant="outline" size="sm">
                    Japanese
                  </app-button>
                </div>
              </div>
            </app-card>
          </div>
        </div>

        {/* Notifications tab */}
        <div slot="Notifications">
          <div className="space-y-6 py-2">
            <app-card>
              <div slot="header">
                <h3 className="text-lg font-semibold">
                  Notification Preferences
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      Push Notifications
                    </p>
                    <p className="text-sm text-gray-500">
                      Receive push notifications
                    </p>
                  </div>
                  <app-button
                    variant={notifications ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => setNotifications(!notifications)}
                  >
                    {notifications ? "Enabled" : "Disabled"}
                  </app-button>
                </div>
                <app-progress
                  value={notifications ? "100" : "0"}
                  label="Notification Volume"
                  variant={notifications ? "success" : "danger"}
                />
              </div>
            </app-card>
          </div>
        </div>

        {/* Data tab */}
        <div slot="Data">
          <div className="space-y-6 py-2">
            <app-card>
              <div slot="header">
                <h3 className="text-lg font-semibold">Storage</h3>
              </div>
              <div className="space-y-4">
                <app-progress
                  value="65"
                  label="Storage Used (6.5 GB / 10 GB)"
                  variant="warning"
                  striped
                />
                <app-chart-bar
                  data={JSON.stringify([
                    { label: "Images", value: 2800 },
                    { label: "Videos", value: 1500 },
                    { label: "Docs", value: 900 },
                    { label: "Other", value: 1300 },
                  ])}
                  height="140"
                />
              </div>
            </app-card>

            <app-card>
              <div slot="header">
                <h3 className="text-lg font-semibold">Auto-Save</h3>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    Automatic Saving
                  </p>
                  <p className="text-sm text-gray-500">
                    Save changes automatically
                  </p>
                </div>
                <app-button
                  variant={autoSave ? "success" : "secondary"}
                  size="sm"
                  onClick={() => setAutoSave(!autoSave)}
                >
                  {autoSave ? "On" : "Off"}
                </app-button>
              </div>
            </app-card>
          </div>
        </div>

        {/* Account tab */}
        <div slot="Account">
          <div className="space-y-6 py-2">
            <app-card>
              <div slot="header">
                <h3 className="text-lg font-semibold">Profile</h3>
              </div>
              <div className="flex items-center gap-4">
                <app-avatar name="Admin User" size="64" status="online" />
                <div>
                  <p className="font-semibold text-lg">Admin User</p>
                  <p className="text-gray-500">admin@webcomp.dev</p>
                  <app-badge variant="primary">Pro Plan</app-badge>
                </div>
              </div>
            </app-card>

            <app-card>
              <div slot="header">
                <h3 className="text-lg font-semibold">Danger Zone</h3>
              </div>
              <div className="space-y-3">
                <app-alert variant="error" title="Irreversible Action">
                  These actions cannot be undone. Please be careful.
                </app-alert>
                <div className="flex gap-3">
                  <app-button variant="danger" size="sm">
                    Delete Account
                  </app-button>
                  <app-button variant="outline" size="sm">
                    Export Data
                  </app-button>
                </div>
              </div>
            </app-card>
          </div>
        </div>
      </app-tabs>

      {/* Save button */}
      <div className="flex justify-end gap-3">
        <app-button variant="ghost">Cancel</app-button>
        <app-button
          variant="primary"
          size="lg"
          loading={saving || undefined}
          onClick={handleSave}
        >
          Save Settings
        </app-button>
      </div>

      <app-toast ref={toastRef} message="" variant="success" duration="3000" />
    </div>
  );
}
