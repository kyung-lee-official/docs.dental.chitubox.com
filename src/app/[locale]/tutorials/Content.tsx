"use client";

import { useLocale, useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { Card } from "./card/Card";

const DynamicHero = dynamic(() => import("./Hero"), { ssr: false });

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
					fieldName={t("primer")}
					readMore={t("readMore")}
				/>
				<Card
					href={t("intermediate-link")}
					title={t("intermediate")}
					description={t("intermediate-subtitle")}
					fieldName={t("intermediate")}
					readMore={t("readMore")}
				/>
				{/* <Card
					href={t("proficiency-link")}
					title={t("proficiency")}
					description={t("proficiency-subtitle")}
					fieldName={t("proficiency")}
					readMore={t("readMore")}
				/> */}
				<Card
					href={t("comparison-link")}
					title={t("comparison")}
					description={t("comparison-subtitle")}
					fieldName={t("comparison")}
					readMore={t("readMore")}
				/>
			</div>
		</div>
	);
};

export default Content;
