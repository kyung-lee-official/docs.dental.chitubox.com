"use client";

import { MediaQuery } from "@/utils/types";
import { useLocale } from "next-intl";
import { useMediaQuery } from "react-responsive";

const DynamicHero = () => {
	const isLg = useMediaQuery({ query: MediaQuery.lg });
	const locale = useLocale();

	return isLg ? (
		<img
			src={`/images/pages/${locale}/software-feedback/hero.png`}
			alt=""
			className="w-full"
		/>
	) : (
		<img
			src={`/images/pages/${locale}/software-feedback/hero-mobile.png`}
			alt=""
			className="w-full"
		/>
	);
};

export default DynamicHero;
