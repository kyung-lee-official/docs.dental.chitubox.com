"use client";

import dynamic from "next/dynamic";

export const DynamicMobileMenuEntry = dynamic(
	() => import("./MobileMenuEntry"),
	{
		ssr: false,
	}
);
