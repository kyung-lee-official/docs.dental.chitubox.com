"use client";

import { useEffect, useState } from "react";

export const Year = () => {
	const [fullYear, setDate] = useState(new Date().getFullYear());
	useEffect(() => {
		setDate(new Date().getFullYear());
	}, []);
	return <span>{fullYear}</span>;
};
