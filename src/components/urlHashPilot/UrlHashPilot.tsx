"use client";

import { useEffect } from "react";

export const UrlHashPilot = () => {
	useEffect(() => {
		const hash = window.location.hash;
		const element = document.getElementById(decodeURI(hash).slice(1));
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	}, []);
	return null;
};
