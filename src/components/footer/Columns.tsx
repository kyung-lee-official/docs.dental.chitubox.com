import { useTranslations } from "next-intl";
import { processHref } from "@/utils/data";

import Link from "next/link";
import { ReactNode } from "react";

const A = (props: { href: string; children: ReactNode }) => {
	const { href, children } = props;
	return (
		<Link href={processHref(href)}>
			<div className="w-1/7 p-4 text-[#E2E2E2] text-[14px] hover:text-[#0284C7] ">
				{children}
			</div>
		</Link>
	);
};

function Columns() {
	const t = useTranslations();

	return (
		<div className="flex flex-wrap gap-4 mt-[60px] mb-[94px] whitespace-nowrap">
			<A href={t("footer.leftSection.menuList.0.url")}>
				{t("footer.leftSection.menuList.0.row")}
			</A>
			<A href={t("footer.leftSection.menuList.1.url")}>
				{t("footer.leftSection.menuList.1.row")}
			</A>
			<A href={t("footer.leftSection.menuList.2.url")}>
				{t("footer.leftSection.menuList.2.row")}
			</A>
			<A href={t("footer.leftSection.menuList.3.url")}>
				{t("footer.leftSection.menuList.3.row")}
			</A>
			<A href={t("footer.leftSection.menuList.4.url")}>
				{t("footer.leftSection.menuList.4.row")}
			</A>
			<A href={t("footer.leftSection.menuList.5.url")}>
				{t("footer.leftSection.menuList.5.row")}
			</A>
			<A href={t("footer.leftSection.menuList.6.url")}>
				{t("footer.leftSection.menuList.6.row")}
			</A>
		</div>
	);
}

export default Columns;
