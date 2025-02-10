"use client";

import dynamic from "next/dynamic";

export const DynamicFieldTitles = dynamic(() => import("./FieldTitles"), {
	ssr: false,
});
