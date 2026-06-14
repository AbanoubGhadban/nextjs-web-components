"use client";

import "@/components/web-components/register";

export default function SimpleH1Demo() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Simple H1 Web Component Demo</h2>
      <p>Below is a &lt;wc-simple-h1&gt; element:</p>
      <wc-simple-h1 />
    </div>
  );
}
