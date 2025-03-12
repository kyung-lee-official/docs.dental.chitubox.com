"use client";

import React, { useEffect, useState } from "react";
import { TocHeadings } from "./TocHeadings";
import { useMediaQuery } from "react-responsive";
import { MediaQuery } from "@/utils/types";

const Toc = () => {
	const [headerHeight, setHeaderHeight] = useState("0px");

	useEffect(() => {
		const header = document.getElementById("header");
		if (!header) return;
		const resizeObserver = new ResizeObserver(() => {
			/* Do what you want to do when the size of the element changes */
			setHeaderHeight(`${header.clientHeight}px`);
		});
		resizeObserver.observe(header);
		return () => resizeObserver.disconnect(); /* clean up */
	}, []);

	const isLg = useMediaQuery({ query: MediaQuery.lg });

	if (isLg) {
		return (
			<div className="flex-[0_0_350px] mx-auto">
				<div
					className={`sticky flex flex-col gap-4`}
					style={{
						top: `calc(100px + ${headerHeight})`,
					}}
				>
					<TocHeadings headerHeight={headerHeight} />
				</div>
			</div>
		);
	} else {
		return null;
	}
};

export default Toc;
