"use client";

import dynamic from "next/dynamic";

export const DynamicLanguageMenu = dynamic(() => import("./LanguageMenu"), {
	ssr: false,
});
