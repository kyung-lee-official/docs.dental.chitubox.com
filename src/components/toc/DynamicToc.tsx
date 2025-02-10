"use client";

import dynamic from "next/dynamic";

export const DynamicToc = dynamic(() => import("./Toc"), {
	ssr: false,
});
