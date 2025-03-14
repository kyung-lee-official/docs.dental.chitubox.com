"use client";

import dynamic from "next/dynamic";

export const DynamicLegal = dynamic(() => import("./Legal"), {
	ssr: false,
});
