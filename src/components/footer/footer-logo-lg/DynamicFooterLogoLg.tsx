"use client";

import dynamic from "next/dynamic";

export const DynamicFooterLogoLg = dynamic(() => import("./FooterLogoLg"), {
	ssr: false,
});
