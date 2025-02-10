"use client";

import dynamic from "next/dynamic";

export const DynamicLowerSns = dynamic(() => import("./LowerSns"), {
	ssr: false,
});
