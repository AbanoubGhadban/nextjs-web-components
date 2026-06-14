"use client";

import { useEffect, useRef, useState } from "react";

export default function ScenariosTester() {
  const [results, setResults] = useState<Record<string, string>>({});
  const [eventLog, setEventLog] = useState<string[]>([]);
  const [accentColor, setAccentColor] = useState("#8b5cf6");
  const [bgColor, setBgColor] = useState("#f8fafc");
  const [textColor, setTextColor] = useState("#1e293b");
  const cssPierceRef = useRef<HTMLElement>(null);
  const eventBoundaryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    import("@/components/web-components/register");
  }, []);

  // Attach outer event listener to the event boundary component
  useEffect(() => {
    const el = eventBoundaryRef.current;
    if (!el) return;

    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setEventLog((prev) => [
        ...prev,
        `[OUTER] Received wc-signal: type="${detail.type}" message="${detail.message}"`,
      ]);
    };

    el.addEventListener("wc-signal", handler);
    return () => el.removeEventListener("wc-signal", handler);
  }, []);

  // Update CSS custom properties on the css-pierce component
  useEffect(() => {
    const el = cssPierceRef.current;
    if (!el) return;
    el.style.setProperty("--wc-accent", accentColor);
    el.style.setProperty("--wc-bg", bgColor);
    el.style.setProperty("--wc-text", textColor);
  }, [accentColor, bgColor, textColor]);

  const setResult = (key: string, value: string) => {
    setResults((prev) => ({ ...prev, [key]: value }));
  };

  // --- DOM Access Tests ---

  const testLightQs = () => {
    const el = document.querySelector(
      'wc-light-dom [data-testid="light-secret"]',
    );
    setResult("light-qs", el ? "FOUND" : "NOT FOUND");
  };

  const testOpenQs = () => {
    const el = document.querySelector(
      'wc-open-shadow [data-testid="open-secret"]',
    );
    setResult("open-qs", el ? "FOUND" : "NOT FOUND");
  };

  const testClosedQs = () => {
    const el = document.querySelector(
      'wc-closed-shadow [data-testid="closed-secret"]',
    );
    setResult("closed-qs", el ? "FOUND" : "NOT FOUND");
  };

  const testLightSr = () => {
    const el = document.querySelector("wc-light-dom");
    setResult("light-sr", el?.shadowRoot ? "accessible" : "null");
  };

  const testOpenSr = () => {
    const el = document.querySelector("wc-open-shadow");
    setResult("open-sr", el?.shadowRoot ? "accessible" : "null");
  };

  const testClosedSr = () => {
    const el = document.querySelector("wc-closed-shadow");
    setResult("closed-sr", el?.shadowRoot ? "accessible" : "null");
  };

  const testLightSecret = () => {
    const el = document.querySelector(
      'wc-light-dom [data-testid="light-secret"]',
    );
    setResult(
      "light-secret",
      el?.textContent?.trim() || "BLOCKED",
    );
  };

  const testOpenSecret = () => {
    const el = document.querySelector("wc-open-shadow");
    const secret = el?.shadowRoot?.querySelector(
      '[data-testid="open-secret"]',
    );
    setResult(
      "open-secret",
      secret?.textContent?.trim() || "BLOCKED",
    );
  };

  const testClosedSecret = () => {
    const el = document.querySelector("wc-closed-shadow");
    const secret = el?.shadowRoot?.querySelector(
      '[data-testid="closed-secret"]',
    );
    setResult(
      "closed-secret",
      secret?.textContent?.trim() || "BLOCKED",
    );
  };

  // --- Slot Test ---
  const testSlotQs = () => {
    const el = document.querySelector(
      'wc-slot-demo [data-testid="slot-projected"]',
    );
    setResult("slot-qs", el ? "FOUND" : "NOT FOUND");
  };

  const sectionStyle =
    "bg-white rounded-lg border border-gray-200 p-6 space-y-4";
  const btnStyle =
    "text-xs px-3 py-1.5 rounded border border-gray-300 bg-white hover:bg-gray-50 cursor-pointer font-mono";
  const resultStyle =
    "text-xs font-mono px-2 py-1 rounded bg-gray-100 min-w-[80px] inline-block";

  return (
    <>
      {/* Inject style leak test CSS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `.wc-title { color: hotpink !important; }`,
        }}
      />

      {/* Section 1: DOM Access Matrix */}
      <section className={sectionStyle}>
        <h2 className="text-xl font-semibold text-gray-800">
          1. DOM Access Matrix
        </h2>
        <p className="text-sm text-gray-500">
          Compare querySelector, shadowRoot access, and secret data reading
          across Light DOM, Open Shadow, and Closed Shadow components.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Light DOM */}
          <div className="space-y-3">
            <wc-light-dom data-testid="comp-light" />
            <div className="space-y-2 border-t pt-3">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  data-testid="test-light-qs"
                  className={btnStyle}
                  onClick={testLightQs}
                >
                  querySelector
                </button>
                <span data-testid="result-light-qs" className={resultStyle}>
                  {results["light-qs"] || "--"}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  data-testid="test-light-sr"
                  className={btnStyle}
                  onClick={testLightSr}
                >
                  .shadowRoot
                </button>
                <span data-testid="result-light-sr" className={resultStyle}>
                  {results["light-sr"] || "--"}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  data-testid="test-light-secret"
                  className={btnStyle}
                  onClick={testLightSecret}
                >
                  Read Secret
                </button>
                <span
                  data-testid="result-light-secret"
                  className={resultStyle}
                >
                  {results["light-secret"] || "--"}
                </span>
              </div>
            </div>
          </div>

          {/* Open Shadow */}
          <div className="space-y-3">
            <wc-open-shadow data-testid="comp-open" />
            <div className="space-y-2 border-t pt-3">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  data-testid="test-open-qs"
                  className={btnStyle}
                  onClick={testOpenQs}
                >
                  querySelector
                </button>
                <span data-testid="result-open-qs" className={resultStyle}>
                  {results["open-qs"] || "--"}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  data-testid="test-open-sr"
                  className={btnStyle}
                  onClick={testOpenSr}
                >
                  .shadowRoot
                </button>
                <span data-testid="result-open-sr" className={resultStyle}>
                  {results["open-sr"] || "--"}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  data-testid="test-open-secret"
                  className={btnStyle}
                  onClick={testOpenSecret}
                >
                  Read Secret
                </button>
                <span
                  data-testid="result-open-secret"
                  className={resultStyle}
                >
                  {results["open-secret"] || "--"}
                </span>
              </div>
            </div>
          </div>

          {/* Closed Shadow */}
          <div className="space-y-3">
            <wc-closed-shadow data-testid="comp-closed" />
            <div className="space-y-2 border-t pt-3">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  data-testid="test-closed-qs"
                  className={btnStyle}
                  onClick={testClosedQs}
                >
                  querySelector
                </button>
                <span data-testid="result-closed-qs" className={resultStyle}>
                  {results["closed-qs"] || "--"}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  data-testid="test-closed-sr"
                  className={btnStyle}
                  onClick={testClosedSr}
                >
                  .shadowRoot
                </button>
                <span data-testid="result-closed-sr" className={resultStyle}>
                  {results["closed-sr"] || "--"}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  data-testid="test-closed-secret"
                  className={btnStyle}
                  onClick={testClosedSecret}
                >
                  Read Secret
                </button>
                <span
                  data-testid="result-closed-secret"
                  className={resultStyle}
                >
                  {results["closed-secret"] || "--"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Slot Projection */}
      <section className={sectionStyle}>
        <h2 className="text-xl font-semibold text-gray-800">
          2. Slot Projection
        </h2>
        <p className="text-sm text-gray-500">
          Content slotted into a Shadow DOM component still lives in the light
          DOM and is accessible via querySelector from outside.
        </p>

        <wc-slot-demo data-testid="comp-slot">
          <div slot="header" data-testid="slot-projected">
            <strong>Projected Header</strong> -- This content is in the light
            DOM!
          </div>
          <p className="highlight">
            Default slot content with .highlight class (styled by ::slotted)
          </p>
          <div slot="footer">
            <em>Footer content projected into named slot</em>
          </div>
        </wc-slot-demo>

        <div className="flex items-center gap-2 border-t pt-3">
          <button
            data-testid="test-slot-qs"
            className={btnStyle}
            onClick={testSlotQs}
          >
            querySelector slotted content from outside
          </button>
          <span data-testid="result-slot-qs" className={resultStyle}>
            {results["slot-qs"] || "--"}
          </span>
        </div>
      </section>

      {/* Section 3: CSS Boundary */}
      <section className={sectionStyle}>
        <h2 className="text-xl font-semibold text-gray-800">
          3. CSS Custom Properties Pierce Shadow DOM
        </h2>
        <p className="text-sm text-gray-500">
          CSS custom properties pass through all shadow boundaries. Use the
          color pickers below to change --wc-accent, --wc-bg, and --wc-text.
        </p>

        <div className="flex gap-4 flex-wrap items-center">
          <label className="flex items-center gap-2 text-sm">
            --wc-accent:
            <input
              type="color"
              data-testid="css-accent-picker"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer border-0"
            />
          </label>
          <label className="flex items-center gap-2 text-sm">
            --wc-bg:
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer border-0"
            />
          </label>
          <label className="flex items-center gap-2 text-sm">
            --wc-text:
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer border-0"
            />
          </label>
        </div>

        <wc-css-pierce ref={cssPierceRef} data-testid="comp-css-pierce" />
      </section>

      {/* Section 4: Event Boundary */}
      <section className={sectionStyle}>
        <h2 className="text-xl font-semibold text-gray-800">
          4. Event Boundary
        </h2>
        <p className="text-sm text-gray-500">
          Events with composed:true cross shadow boundaries. Events with
          composed:false stay trapped inside. Host-dispatched events are always
          visible.
        </p>

        <wc-event-boundary
          ref={eventBoundaryRef}
          data-testid="comp-event-boundary"
        />

        <div className="border-t pt-3">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Outer Event Log (listeners on host element):
          </h4>
          <div
            data-testid="outer-event-log"
            className="bg-gray-50 rounded p-3 font-mono text-xs max-h-[150px] overflow-y-auto whitespace-pre-wrap"
          >
            {eventLog.length === 0
              ? "No events received yet. Click buttons above."
              : eventLog.join("\n")}
          </div>
          <button
            className="mt-2 text-xs px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 cursor-pointer"
            onClick={() => setEventLog([])}
          >
            Clear Log
          </button>
        </div>
      </section>

      {/* Section 5: Style Leak Test */}
      <section className={sectionStyle}>
        <h2 className="text-xl font-semibold text-gray-800">
          5. Style Leak Test
        </h2>
        <p className="text-sm text-gray-500">
          A global CSS rule{" "}
          <code className="bg-gray-100 px-1 rounded">
            .wc-title {"{"} color: hotpink !important; {"}"}
          </code>{" "}
          is active on this page. It affects the Light DOM component but NOT
          the Shadow DOM components.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div data-testid="style-leak-light">
            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase">
              Light DOM (affected)
            </p>
            <wc-light-dom />
          </div>
          <div data-testid="style-leak-open">
            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase">
              Open Shadow (protected)
            </p>
            <wc-open-shadow />
          </div>
          <div data-testid="style-leak-closed">
            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase">
              Closed Shadow (protected)
            </p>
            <wc-closed-shadow />
          </div>
        </div>
      </section>
    </>
  );
}
