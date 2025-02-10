"use client";

import dynamic from "next/dynamic";

export const DynamicDocsSearch = dynamic(() => import("./DocsSearch"), {
	ssr: false,
});
