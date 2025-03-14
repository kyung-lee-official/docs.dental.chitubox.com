"use client";

import dynamic from "next/dynamic";

export const DynamicYear = dynamic(() => import("./Year"), {
	ssr: false,
});
