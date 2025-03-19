"use client";

import dynamic from "next/dynamic";

export const DynamicCopyright = dynamic(() => import("./Copyright"), {
	ssr: false,
});
