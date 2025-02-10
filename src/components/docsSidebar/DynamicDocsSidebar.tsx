"use client";

import dynamic from "next/dynamic";

export const DynamicDocsSidebar = dynamic(() => import("./DocsSidebar"), {
	ssr: false,
});
