"use client";

import { useState, useRef, useCallback } from "react";


export default function InteractiveDemo() {
  const [buttonClicks, setButtonClicks] = useState(0);
  const [progress, setProgress] = useState(35);
  const [toastVisible, setToastVisible] = useState(false);
  const modalRef = useRef<HTMLElement & { show: () => void; hide: () => void }>(null);

  const handleIncrement = useCallback(() => {
    setProgress((p) => Math.min(100, p + 10));
    setButtonClicks((c) => c + 1);
  }, []);

  return (
    <div className="space-y-6">
      <app-alert variant="warning" title="Client-Side Interactivity">
        These web components are inside a Client Component. They have full
        access to React state, event handlers, and refs.
      </app-alert>

      {/* Button + Progress demo */}
      <app-card>
        <div slot="header">
          <h3 className="text-lg font-semibold">Buttons & Progress</h3>
        </div>
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <app-button variant="primary" onClick={handleIncrement}>
              Increment Progress ({buttonClicks})
            </app-button>
            <app-button
              variant="secondary"
              onClick={() => setProgress(0)}
            >
              Reset
            </app-button>
            <app-button
              variant="outline"
              onClick={() => setToastVisible(true)}
            >
              Show Toast
            </app-button>
            <app-button
              variant="ghost"
              onClick={() => modalRef.current?.show()}
            >
              Open Modal
            </app-button>
          </div>

          <div className="space-y-3">
            <app-progress
              value={String(progress)}
              label="Upload Progress"
              variant="primary"
              striped
              animated
            />
            <app-progress
              value="75"
              label="Storage Used"
              variant="warning"
            />
            <app-progress
              value="90"
              label="CPU Usage"
              variant="danger"
              striped
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <app-badge variant="primary">React</app-badge>
            <app-badge variant="success">Next.js</app-badge>
            <app-badge variant="warning">Web Components</app-badge>
            <app-badge variant="info">TypeScript</app-badge>
            <app-badge variant="danger">Shadow DOM</app-badge>
          </div>
        </div>
      </app-card>

      {/* Tabs demo */}
      <app-card>
        <div slot="header">
          <h3 className="text-lg font-semibold">Tabs Component</h3>
        </div>
        <app-tabs tabs="Overview,Features,Code">
          <div slot="Overview">
            <h4 className="font-semibold mb-2">Overview</h4>
            <p className="text-gray-600">
              Web Components are a set of web platform APIs that allow you to
              create reusable custom elements with encapsulated functionality.
              They work across all modern browsers and frameworks.
            </p>
          </div>
          <div slot="Features">
            <h4 className="font-semibold mb-2">Key Features</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Shadow DOM for style encapsulation</li>
              <li>Custom Elements API for new HTML tags</li>
              <li>HTML Templates and Slots for composition</li>
              <li>Works in Server and Client components</li>
              <li>Framework-agnostic and future-proof</li>
            </ul>
          </div>
          <div slot="Code">
            <h4 className="font-semibold mb-2">Example Usage</h4>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
              {`<app-card variant="primary" hoverable>
  <span slot="header">Title</span>
  <p>Card content goes here</p>
</app-card>`}
            </pre>
          </div>
        </app-tabs>
      </app-card>

      {/* Accordion */}
      <app-card>
        <div slot="header">
          <h3 className="text-lg font-semibold">Accordion</h3>
        </div>
        <app-accordion
          items={JSON.stringify([
            {
              id: "wc",
              title: "What are Web Components?",
              content:
                "Web Components are a suite of technologies (Custom Elements, Shadow DOM, HTML Templates) that let you create reusable, encapsulated HTML elements.",
            },
            {
              id: "nextjs",
              title: "How do they work in Next.js?",
              content:
                "In Server Components, web component tags render as regular HTML elements. Once JavaScript loads on the client, the browser upgrades them to interactive custom elements.",
            },
            {
              id: "shadow",
              title: "What is Shadow DOM?",
              content:
                "Shadow DOM provides encapsulated DOM and styling. Styles inside a shadow root don't leak out, and external styles don't leak in. This prevents conflicts with your app's CSS.",
            },
            {
              id: "slots",
              title: "How do Slots work?",
              content:
                "Slots are placeholders inside a web component where you can insert external content. Named slots let you target specific areas of the component's template.",
            },
          ])}
          multiple
        />
      </app-card>

      {/* Modal */}
      <app-modal ref={modalRef} title="Web Components Modal">
        <div className="space-y-4">
          <p className="text-gray-600">
            This modal is a web component controlled via React ref. The{" "}
            <code className="bg-gray-100 px-1 rounded">show()</code> and{" "}
            <code className="bg-gray-100 px-1 rounded">hide()</code> methods
            are called from the React client component.
          </p>
          <div className="flex gap-3">
            <app-avatar name="Sarah Chen" size="40" status="online" />
            <app-avatar name="Marcus Johnson" size="40" status="busy" />
            <app-avatar name="Aisha Patel" size="40" status="away" />
          </div>
          <app-progress value="65" label="Modal Demo Progress" variant="success" />
        </div>
        <div slot="footer">
          <app-button
            variant="primary"
            onClick={() => modalRef.current?.hide()}
          >
            Close Modal
          </app-button>
        </div>
      </app-modal>

      {/* Toast */}
      <app-toast
        message="Action completed successfully!"
        variant="success"
        visible={toastVisible || undefined}
        onToast-close={() => setToastVisible(false)}
      />
    </div>
  );
}
