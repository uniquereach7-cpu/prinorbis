"use client";

import dynamic from "next/dynamic";

// three.js only loads on pages that show the globe, and only in the browser.
export const GlobeLazy = dynamic(() => import("./Globe"), {
  ssr: false,
  loading: () => <div className="size-full" />,
});
