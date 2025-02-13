"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import dynamic from "next/dynamic";

const DynamicHero = dynamic(() => import("./Hero"), { ssr: false });

const Card = (props: { href: string; title: string; description: string }) => {
	const { href, title, description } = props;
	return (
		<Link
			href={href}
			className="flex flex-col items-start p-6 gap-4
			bg-neutral-100/70 dark:bg-neutral-800/60
			rounded-xl hover:shadow duration-200"
		>
			<div className="flex items-center gap-4">
				<div
					className="w-2 h-10
					bg-[#0C88E0]
					rounded-full"
				></div>
				<div
					className="flex justify-start items-center w-full
					text-lg font-bold
					text-neutral-600 hover:text-neutral-900
					dark:text-neutral-200 dark:hover:text-neutral-50
					duration-200"
				>
					{title}
				</div>
			</div>
			<div className="text-neutral-400/80">{description}</div>
		</Link>
	);
};

const Content = () => {
	const t = useTranslations("pages.tutorials");

	const locale = useLocale();

	return (
		<div className="flex flex-col max-w-[1200px] min-h-screen p-10 mx-auto gap-8 lg:gap-16">
			<DynamicHero />
			<div
				className="grid justify-items-stretch gap-8 mx-auto
				grid-cols-1 max-w-[340px]
				md:grid-cols-2 md:max-w-[712px]
				xl:grid-cols-3 xl:min-w-full"
			>
				<Card
					href={t("primer-link")}
					title={t("primer")}
					description={t("primer-subtitle")}
				/>
				<Card
					href={t("advanced-link")}
					title={t("advanced")}
					description={t("advanced-subtitle")}
				/>
				<Card
					href={t("expert-link")}
					title={t("expert")}
					description={t("expert-subtitle")}
				/>
				<Card
					href={t("comparison-link")}
					title={t("comparison")}
					description={t("comparison-subtitle")}
				/>
			</div>
		</div>
	);
};

export default Content;
