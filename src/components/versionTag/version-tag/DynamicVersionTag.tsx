"use client";

import dynamic from "next/dynamic";

export const DynamicVersionTag = dynamic(() => import("./VersionTag"), {
	ssr: false,
});
