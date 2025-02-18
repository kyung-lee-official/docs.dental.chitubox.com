import { MediaQuery } from "@/utils/types";
import { useLocale } from "next-intl";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
	const isLg = useMediaQuery({ query: MediaQuery.lg });
	const locale = useLocale();
	switch (locale) {
		case "en-US":
			return isLg ? (
				<div
					className="w-full aspect-[calc(32/9)]
					bg-cover bg-center
					dark:bg-[url(/images/pages/en-US/tutorials/hero-dark.png)]
					bg-[url(/images/pages/en-US/tutorials/hero-light.png)]
					rounded-lg"
				/>
			) : (
				<div
					className="w-full aspect-[calc(4/3)]
					bg-cover bg-center
					dark:bg-[url(/images/pages/en-US/tutorials/hero-dark-m.png)]
					bg-[url(/images/pages/en-US/tutorials/hero-light-m.png)]
					rounded-lg"
				/>
			);
		case "zh-CN":
			return isLg ? (
				<div
					className="w-full aspect-[calc(32/9)]
					bg-cover bg-center
					dark:bg-[url(/images/pages/zh-CN/tutorials/hero-dark.png)]
					bg-[url(/images/pages/zh-CN/tutorials/hero-light.png)]
					rounded-lg"
				/>
			) : (
				<div
					className="w-full aspect-[calc(4/3)]
					bg-cover bg-center
					dark:bg-[url(/images/pages/zh-CN/tutorials/hero-dark-m.png)]
					bg-[url(/images/pages/zh-CN/tutorials/hero-light-m.png)]
					rounded-lg"
				/>
			);
		default:
			return isLg ? (
				<div
					className="w-full aspect-[calc(32/9)]
					bg-cover bg-center
					dark:bg-[url(/images/pages/en-US/tutorials/hero-dark.png)]
					bg-[url(/images/pages/en-US/tutorials/hero-light.png)]
					rounded-lg"
				/>
			) : (
				<div
					className="w-full aspect-[calc(4/3)]
					bg-cover bg-center
					dark:bg-[url(/images/pages/en-US/tutorials/hero-dark-m.png)]
					bg-[url(/images/pages/en-US/tutorials/hero-light-m.png)]
					rounded-lg"
				/>
			);
			break;
	}
};

export default Hero;
