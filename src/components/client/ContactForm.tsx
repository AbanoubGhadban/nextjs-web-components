"use client";

import { useState, useRef } from "react";


export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const toastRef = useRef<HTMLElement & { show: (msg?: string) => void }>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
      toastRef.current?.show("Message sent successfully!");
    }, 1500);
  };

  const isValid =
    formData.name && formData.email && formData.subject && formData.message;

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Send a Message</h2>
        <app-badge variant="primary">Client Component</app-badge>
      </div>

      <app-card>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((d) => ({ ...d, name: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((d) => ({ ...d, email: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) =>
                setFormData((d) => ({ ...d, subject: e.target.value }))
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="What's this about?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData((d) => ({ ...d, message: e.target.value }))
              }
              rows={5}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              placeholder="Your message..."
            />
          </div>

          <div className="flex items-center gap-4">
            <app-button
              variant="primary"
              size="lg"
              loading={sending || undefined}
              disabled={!isValid || undefined}
            >
              {sending ? "Sending..." : "Send Message"}
            </app-button>
            <app-button
              variant="ghost"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                setFormData({ name: "", email: "", subject: "", message: "" });
              }}
            >
              Clear
            </app-button>
          </div>

          {isValid && (
            <app-alert variant="success" title="Ready to send">
              All fields filled. Click Send Message to submit.
            </app-alert>
          )}
        </form>
      </app-card>

      <app-toast ref={toastRef} message="" variant="success" duration="4000" />
    </div>
  );
}
