"use client";

import { useEffect } from "react";

const KatexHtmlSanitizer = () => {
	useEffect(() => {
		const katexHtmls = document.getElementsByClassName("katex-html");
		/* Remove all katex-html elements */
		for (let i = 0; i < katexHtmls.length; i++) {
			katexHtmls[i].remove();
		}
	}, []);
	return null;
};

export default KatexHtmlSanitizer;
