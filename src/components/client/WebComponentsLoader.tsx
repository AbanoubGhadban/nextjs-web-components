"use client";

import { useEffect } from "react";

export default function WebComponentsLoader() {
  useEffect(() => {
    import("@/components/web-components/register");
  }, []);

  return null;
}
