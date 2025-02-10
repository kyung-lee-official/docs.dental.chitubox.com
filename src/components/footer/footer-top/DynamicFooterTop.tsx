"use client";

import dynamic from "next/dynamic";

export const DynamicFooterTop = dynamic(() => import("./FooterTop"), {
	ssr: false,
});
