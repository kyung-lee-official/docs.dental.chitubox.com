"use client";

import { MediaQuery } from "@/utils/types";
import { useMediaQuery } from "react-responsive";

const DynamicHero = () => {
	const isLg = useMediaQuery({ query: MediaQuery.lg });

	return isLg ? (
		<img
			src="/images/pages/en-US/software-feedback/hero.png"
			alt=""
			className="w-full"
		/>
	) : (
		<img
			src="/images/pages/en-US/software-feedback/hero-mobile.png"
			alt=""
			className="w-full"
		/>
	);
};

export default DynamicHero;
