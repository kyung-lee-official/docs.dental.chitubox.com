"use client";

import dynamic from "next/dynamic";

export const DynamicVersionDropdown = dynamic(
	() => import("./VersionDropdown"),
	{
		ssr: false,
	}
);
