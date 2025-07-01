"use client";

import { useState } from "react";
import { LanguageIcon } from "../icons/Icons";
import { Link, usePathname } from "@/navigation";
import { useMediaQuery } from "react-responsive";
import { MediaQuery } from "@/utils/types";
import { useLocale } from "next-intl";

const Locale = (props: any) => {
	const { children, href, locale } = props;
	return (
		<Link
			href={href}
			locale={locale}
			className="w-full px-2 py-1
			hover:bg-neutral-100 dark:hover:bg-neutral-800
			rounded"
		>
			{children}
		</Link>
	);
};

const LanguageMenu = () => {
	const pathname = usePathname();
	const locale = useLocale();
	const [showLanguageMenu, setShowLanguageMenu] = useState<boolean>(false);

	const isLg = useMediaQuery({ query: MediaQuery.lg });

	if (isLg) {
		return (
			<div className="relative w-18 h-6">
				<div
					className="absolute right-0
					flex flex-col justify-start items-end gap-6
					whitespace-nowrap"
					onMouseLeave={() => {
						setShowLanguageMenu(false);
					}}
				>
					<button
						onMouseEnter={() => {
							setShowLanguageMenu(true);
						}}
					>
						{locale === "en-US" ? "English" : "简体中文"}
					</button>
					{showLanguageMenu && (
						<ul
							className="flex flex-col p-2 gap-1
							bg-white dark:bg-black
							border-[1px] border-neutral-200 dark:border-neutral-800
							rounded-md"
						>
							<Locale href={pathname} locale="en-US">
								English
							</Locale>
							<Locale href={pathname} locale="zh-CN">
								简体中文
							</Locale>
						</ul>
					)}
				</div>
			</div>
		);
	} else {
		return null;
	}
};

export default LanguageMenu;
