"use client";

import { useEffect, useState } from "react";

function Year() {
	const [fullYear, setDate] = useState(new Date().getFullYear());

	useEffect(() => {
		setDate(new Date().getFullYear());
	}, []);

	return fullYear;
}

export default Year;
