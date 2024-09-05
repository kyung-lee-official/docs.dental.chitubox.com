"use client";

import { Theme, useThemeStore } from "@/stores/theme";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

const ThemeSwitch = () => {
	const strokeWidth: string = "23px";
	let shapes = [
		/* Sun */
		{
			d: "M204.116 118.756C221.372 148.644 211.132 186.861 181.244 204.116C151.356 221.372 113.139 211.132 95.8835 181.244C78.6279 151.356 88.8681 113.139 118.756 95.8835C148.644 78.6279 186.861 88.8681 204.116 118.756Z",
		},
		/* Moon */
		{
			d: "M 140 154 C 211 253 279.601 228.146 216.238 264.728 C 152.876 301.311 71.8543 279.601 35.2719 216.238 C -1.3105 152.876 20.3991 71.8543 83.7617 35.2719 C 147.124 -1.3105 83 50 140 154 Z",
		},
	];

	/* Get current theme in Store. */
	const { theme, setTheme } = useThemeStore();
	useEffect(() => {
		const className = "dark";
		const bodyClass = window.document.body.classList;
		if (theme === Theme.DARK) {
			bodyClass.add(className);
		} else {
			bodyClass.remove(className);
		}
	}, [theme]);

	/**
	 * The server-side rendering of the theme was set to the default value in the store.
	 * Once user changes the theme, the theme in the store will be updated,
	 * which might make the value in the store different from the store default value used by SSR.
	 * So if we give this state a dynamic default value according to the current theme in the store,
	 * and the theme in the store is different from the store's default value, react hydration error will
	 * be triggered. See more info here: https://nextjs.org/docs/messages/react-hydration-error
	 *
	 * This can be fixed either by setting the default value of this state to a static value (true or false),
	 * or by importing this component dynamically (with no SSR). https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
	 *
	 * However, setting the default value of this state to a static value will cause a state switch after the useEffect hook was triggered
	 * if the theme in the store is different from this staic default value, which causes an unnecessary animation when first loading the page.
	 * So we should import this component dynamically in other files.
	 */
	const [isDark, setIsDark] = useState<boolean>(
		theme === Theme.DARK ? true : false
	);
	const [isComponentDark, setIsComponentDark] = useState<boolean>(isDark);
	const [isLock, setIsLock] = useState<boolean>(false);
	const morphControls = useAnimationControls();
	const rayControls = useAnimationControls();

	function changetheme() {
		if (!isLock) {
			setIsLock(true);
			const targetTheme: Theme.DARK | Theme.LIGHT =
				theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
			setTheme(targetTheme);
		}
	}

	useEffect(() => {
		if (theme === Theme.DARK) {
			setIsDark(true);
		} else {
			setIsDark(false);
		}
	}, [theme]);

	useEffect(() => {
		if (isDark !== isComponentDark) {
			if (isDark) {
				/* Light to dark */
				morphControls.start({
					d: [shapes[0].d, shapes[1].d],
					transition: { duration: 0.5, delay: 0.3 },
				});
				rayControls.start({
					opacity: 0,
				});
			} else {
				/* Dark to light */
				morphControls.start({
					d: [shapes[1].d, shapes[0].d],
					transition: { duration: 0.5 },
				});
				rayControls.start({
					opacity: 1,
					transition: { delay: 0.5 },
				});
			}
			setIsComponentDark(isDark);
		}
	}, [isDark, isComponentDark, morphControls, rayControls, shapes]);

	return (
		<svg
			width="32"
			height="32"
			viewBox="0 0 300 300"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			onClick={changetheme}
			cursor={"pointer"}
		>
			<motion.path
				stroke="currentColor"
				strokeWidth={strokeWidth}
				initial={{
					d: isDark ? shapes[1].d : shapes[0].d,
				}}
				animate={morphControls}
				onAnimationComplete={(definition) => {
					setIsLock(false);
				}}
			/>
			<motion.path
				d="M150 50V10"
				stroke="currentColor"
				strokeWidth={strokeWidth}
				strokeMiterlimit="10"
				strokeLinecap="round"
				initial={{ opacity: isDark ? 0 : 1 }}
				animate={rayControls}
			/>
			<motion.path
				d="M80 80L51 51"
				stroke="currentColor"
				strokeWidth={strokeWidth}
				strokeMiterlimit="10"
				strokeLinecap="round"
				initial={{ opacity: isDark ? 0 : 1 }}
				animate={rayControls}
			/>
			<motion.path
				d="M50 150H10"
				stroke="currentColor"
				strokeWidth={strokeWidth}
				strokeMiterlimit="10"
				strokeLinecap="round"
				initial={{ opacity: isDark ? 0 : 1 }}
				animate={rayControls}
			/>
			<motion.path
				d="M80 220L51 249"
				stroke="currentColor"
				strokeWidth={strokeWidth}
				strokeMiterlimit="10"
				strokeLinecap="round"
				initial={{ opacity: isDark ? 0 : 1 }}
				animate={rayControls}
			/>
			<motion.path
				d="M150 250V290"
				stroke="currentColor"
				strokeWidth={strokeWidth}
				strokeMiterlimit="10"
				strokeLinecap="round"
				initial={{ opacity: isDark ? 0 : 1 }}
				animate={rayControls}
			/>
			<motion.path
				d="M220 220L249 249"
				stroke="currentColor"
				strokeWidth={strokeWidth}
				strokeMiterlimit="10"
				strokeLinecap="round"
				initial={{ opacity: isDark ? 0 : 1 }}
				animate={rayControls}
			/>
			<motion.path
				d="M250 150H290"
				stroke="currentColor"
				strokeWidth={strokeWidth}
				strokeMiterlimit="10"
				strokeLinecap="round"
				initial={{ opacity: isDark ? 0 : 1 }}
				animate={rayControls}
			/>
			<motion.path
				d="M220 80L249 51"
				stroke="currentColor"
				strokeWidth={strokeWidth}
				strokeMiterlimit="10"
				strokeLinecap="round"
				initial={{ opacity: isDark ? 0 : 1 }}
				animate={rayControls}
			/>
		</svg>
	);
};

export default ThemeSwitch;
